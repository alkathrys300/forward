import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import {
  LinkedInIcon,
  CompassIcon,
  BriefcaseIcon,
  SparkIcon,
  BookIcon,
} from "@/components/icons";
import type { WorkshopItem } from "@/lib/workshops";

const highlightIcons = {
  vision: CompassIcon,
  experience: BriefcaseIcon,
  skills: SparkIcon,
  education: BookIcon,
};

function presenterInitials(name: string) {
  return name
    .replace(/^(م\.|أ\.|د\.)\s*/, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

export default function WorkshopPresenter({ item }: { item: WorkshopItem }) {
  if (!item.presenterBio || item.presenterBio.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-navy">
      <Container>
        <Reveal>
          <span className="inline-flex w-fit items-center rounded-full bg-cream-soft/10 border border-cream-soft/25 px-4 py-1.5 text-sm font-semibold text-cream-soft">
            مقدّم الورشة
          </span>
        </Reveal>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start mt-10">
          <Reveal className="flex flex-col items-center text-center gap-5">
            <div className="w-full max-w-xs aspect-[4/5] rounded-3xl overflow-hidden border border-cream-soft/15 bg-navy-deep/60">
              {item.presenterPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.presenterPhoto}
                  alt={item.presenter}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-cream-soft/20">
                  {item.presenter ? presenterInitials(item.presenter) : ""}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-cream-soft">{item.presenter}</h2>
              {item.presenterTitle && (
                <p className="text-teal-light font-semibold text-sm max-w-xs balance">
                  {item.presenterTitle}
                </p>
              )}
            </div>

            {item.presenterLinkedIn && (
              <a
                href={item.presenterLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-cream-soft text-navy px-5 py-2.5 text-sm font-bold hover:bg-cream-soft/90 transition-colors"
              >
                <LinkedInIcon className="w-4 h-4" />
                LinkedIn
              </a>
            )}
          </Reveal>

          <div className="flex flex-col gap-10">
            {item.presenterHighlights && item.presenterHighlights.length > 0 && (
              <Reveal delay={80} className="grid sm:grid-cols-2 gap-5">
                {item.presenterHighlights.map((highlight) => {
                  const Icon = highlightIcons[highlight.icon];
                  return (
                    <div
                      key={highlight.title}
                      className="flex flex-col gap-2.5 rounded-2xl bg-cream-soft/[0.04] border border-cream-soft/10 p-5"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal/20 text-teal-light shrink-0">
                          <Icon className="w-4 h-4" />
                        </span>
                        <h3 className="text-sm font-bold text-cream-soft">
                          {highlight.title}
                        </h3>
                      </div>
                      <p className="text-sm text-cream-soft/65 leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  );
                })}
              </Reveal>
            )}

            <Reveal delay={160} className="flex flex-col gap-4">
              {item.presenterBio.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-cream-soft/75 leading-loose text-[1.05rem] balance"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
