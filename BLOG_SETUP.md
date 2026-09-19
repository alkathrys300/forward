# Blog section — setup & architecture

## Why a CMS/admin form instead of Markdown files

The brief allowed either local MDX files or a simple CMS. This picked
the CMS/admin-form route because the actual requirement was daily posts
from a non-developer teammate with no redeploy — MDX files satisfy "no
code edits" but not "no redeploy," since a new `.mdx` file only becomes
a live page after the site is rebuilt and re-exported.

## Why it's two projects, not one

`next.config.mjs` has `output: "export"` — this site is a fully static
export with no Next.js server, deployed to Cloudflare as static files
(see the root `wrangler.jsonc`, which just points `assets.directory` at
`./out`). A static export can't run an API route, a server action, or
ISR — there's no server to run them on. The existing `gated-registration`
folder already establishes this project's answer to that: when something
needs a real backend (a database, an admin password, content that
changes without a rebuild), it becomes its own small Cloudflare Worker
that the static site calls over `fetch`.

`blog-cms/` follows the exact same pattern for the blog:

- It's a Cloudflare Worker with its own D1 database (posts) and R2
  bucket (uploaded cover images).
- It serves a password-protected admin page at `/admin/` where a
  teammate creates, edits, publishes and deletes posts — see
  **`blog-cms/HOW_TO_POST.md`** for the plain-language walkthrough.
- It exposes a small public JSON API (`GET /api/posts`,
  `GET /api/posts/:slug`) that this Next.js site's `/blog` pages call
  client-side at page-load time.

That last point is what makes "publish a post, see it live, no
redeploy" actually true: the HTML/JS for `/blog` is static and doesn't
change, but every time someone loads it, it fetches the current post
list from the Worker — so a post published five minutes ago shows up
immediately, without anyone touching the Next.js site or Cloudflare
deploy at all.

## The one edit you need to make

After deploying `blog-cms` (full steps in `blog-cms/README.md`), copy
the Worker URL it prints and put it in [lib/blog.ts](lib/blog.ts):

```ts
export const BLOG_API_BASE =
  process.env.NEXT_PUBLIC_BLOG_API_URL || "https://forward-blog-cms.YOUR_SUBDOMAIN.workers.dev";
```

Replace the placeholder URL (or set `NEXT_PUBLIC_BLOG_API_URL` as a
build-time env var instead, if you'd rather not edit the file). Rebuild
and redeploy the main site once after this change — it's the only time
a blog change requires touching the main site at all.

## How `/blog/<slug>/` pages work without a rebuild

Because new slugs don't exist at build time, they can't be pre-rendered
by Next's static export the normal way (`generateStaticParams` only
knows about posts that existed at build time — like `/workshops/[slug]`
does today). Instead there's a single static shell at `/blog/post/`
(`app/blog/post/page.tsx`), and [public/_redirects](public/_redirects)
rewrites any `/blog/<slug>/` request to that shell — a mechanism
Cloudflare's static asset hosting supports natively (the same one
Cloudflare Pages uses). The rewrite is invisible in the browser: the
address bar keeps showing `/blog/<slug>/`, and the shell page reads
that real slug back out of `window.location` to know which post to
fetch. See the comment at the top of
`components/blog/BlogPostClient.tsx` for the exact mechanics.

**Tradeoff worth knowing:** because the post's content loads client-side
after the page renders, this page ships generic metadata rather than
each post's real title/description/cover image (`app/blog/post/page.tsx`
has the details). Search engines that execute JavaScript (Google) still
index the real content fine; link-preview bots that don't execute
JavaScript (Slack, WhatsApp, Twitter/X unfurls) will show the generic
blog title instead of the post's own. Fixing that properly needs a real
server (SSR) rendering each post's `<head>` per-request — out of scope
here since it would mean giving up the static export for the whole
site, not just the blog.

## Files this feature added

- `blog-cms/` — the Worker, admin page, and its own README + setup
  guide (`blog-cms/README.md`, `blog-cms/HOW_TO_POST.md`).
- `lib/blog.ts` — fetch helpers + the `BLOG_API_BASE` URL to edit.
- `lib/markdown.ts` — the small Markdown renderer used to display post
  content (mirrored in `blog-cms/public/admin/index.html`'s preview).
- `components/blog/` — `BlogHero`, `BlogCard`, `BlogListClient`,
  `BlogPostClient`.
- `app/blog/page.tsx` — the `/blog` listing page.
- `app/blog/post/page.tsx` — the single shell used for every post.
- `public/_redirects` — the rewrite rule described above.
- Nav/footer links to `/blog/` in `components/Navbar.tsx` and
  `components/Footer.tsx`.
- `tsconfig.json` — excluded `blog-cms/` and `gated-registration/` from
  the main site's typecheck (they're separate Worker projects with
  their own `tsconfig.json`; Next's build was otherwise trying to
  typecheck Cloudflare-only types it doesn't know about).
