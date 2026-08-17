import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { ArrowNextIcon } from "@/components/icons";
import type { ProgramDetail } from "@/lib/programs";

export default function ProgramHero({ program }: { program: ProgramDetail }) {
  const { Icon } = program;
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-teal/[0.06] blur-3xl"
      />

      <Container className="relative flex flex-col items-center text-center gap-7">
        <Reveal className="flex flex-col items-center gap-5">
          <span
            className={`flex items-center justify-center w-16 h-16 rounded-2xl ${program.tone}`}
          >
            <Icon className="w-7 h-7" />
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-mint px-4 py-1.5 text-sm font-semibold text-teal-deep">
            {program.order} — {program.stage}
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-arabic font-bold text-navy text-4xl sm:text-6xl lg:text-7xl leading-tight balance">
            {program.title}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-xl sm:text-2xl text-ink-soft leading-relaxed balance max-w-2xl">
            {program.tagline}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <Button href="#objectives" variant="primary" className="mt-2">
            استكشف البرنامج
            <ArrowNextIcon className="w-4 h-4" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
