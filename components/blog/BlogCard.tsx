import { CalendarIcon, UsersIcon, ArrowNextIcon } from "@/components/icons";
import { formatArabicDate, type BlogPostSummary } from "@/lib/blog";

export default function BlogCard({ post }: { post: BlogPostSummary }) {
  return (
    <a
      href={`/blog/${post.slug}/`}
      className="group flex flex-col rounded-3xl overflow-hidden bg-cream-soft border border-navy/[0.06] shadow-[0_16px_40px_-28px_rgba(20,40,47,0.35)] transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10]">
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(155deg, #154B48, #3E8C86)" }}
            aria-hidden="true"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(247,242,231,0.9) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
      </div>

      <div className="flex flex-col gap-4 p-6 flex-1">
        <h3 className="text-lg font-bold text-navy leading-snug line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-ink-soft leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-navy/[0.06]">
          <div className="flex items-center gap-1.5 text-sm text-ink-faint">
            <CalendarIcon className="w-4 h-4" />
            <span>{formatArabicDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-ink-faint">
            <UsersIcon className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep">
          اقرأ المزيد
          <ArrowNextIcon className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
        </span>
      </div>
    </a>
  );
}
