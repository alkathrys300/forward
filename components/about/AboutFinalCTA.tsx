import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import DrawPath from "@/components/DrawPath";
import { ArrowNextIcon } from "@/components/icons";
import { COMMUNITY_URL } from "@/lib/content";

export default function AboutFinalCTA() {
  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-navy-deep via-navy to-teal-deep px-8 pt-14 sm:pt-20 pb-20 sm:pb-28 text-center">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-32 sm:h-44"
          >
            <div className="absolute left-1/2 bottom-10 sm:bottom-14 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-sun-light to-sun shadow-[0_0_70px_14px_rgba(239,164,92,0.3)]" />
            <DrawPath
              viewBox="0 0 800 160"
              className="absolute inset-0 w-full h-full text-cream-soft/25"
              strokeWidth={2}
              d="M60 150 C 250 150, 320 70, 400 60 C 480 70, 550 150, 740 150"
              duration={1800}
            />
          </div>

          <Reveal className="relative flex flex-col items-center gap-8">
            <h2 className="font-arabic font-bold text-cream-soft text-3xl sm:text-4xl lg:text-5xl leading-snug balance">
              خطوتك القادمة تبدأ الآن.
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                href={COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
              >
                انضم إلى المجتمع
                <ArrowNextIcon className="w-4 h-4" />
              </Button>
              <Button
                href="/#programs"
                variant="secondary"
                className="!border-cream-soft/30 !text-cream-soft hover:!bg-cream-soft/10"
              >
                استكشف البرامج
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
