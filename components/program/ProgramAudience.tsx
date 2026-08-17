import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { UsersIcon } from "@/components/icons";
import type { ProgramDetail } from "@/lib/programs";

export default function ProgramAudience({
  program,
}: {
  program: ProgramDetail;
}) {
  return (
    <section className="py-6 sm:py-10">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-teal-mint px-8 py-14 sm:px-16 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -left-16 w-64 h-64 rounded-full bg-teal/15 blur-3xl"
            />
            <div className="relative grid lg:grid-cols-[auto_1fr] gap-8 items-center">
              <span className="hidden lg:flex items-center justify-center w-16 h-16 rounded-2xl bg-cream-soft text-teal-deep shrink-0">
                <UsersIcon className="w-7 h-7" />
              </span>
              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-teal-deep">
                  لمن هذا البرنامج؟
                </span>
                <p className="text-xl sm:text-2xl font-semibold text-navy leading-relaxed balance">
                  {program.audienceDetail}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
