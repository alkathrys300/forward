# Blog CMS (Cloudflare Workers + D1 + R2)

Standalone Worker that powers the `/blog` section of the main site. It
serves a small public JSON API (list posts, get one post by slug) and a
password-protected admin page at `/admin/` where a non-technical team
member can write, edit, publish and delete posts — no code changes and
no redeploy of the main site required for a new post to go live.

It exists as its own Worker (same pattern as `../gated-registration`)
because the main site (`/`) is a fully static export (`output: "export"`
in `next.config.mjs`) with no server of its own, so anything that needs
to store and serve data that changes without a rebuild has to live in a
small separate Worker that the static site talks to over `fetch`.

## How it works

- `src/index.ts` — the Worker. Serves `public/` (the admin page) as
  static assets, except these intercepted routes:
  - `GET /api/posts` — published posts, newest first (public, no auth).
  - `GET /api/posts/:slug` — one published post's full content (public).
  - `POST /api/admin/login` / `POST /api/admin/logout` / `GET /api/admin/session`
    — password login, backed by an opaque D1 session token in an
    httpOnly cookie (same approach as the gated-registration worker).
  - `GET/POST /api/admin/posts`, `GET/PUT/DELETE /api/admin/posts/:id`
    — full CRUD, admin session required.
  - `POST /api/admin/upload` — image upload (multipart, 5MB max) into
    an R2 bucket; returns a public URL to store as the post's cover image.
  - `GET /uploads/:key` — serves an uploaded image back out of R2.
- `public/admin/index.html` — the whole admin app: login screen, post
  list, and the post editor (title, slug, excerpt, cover image
  upload-or-URL, Markdown content with a formatting toolbar + preview,
  publish toggle). Single file, vanilla JS, no build step.
- `src/slugify.ts` — turns a title into a URL slug, transliterating
  common Arabic letters to Latin first (since most titles are Arabic
  and a plain ASCII-only slugify would leave nothing). The slug field
  in the admin form is always editable, so this is only ever a
  starting suggestion.
- `migrations/0001_init.sql` — the `posts` and `admin_sessions` tables.

## First-time setup

```bash
cd blog-cms
npm install

# 1. Create the D1 database (only once)
npx wrangler d1 create forward_blog
```

That prints a `database_id` — copy it into `wrangler.jsonc`, replacing
`REPLACE_WITH_YOUR_DATABASE_ID`.

```bash
# 2. Create the R2 bucket for uploaded cover images (only once)
npx wrangler r2 bucket create forward-blog-images

# 3. Apply the schema to the real (remote) database
npm run db:migrate:remote

# 4. Set the admin password (pick a strong one — this is the only thing
#    gating who can write to the blog)
npx wrangler secret put ADMIN_PASSWORD

# 5. Deploy
npm run deploy
```

Wrangler prints the Worker's URL when it deploys
(`https://forward-blog-cms.<your-subdomain>.workers.dev` by default,
or a custom domain if one is attached in the Cloudflare dashboard).
Copy that URL into `lib/blog.ts` in the main site
(`BLOG_API_BASE`) — that's the one edit that wires the static site to
this Worker. See the main site's `BLOG_SETUP.md` for that step.

## Local development

```bash
npm install
npm run db:migrate:local     # sets up a local D1 instance for testing
echo 'ADMIN_PASSWORD="dev-password"' > .dev.vars
npm run dev                  # wrangler dev, http://localhost:8787
```

`wrangler dev` runs entirely locally (its own local D1/R2 under
`.wrangler/`), so you can create and publish test posts without
touching the real database.

## Notes

- There's a single shared admin password (no per-user accounts) — this
  matches the "one small team, one no-code tool" scope. Rotate it with
  `wrangler secret put ADMIN_PASSWORD` if it's ever shared beyond the
  team.
- Session tokens are opaque, DB-backed UUIDs in an httpOnly cookie
  (not JWTs), the same choice made in the gated-registration worker —
  simpler than signing/verifying, and revoking access is a single
  `DELETE` in `admin_sessions`.
- The Markdown support is a small hand-written subset (headings,
  **bold**, *italic*, links, images, lists, blockquotes, paragraphs) —
  not a full CommonMark implementation — chosen so the main site
  doesn't need a new npm dependency to render it. It's enough for
  ordinary blog writing; anything fancier (tables, embeds, footnotes)
  isn't supported.
- Public GET endpoints send `Access-Control-Allow-Origin: *` since
  they're read-only, cookie-free, and called cross-origin from the
  static site's domain. Admin endpoints don't need CORS because the
  admin page is served by this same Worker.
