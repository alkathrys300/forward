import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { UsersIcon } from "@/components/icons";
import type { WorkshopItem } from "@/lib/workshops";
import RegistrationSidebar from "./RegistrationSidebar";

export default function WorkshopDetailHero({ item }: { item: WorkshopItem }) {
  return (
    <section className="pt-10 pb-16 sm:pt-14 sm:pb-20">
      <Container className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-12 items-start">
        <Reveal className="flex flex-col gap-6 order-2 lg:order-1">
          <div className="flex flex-col gap-4">
            <span
              className={`inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-bold ${item.tone}`}
            >
              {item.kind}
            </span>
            <h1 className="font-arabic font-bold text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight balance">
              {item.title}
            </h1>
            {item.presenter && (
              <div className="flex items-start gap-2 text-ink-soft">
                <UsersIcon className="w-4 h-4 text-teal-deep mt-1 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold text-navy">{item.presenter}</span>
                  {item.presenterTitle && (
                    <span className="text-sm text-ink-soft">
                      {item.presenterTitle}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {item.imageUrl && (
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_30px_60px_-24px_rgba(20,40,47,0.4)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
        </Reveal>

        <Reveal delay={100} className="order-1 lg:order-2">
          <RegistrationSidebar item={item} />
        </Reveal>
      </Container>
    </section>
  );
}
