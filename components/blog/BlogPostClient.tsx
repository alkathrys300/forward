"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import ShareButton from "@/components/workshop/ShareButton";
import { ArrowNextIcon, CalendarIcon, UsersIcon } from "@/components/icons";
import { fetchBlogPost, formatArabicDate, type BlogPost } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";

type State =
  | { status: "loading" }
  | { status: "not-found" }
  | { status: "error"; message: string }
  | { status: "ready"; post: BlogPost };

// The static export can't pre-render a page per post (new posts appear
// without a rebuild — see lib/blog.ts), so this one shell handles every
// post. A Cloudflare _redirects rule rewrites /blog/<slug>/ to this page
// while leaving the address bar showing the original URL, so the slug is
// read from the real browser URL rather than from Next's router.
function slugFromLocation(): string | null {
  const segments = window.location.pathname.split("/").filter(Boolean);
  // segments look like ["blog", "<slug>"]
  if (segments[0] !== "blog" || !segments[1] || segments[1] === "post") return null;
  return decodeURIComponent(segments[1]);
}

export default function BlogPostClient() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const slug = slugFromLocation();
    if (!slug) {
      setState({ status: "not-found" });
      return;
    }
    let cancelled = false;
    fetchBlogPost(slug)
      .then((post) => {
        if (cancelled) return;
        if (!post) {
          setState({ status: "not-found" });
          return;
        }
        document.title = `${post.title} — فُورْوَرْد`;
        setState({ status: "ready", post });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({ status: "error", message: err.message || "تعذر تحميل المقال." });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <section className="py-24">
        <Container className="max-w-3xl animate-pulse flex flex-col gap-5">
          <div className="h-4 w-24 rounded-full bg-navy/[0.08]" />
          <div className="h-10 w-3/4 rounded bg-navy/[0.08]" />
          <div className="aspect-[16/9] rounded-3xl bg-navy/[0.06]" />
        </Container>
      </section>
    );
  }

  if (state.status === "not-found") {
    return (
      <section className="py-28">
        <Container className="max-w-xl text-center flex flex-col items-center gap-5">
          <p className="text-2xl font-bold text-navy">المقال غير موجود</p>
          <p className="text-ink-soft">
            ربما تم حذفه أو أن الرابط غير صحيح.
          </p>
          <a
            href="/blog/"
            className="inline-flex items-center gap-2 rounded-full bg-navy text-cream-soft px-6 py-3 text-sm font-semibold hover:bg-navy-light transition-colors"
          >
            العودة إلى المدونة
            <ArrowNextIcon className="w-4 h-4" />
          </a>
        </Container>
      </section>
    );
  }

  if (state.status === "error") {
    return (
      <section className="py-28">
        <Container className="max-w-xl text-center">
          <p className="text-ink-soft">{state.message}</p>
        </Container>
      </section>
    );
  }

  const { post } = state;

  return (
    <article className="pt-10 pb-24 sm:pt-14">
      <Container className="max-w-3xl">
        <Reveal className="flex flex-col gap-6">
          <a
            href="/blog/"
            className="inline-flex items-center gap-1.5 w-fit text-sm font-semibold text-teal-deep hover:text-teal transition-colors"
          >
            <ArrowNextIcon className="w-4 h-4 rotate-180" />
            المدونة
          </a>

          <h1 className="font-arabic font-bold text-navy text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight balance">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-soft pb-2 border-b border-navy/[0.08]">
            <div className="flex items-center gap-1.5">
              <UsersIcon className="w-4 h-4 text-teal-deep shrink-0" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-teal-deep shrink-0" />
              <span>{formatArabicDate(post.publishedAt)}</span>
            </div>
            <div className="ms-auto">
              <ShareButton title={post.title} />
            </div>
          </div>

          {post.coverImage && (
            <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_30px_60px_-24px_rgba(20,40,47,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
          />
        </Reveal>
      </Container>
    </article>
  );
}
