import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { CheckIcon } from "@/components/icons";
import type { ProgramDetail } from "@/lib/programs";

export default function ProgramObjectives({
  program,
}: {
  program: ProgramDetail;
}) {
  return (
    <section id="objectives" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="أهداف البرنامج"
          title={`ماذا يساعدك برنامج ${program.stage} على تحقيقه؟`}
        />

        <ul className="mt-12 flex flex-col gap-4 max-w-2xl">
          {program.objectives.map((objective, i) => (
            <Reveal key={objective} delay={i * 90}>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-mint text-teal-deep shrink-0 mt-0.5">
                  <CheckIcon className="w-4 h-4" />
                </span>
                <span className="text-lg leading-relaxed text-ink-soft balance pt-1">
                  {objective}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
