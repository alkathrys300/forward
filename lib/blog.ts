// The main site is a fully static export (see next.config.mjs,
// output: "export") with no server of its own, so blog posts can't
// live in build-time data or a Next.js API route the way workshops do
// — a new post would need a full rebuild + redeploy to appear. Instead
// posts are stored and served by a small separate Cloudflare Worker
// (../blog-cms) with its own database, and these pages fetch from it
// client-side at runtime. That's what makes "publish a post, see it
// live with no redeploy" possible on a static export.
//
// IMPORTANT: after deploying blog-cms (see blog-cms/README.md), replace
// the URL below with the real Worker URL it prints on deploy, e.g.
// "https://forward-blog-cms.your-subdomain.workers.dev". You can also
// set NEXT_PUBLIC_BLOG_API_URL at build time instead of editing this file.
export const BLOG_API_BASE =
  process.env.NEXT_PUBLIC_BLOG_API_URL || "https://forward-blog-cms.forward-edu.workers.dev";

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  author: string;
  publishedAt: string | null;
};

export type BlogPost = BlogPostSummary & {
  content: string;
};

async function parseJsonOrThrow(res: Response): Promise<any> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || "تعذر تحميل المدونة.");
  return data;
}

export async function fetchBlogPosts(): Promise<BlogPostSummary[]> {
  const res = await fetch(`${BLOG_API_BASE}/api/posts`, { cache: "no-store" });
  const data = await parseJsonOrThrow(res);
  return Array.isArray(data) ? data : [];
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${BLOG_API_BASE}/api/posts/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  return parseJsonOrThrow(res);
}

export function formatArabicDate(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ar", { day: "numeric", month: "long", year: "numeric" }).format(date);
}
