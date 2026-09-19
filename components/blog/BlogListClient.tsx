"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import BlogCard from "./BlogCard";
import { fetchBlogPosts, type BlogPostSummary } from "@/lib/blog";

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; posts: BlogPostSummary[] };

function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-3xl overflow-hidden bg-cream-soft border border-navy/[0.06] animate-pulse">
      <div className="aspect-[16/10] bg-navy/[0.06]" />
      <div className="flex flex-col gap-3 p-6">
        <div className="h-4 w-3/4 rounded bg-navy/[0.08]" />
        <div className="h-3 w-full rounded bg-navy/[0.06]" />
        <div className="h-3 w-5/6 rounded bg-navy/[0.06]" />
      </div>
    </div>
  );
}

export default function BlogListClient() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    fetchBlogPosts()
      .then((posts) => {
        if (cancelled) return;
        // Belt-and-suspenders: the API already sorts newest-first, but
        // the UI contract (newest first) shouldn't depend on that.
        const sorted = [...posts].sort((a, b) => {
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dateB - dateA;
        });
        setState({ status: "ready", posts: sorted });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({ status: "error", message: err.message || "تعذر تحميل المدونة." });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="pb-24 sm:pb-32">
      <Container>
        {state.status === "loading" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {state.status === "error" && (
          <div className="rounded-3xl bg-cream-soft border border-navy/[0.06] p-10 text-center">
            <p className="text-ink-soft">{state.message}</p>
          </div>
        )}

        {state.status === "ready" && state.posts.length === 0 && (
          <div className="rounded-3xl bg-cream-soft border border-navy/[0.06] p-14 text-center">
            <p className="text-lg font-semibold text-navy">لا توجد مقالات بعد</p>
            <p className="mt-2 text-ink-soft">ترقّب أول مقالات مدونة فُورْوَرْد قريبًا.</p>
          </div>
        )}

        {state.status === "ready" && state.posts.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.posts.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i, 6) * 60}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
