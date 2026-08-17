import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { SparkIcon } from "@/components/icons";
import type { ProgramDetail } from "@/lib/programs";

export default function ProgramFeatures({
  program,
}: {
  program: ProgramDetail;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="ماذا ستحصل عليه" title="مكونات البرنامج" />

        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          {program.features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 100}>
              <div className="h-full flex flex-col gap-4 rounded-3xl p-7 bg-cream-soft border border-navy/[0.06] shadow-[0_16px_40px_-28px_rgba(20,40,47,0.35)]">
                <span
                  className={`flex items-center justify-center w-11 h-11 rounded-xl2 ${program.tone}`}
                >
                  <SparkIcon className="w-5 h-5" />
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-navy leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-ink-soft">
                    {feature.description}
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
