import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { LinkedInIcon } from "@/components/icons";
import type { WorkshopItem } from "@/lib/workshops";

export default function WorkshopPresenter({ item }: { item: WorkshopItem }) {
  if (!item.presenterBio || item.presenterBio.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-navy">
      <Container>
        <Reveal className="flex flex-col gap-6 max-w-3xl">
          <span className="inline-flex w-fit items-center rounded-full bg-cream-soft/10 border border-cream-soft/25 px-4 py-1.5 text-sm font-semibold text-cream-soft">
            مقدّم الورشة
          </span>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-cream-soft">
              {item.presenter}
            </h2>
            {item.presenterLinkedIn && (
              <a
                href={item.presenterLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-cream-soft/10 hover:bg-cream-soft/15 border border-cream-soft/25 px-4 py-1.5 text-sm font-semibold text-cream-soft transition-colors"
              >
                <LinkedInIcon className="w-4 h-4" />
                LinkedIn
              </a>
            )}
          </div>

          {item.presenterTitle && (
            <p className="text-teal-light font-semibold -mt-2">
              {item.presenterTitle}
            </p>
          )}

          <div className="flex flex-col gap-4">
            {item.presenterBio.map((paragraph, i) => (
              <p
                key={i}
                className="text-cream-soft/75 leading-loose text-[1.05rem] balance"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
