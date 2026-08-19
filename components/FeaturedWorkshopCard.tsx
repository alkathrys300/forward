import { CalendarIcon, PinIcon, TagIcon, UsersIcon, ArrowNextIcon } from "./icons";
import type { WorkshopItem } from "@/lib/workshops";

export default function FeaturedWorkshopCard({ item }: { item: WorkshopItem }) {
  const linkProps = item.slug
    ? { href: `/workshops/${item.slug}/` }
    : item.youtubeUrl
      ? { href: item.youtubeUrl, target: "_blank", rel: "noopener noreferrer" }
      : { href: "#" };

  return (
    <a
      {...linkProps}
      className="group relative flex flex-col lg:grid lg:grid-cols-[1.1fr_1fr] overflow-hidden rounded-3xl bg-cream-soft border-2 border-sun/40 shadow-[0_28px_60px_-24px_rgba(217,130,47,0.35)]"
    >
      <span className="absolute top-5 right-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-navy text-cream-soft px-3.5 py-1.5 text-xs font-bold shadow-md">
        ✦ مميّز
      </span>

      <div className="relative aspect-[16/10] lg:aspect-auto">
        {item.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="flex flex-col gap-4 p-7 sm:p-9 justify-center">
        <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold ${item.tone}`}>
          {item.kind}
        </span>

        <h3 className="text-2xl sm:text-[1.75rem] font-bold text-navy leading-snug">
          {item.title}
        </h3>

        {item.presenter && (
          <div className="flex items-center gap-2 text-ink-soft">
            <UsersIcon className="w-4 h-4 text-teal-deep shrink-0" />
            <span>{item.presenter}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-soft pt-2 border-t border-navy/[0.08]">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4 text-teal-deep shrink-0" />
            <span>{item.date}</span>
          </div>
          {item.location && (
            <div className="flex items-center gap-1.5">
              <PinIcon className="w-4 h-4 text-teal-deep shrink-0" />
              <span>{item.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 font-bold text-teal-deep">
            <TagIcon className="w-4 h-4 shrink-0" />
            <span>{item.price}</span>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 w-fit rounded-full bg-navy text-cream-soft px-6 py-3 text-sm font-semibold mt-1 transition-colors group-hover:bg-navy-light">
          التفاصيل والتسجيل
          <ArrowNextIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        </span>
      </div>
    </a>
  );
}
