import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import { workshopItems, getYouTubeThumbnail, type WorkshopItem } from "@/lib/workshops";
import { CalendarIcon, PinIcon, TagIcon, UsersIcon, ArrowNextIcon, PlayIcon } from "./icons";
import { COMMUNITY_URL } from "@/lib/content";

function FeaturedWorkshopCard({ item }: { item: WorkshopItem }) {
  const linkProps = item.slug
    ? { href: `/workshops/${item.slug}/` }
    : item.youtubeUrl
      ? { href: item.youtubeUrl, target: "_blank", rel: "noopener noreferrer" }
      : { href: "#" };

  return (
    <a
      {...linkProps}
      className="group relative flex flex-col lg:grid lg:grid-cols-[1.1fr_1fr] overflow-hidden rounded-3xl bg-cream-soft border-2 border-sun/40 shadow-[0_28px_60px_-24px_rgba(217,130,47,0.35)] mb-6"
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
  // Custom-designed posters (item.imageUrl) already carry their own baked-in
  // badge/branding — only overlay our own kind badge on auto-generated
  // YouTube thumbnails or the plain gradient placeholder.
  const showKindBadge = Boolean(videoThumbnail) || !poster;

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
        {showKindBadge && (
          <span
            className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold ${item.tone}`}
          >
            {item.kind}
          </span>
        )}
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
  const featuredItems = workshopItems.filter((item) => item.featured);
  const regularItems = workshopItems.filter((item) => !item.featured);

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

        <div className="mt-14">
          {featuredItems.map((item) => (
            <FeaturedWorkshopCard key={item.title} item={item} />
          ))}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularItems.map((item) => (
              <WorkshopCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
