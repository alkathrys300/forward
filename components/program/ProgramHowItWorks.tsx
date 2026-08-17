import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import type { ProgramDetail } from "@/lib/programs";

export default function ProgramHowItWorks({
  program,
}: {
  program: ProgramDetail;
}) {
  return (
    <section className="relative py-20 sm:py-24 bg-navy overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-teal/10 blur-3xl"
      />
      <Container className="relative">
        <SectionHeading eyebrow="كيف يعمل البرنامج" title="خطوات بسيطة وواضحة" tone="light" />

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="hidden sm:block absolute top-7 right-[8%] left-[8%] h-px bg-cream-soft/15"
          />
          <div className="grid sm:grid-cols-3 gap-10 sm:gap-6">
            {program.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 130} className="relative flex flex-col gap-4">
                <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-teal text-cream-soft font-bold text-lg">
                  {i + 1}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-cream-soft">
                    {step.title}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-cream-soft/65">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
