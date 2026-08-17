import Container from "./Container";
import Button from "./Button";
import { ArrowNextIcon } from "./icons";

export default function FinalCTA() {
  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-navy-deep via-navy to-teal-deep px-8 py-20 sm:py-28 text-center">
          <svg
            viewBox="0 0 800 300"
            className="absolute inset-x-0 bottom-0 w-full h-40 sm:h-56"
            preserveAspectRatio="xMidYMax slice"
            aria-hidden="true"
          >
            <circle cx="400" cy="230" r="130" fill="#EFA45C" opacity="0.9" />
            <path
              d="M0 240 H800"
              stroke="#F7F2E7"
              strokeOpacity="0.15"
              strokeWidth="1.5"
            />
            <path
              d="M0 300 C200 300, 260 240, 400 240 C540 240, 600 300, 800 300 Z"
              fill="#F7F2E7"
            />
          </svg>

          <div className="relative flex flex-col items-center gap-7">
            <h2 className="font-arabic font-bold text-cream-soft text-3xl sm:text-4xl lg:text-5xl leading-snug balance">
              خطوتك القادمة تبدأ الآن.
            </h2>
            <Button href="#programs" variant="light">
              ابدأ رحلتك
              <ArrowNextIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
