import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { ArrowNextIcon } from "@/components/icons";
import { COMMUNITY_URL } from "@/lib/content";
import type { ProgramDetail } from "@/lib/programs";

export default function ProgramClosingCTA({
  program,
}: {
  program: ProgramDetail;
}) {
  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-navy-deep via-navy to-teal-deep px-8 py-16 sm:py-24 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-20 w-72 h-72 rounded-full bg-sun/10 blur-3xl"
          />
          <Reveal className="relative flex flex-col items-center gap-8">
            <h2 className="font-arabic font-bold text-cream-soft text-3xl sm:text-4xl lg:text-5xl leading-snug balance">
              {program.closing}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                href={COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
              >
                انضم إلى برنامج {program.stage}
                <ArrowNextIcon className="w-4 h-4" />
              </Button>
              <Button
                href="/#programs"
                variant="secondary"
                className="!border-cream-soft/30 !text-cream-soft hover:!bg-cream-soft/10"
              >
                تصفح البرامج الأخرى
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
