import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import type { WorkshopItem } from "@/lib/workshops";

export default function WorkshopAgenda({ item }: { item: WorkshopItem }) {
  if (!item.agenda || item.agenda.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="محاور الورشة" title="ماذا ستتعلم؟" />

        <div className="mt-12 flex flex-col divide-y divide-navy/[0.08] border-t border-b border-navy/[0.08]">
          {item.agenda.map((topic, i) => (
            <Reveal key={topic.title} delay={i * 70}>
              <div className="grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 py-7">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-mint text-teal-deep font-bold text-sm shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-bold text-navy leading-snug">
                    {topic.title}
                  </h3>
                  <p className="text-ink-soft leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
