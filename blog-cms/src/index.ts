import { slugify } from "./slugify";

export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: R2Bucket;
  // Set with `wrangler secret put ADMIN_PASSWORD` — never committed.
  ADMIN_PASSWORD: string;
}

const SESSION_COOKIE = "fw_admin";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5MB

type PostRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  cover_image: string | null;
  published: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

function jsonResponse(data: unknown, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  });
}

// Public read endpoints are called cross-origin from the main Next.js
// site (a separate static deployment), so they need permissive CORS.
// They're read-only and carry no cookies/credentials, so `*` is safe.
const PUBLIC_CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, OPTIONS",
};

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;
  const match = header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function setSessionCookie(token: string): string {
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${SESSION_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`;
}

function clearSessionCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
}

// Constant-time-ish comparison so login doesn't leak the password length
// or contents through a timing side channel.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function isAuthed(request: Request, env: Env): Promise<boolean> {
  const token = readCookie(request, SESSION_COOKIE);
  if (!token) return false;
  const row = await env.DB
    .prepare("SELECT token FROM admin_sessions WHERE token = ? AND expires_at > datetime('now')")
    .bind(token)
    .first<{ token: string }>();
  return Boolean(row);
}

function requireAuth(handler: (request: Request, env: Env) => Promise<Response>) {
  return async (request: Request, env: Env): Promise<Response> => {
    if (!(await isAuthed(request, env))) {
      return jsonResponse({ error: "غير مصرح لك. الرجاء تسجيل الدخول." }, 401);
    }
    return handler(request, env);
  };
}

function toPublicSummary(row: PostRow) {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    coverImage: row.cover_image,
    author: row.author,
    publishedAt: row.published_at,
  };
}

function toPublicPost(row: PostRow) {
  return { ...toPublicSummary(row), content: row.content };
}

function toAdminPost(row: PostRow) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    author: row.author,
    coverImage: row.cover_image,
    published: Boolean(row.published),
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ---------- Public API ----------

async function handleListPosts(env: Env): Promise<Response> {
  const { results } = await env.DB
    .prepare(
      "SELECT * FROM posts WHERE published = 1 ORDER BY published_at DESC, id DESC"
    )
    .all<PostRow>();
  return jsonResponse(results.map(toPublicSummary), 200, PUBLIC_CORS);
}

async function handleGetPost(slug: string, env: Env): Promise<Response> {
  const row = await env.DB
    .prepare("SELECT * FROM posts WHERE slug = ? AND published = 1")
    .bind(slug)
    .first<PostRow>();
  if (!row) return jsonResponse({ error: "المقال غير موجود." }, 404, PUBLIC_CORS);
  return jsonResponse(toPublicPost(row), 200, PUBLIC_CORS);
}

// ---------- Admin: auth ----------

async function handleLogin(request: Request, env: Env): Promise<Response> {
  if (!env.ADMIN_PASSWORD) {
    return jsonResponse({ error: "لم يتم إعداد كلمة مرور الإدارة على الخادم بعد." }, 500);
  }
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "طلب غير صالح." }, 400);
  }
  const password = typeof body.password === "string" ? body.password : "";
  if (!password || !safeEqual(password, env.ADMIN_PASSWORD)) {
    return jsonResponse({ error: "كلمة المرور غير صحيحة." }, 401);
  }

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000).toISOString();
  await env.DB
    .prepare("INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)")
    .bind(token, expiresAt)
    .run();

  return jsonResponse({ success: true }, 200, { "set-cookie": setSessionCookie(token) });
}

async function handleLogout(request: Request, env: Env): Promise<Response> {
  const token = readCookie(request, SESSION_COOKIE);
  if (token) {
    await env.DB.prepare("DELETE FROM admin_sessions WHERE token = ?").bind(token).run();
  }
  return jsonResponse({ success: true }, 200, { "set-cookie": clearSessionCookie() });
}

async function handleSession(request: Request, env: Env): Promise<Response> {
  return jsonResponse({ authenticated: await isAuthed(request, env) });
}

// ---------- Admin: posts CRUD ----------

async function handleAdminListPosts(env: Env): Promise<Response> {
  const { results } = await env.DB
    .prepare("SELECT * FROM posts ORDER BY updated_at DESC, id DESC")
    .all<PostRow>();
  return jsonResponse(results.map(toAdminPost));
}

async function handleAdminGetPost(id: number, env: Env): Promise<Response> {
  const row = await env.DB.prepare("SELECT * FROM posts WHERE id = ?").bind(id).first<PostRow>();
  if (!row) return jsonResponse({ error: "المقال غير موجود." }, 404);
  return jsonResponse(toAdminPost(row));
}

async function uniqueSlug(env: Env, base: string, excludeId?: number): Promise<string> {
  let candidate = base;
  let suffix = 2;
  for (;;) {
    const existing = excludeId
      ? await env.DB.prepare("SELECT id FROM posts WHERE slug = ? AND id != ?").bind(candidate, excludeId).first()
      : await env.DB.prepare("SELECT id FROM posts WHERE slug = ?").bind(candidate).first();
    if (!existing) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}

type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  coverImage: string | null;
  published: boolean;
};

// The admin form's cover-image field wants a plain URL, but it's an easy
// mix-up with the content editor's own `![alt](url)` image syntax — if a
// full Markdown image tag lands here anyway (pasted, or via a direct API
// call), pull just the URL back out rather than storing a broken value.
// The admin page does the same extraction client-side; this is the
// server-side backstop.
function extractPlainImageUrl(value: string): string {
  const match = value.match(/^!\[[^\]]*\]\(([^)\s]+)\)$/);
  return match ? match[1] : value;
}

function parsePostInput(body: Record<string, unknown>): { data?: PostInput; errors?: Record<string, string> } {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const excerpt = typeof body.excerpt === "string" ? body.excerpt.trim() : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const author = typeof body.author === "string" ? body.author.trim() : "";
  const coverImage =
    typeof body.coverImage === "string" && body.coverImage.trim()
      ? extractPlainImageUrl(body.coverImage.trim())
      : null;
  const published = Boolean(body.published);
  const rawSlug = typeof body.slug === "string" ? body.slug.trim() : "";

  const errors: Record<string, string> = {};
  if (!title) errors.title = "العنوان مطلوب.";
  if (!excerpt) errors.excerpt = "مقتطف قصير مطلوب.";
  if (!content) errors.content = "محتوى المقال مطلوب.";
  if (!author) errors.author = "اسم الكاتب مطلوب.";
  if (Object.keys(errors).length > 0) return { errors };

  const slugSource = rawSlug ? slugify(rawSlug) : slugify(title);
  return { data: { title, slug: slugSource, excerpt, content, author, coverImage, published } };
}

async function handleAdminCreatePost(request: Request, env: Env): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "طلب غير صالح." }, 400);
  }
  const { data, errors } = parsePostInput(body);
  if (errors) return jsonResponse({ error: "بيانات غير مكتملة.", fields: errors }, 400);

  const slug = await uniqueSlug(env, data!.slug);
  const publishedAt = data!.published ? new Date().toISOString() : null;

  const result = await env.DB
    .prepare(
      `INSERT INTO posts (slug, title, excerpt, content, author, cover_image, published, published_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
    )
    .bind(slug, data!.title, data!.excerpt, data!.content, data!.author, data!.coverImage, data!.published ? 1 : 0, publishedAt)
    .run();

  const row = await env.DB
    .prepare("SELECT * FROM posts WHERE id = ?")
    .bind(result.meta.last_row_id)
    .first<PostRow>();
  return jsonResponse(toAdminPost(row!), 201);
}

async function handleAdminUpdatePost(id: number, request: Request, env: Env): Promise<Response> {
  const existing = await env.DB.prepare("SELECT * FROM posts WHERE id = ?").bind(id).first<PostRow>();
  if (!existing) return jsonResponse({ error: "المقال غير موجود." }, 404);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "طلب غير صالح." }, 400);
  }
  const { data, errors } = parsePostInput(body);
  if (errors) return jsonResponse({ error: "بيانات غير مكتملة.", fields: errors }, 400);

  const slug = data!.slug === existing.slug ? existing.slug : await uniqueSlug(env, data!.slug, id);
  // Keep the original publish date once a post has gone live, even if
  // it's unpublished and republished later.
  const publishedAt = data!.published ? existing.published_at ?? new Date().toISOString() : existing.published_at;

  await env.DB
    .prepare(
      `UPDATE posts SET slug = ?, title = ?, excerpt = ?, content = ?, author = ?, cover_image = ?,
       published = ?, published_at = ?, updated_at = datetime('now') WHERE id = ?`
    )
    .bind(slug, data!.title, data!.excerpt, data!.content, data!.author, data!.coverImage, data!.published ? 1 : 0, publishedAt, id)
    .run();

  const row = await env.DB.prepare("SELECT * FROM posts WHERE id = ?").bind(id).first<PostRow>();
  return jsonResponse(toAdminPost(row!));
}

async function handleAdminDeletePost(id: number, env: Env): Promise<Response> {
  await env.DB.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
  return jsonResponse({ success: true });
}

// ---------- Admin: image upload ----------

async function handleAdminUpload(request: Request, env: Env): Promise<Response> {
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || !(file instanceof File)) {
    return jsonResponse({ error: "لم يتم إرفاق صورة." }, 400);
  }
  if (!file.type.startsWith("image/")) {
    return jsonResponse({ error: "الملف المرفق ليس صورة." }, 400);
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return jsonResponse({ error: "حجم الصورة أكبر من 5 ميجابايت." }, 400);
  }

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const key = `${crypto.randomUUID()}.${ext}`;
  await env.IMAGES.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  });

  const url = new URL(request.url);
  return jsonResponse({ url: `${url.origin}/uploads/${key}` }, 201);
}

async function handleServeUpload(key: string, env: Env): Promise<Response> {
  const object = await env.IMAGES.get(key);
  if (!object) return new Response("Not found", { status: 404 });
  return new Response(object.body, {
    headers: {
      "content-type": object.httpMetadata?.contentType || "application/octet-stream",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}

// ---------- Router ----------

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;

    if (method === "OPTIONS" && pathname.startsWith("/api/")) {
      return new Response(null, { status: 204, headers: PUBLIC_CORS });
    }

    // Public
    if (method === "GET" && pathname === "/api/posts") return handleListPosts(env);
    const postMatch = pathname.match(/^\/api\/posts\/([^/]+)$/);
    if (method === "GET" && postMatch) return handleGetPost(decodeURIComponent(postMatch[1]), env);

    if (method === "GET" && pathname.startsWith("/uploads/")) {
      return handleServeUpload(pathname.slice("/uploads/".length), env);
    }

    // Admin auth
    if (method === "POST" && pathname === "/api/admin/login") return handleLogin(request, env);
    if (method === "POST" && pathname === "/api/admin/logout") return handleLogout(request, env);
    if (method === "GET" && pathname === "/api/admin/session") return handleSession(request, env);

    // Admin posts CRUD (all require an authenticated session)
    if (method === "GET" && pathname === "/api/admin/posts") {
      return requireAuth((_r, e) => handleAdminListPosts(e))(request, env);
    }
    if (method === "POST" && pathname === "/api/admin/posts") {
      return requireAuth(handleAdminCreatePost)(request, env);
    }
    const adminPostMatch = pathname.match(/^\/api\/admin\/posts\/(\d+)$/);
    if (adminPostMatch) {
      const id = Number(adminPostMatch[1]);
      if (method === "GET") return requireAuth((_r, e) => handleAdminGetPost(id, e))(request, env);
      if (method === "PUT") return requireAuth((r, e) => handleAdminUpdatePost(id, r, e))(request, env);
      if (method === "DELETE") return requireAuth((_r, e) => handleAdminDeletePost(id, e))(request, env);
    }
    if (method === "POST" && pathname === "/api/admin/upload") {
      return requireAuth(handleAdminUpload)(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
