import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import { workshopItems, getYouTubeThumbnail, type WorkshopItem } from "@/lib/workshops";
import { CalendarIcon, TagIcon, UsersIcon, ArrowNextIcon, PlayIcon } from "./icons";
import { COMMUNITY_URL } from "@/lib/content";

function WorkshopCard({ item }: { item: WorkshopItem }) {
  const videoThumbnail = item.youtubeUrl ? getYouTubeThumbnail(item.youtubeUrl) : null;
  const poster = videoThumbnail || item.imageUrl || null;
  const hasDetailsPage = Boolean(item.slug);
  const CardTag = hasDetailsPage || item.youtubeUrl ? "a" : "div";
  const linkProps = hasDetailsPage
    ? { href: `/workshops/${item.slug}/` }
    : item.youtubeUrl
      ? { href: item.youtubeUrl, target: "_blank", rel: "noopener noreferrer" }
      : {};

  return (
    <CardTag
      {...linkProps}
      className="group flex flex-col rounded-3xl overflow-hidden bg-cream-soft border border-navy/[0.06] shadow-[0_16px_40px_-28px_rgba(20,40,47,0.35)]"
    >
      <div className="relative aspect-[16/10]">
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                item.kind === "ورشة"
                  ? "linear-gradient(155deg, #154B48, #3E8C86)"
                  : "linear-gradient(155deg, #D9822F, #EFA45C)",
            }}
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
        {videoThumbnail && (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-navy-deep/20 group-hover:bg-navy-deep/35 transition-colors"
          >
            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-cream-soft/90 text-navy shadow-lg transition-transform group-hover:scale-105">
              <PlayIcon className="w-6 h-6 -translate-x-0.5" />
            </span>
          </div>
        )}
        {hasDetailsPage && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-cream-soft/95 px-3 py-1.5 text-xs font-bold text-navy shadow-md">
            التفاصيل والتسجيل
            <ArrowNextIcon className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          </span>
        )}
        <span
          className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold ${item.tone}`}
        >
          {item.kind}
        </span>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <h3 className="text-lg font-bold text-navy leading-snug line-clamp-2">
          {item.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-ink-soft">
          <UsersIcon className="w-4 h-4 text-teal-deep shrink-0" />
          <span>{item.host}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-navy/[0.06]">
          <div className="flex items-center gap-1.5 text-sm text-ink-faint">
            <CalendarIcon className="w-4 h-4" />
            <span>{item.date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-bold text-teal-deep">
            <TagIcon className="w-4 h-4" />
            <span>{item.price}</span>
          </div>
        </div>
      </div>
    </CardTag>
  );
}

export default function WorkshopsSection() {
  return (
    <section id="workshops" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading
            eyebrow="ورش العمل والإعلانات"
            title="تعلّم من خلال التجربة، أول بأول."
            description="تابع أحدث ورش فُورْوَرْد وفعالياتها وإعلاناتها، وكن أول من ينضم."
          />
          <Button
            href={COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="shrink-0"
          >
            تابع كل الورش
            <ArrowNextIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {workshopItems.map((item) => (
            <WorkshopCard key={item.title} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
