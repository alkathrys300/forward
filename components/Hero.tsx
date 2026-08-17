import Container from "./Container";
import Button from "./Button";
import { ArrowNextIcon } from "./icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 sm:pt-14 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-40 w-[32rem] h-[32rem] rounded-full bg-teal/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-32 w-96 h-96 rounded-full bg-sun/10 blur-3xl"
      />

      <Container className="relative grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
        <div className="flex flex-col items-start gap-7 animate-fade-up">
          <span className="inline-flex items-center rounded-full bg-teal-mint px-4 py-1.5 text-sm font-semibold text-teal-deep">
            فُورْوَرْد — رفيق رحلتك التعليمية
          </span>

          <h1 className="font-arabic font-bold text-navy text-[2.5rem] leading-[1.2] sm:text-5xl sm:leading-[1.2] lg:text-[3.4rem] lg:leading-[1.18] balance">
            مستقبلك ما يبدأ بعد التخرج.
            <br />
            يبدأ من الآن.
          </h1>

          <p className="text-lg leading-loose text-ink-soft max-w-xl balance">
            فُورْوَرْد مؤسسة تعليمية تساعدك على فهم مرحلتك، اكتشاف فرصك، وبناء
            خطواتك القادمة بوضوح.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button href="#programs" variant="primary">
              ابدأ رحلتك
              <ArrowNextIcon className="w-4 h-4" />
            </Button>
            <Button href="#about" variant="secondary">
              تعرّف على فُورْوَرْد
            </Button>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="relative aspect-[4/5] sm:aspect-[5/5.2] w-full max-w-lg mx-auto rounded-3xl overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-teal-deep shadow-[0_40px_80px_-30px_rgba(13,28,33,0.55)]">
            <svg
              viewBox="0 0 400 500"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F7CB94" />
                  <stop offset="100%" stopColor="#EFA45C" />
                </radialGradient>
                <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0D1C21" />
                  <stop offset="100%" stopColor="#22414A" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="400" height="500" fill="url(#skyFade)" />
              <circle cx="200" cy="235" r="95" fill="url(#sunGlow)" opacity="0.95" />
              <path
                d="M0 260 H400"
                stroke="#F7F2E7"
                strokeOpacity="0.18"
                strokeWidth="1.5"
              />
              <path
                d="M20 380 C120 340, 180 300, 200 265"
                stroke="#F7F2E7"
                strokeOpacity="0.55"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M0 500 C90 500, 110 260, 200 260 C290 260, 310 500, 400 500 Z"
                fill="#F7F2E7"
              />
              <g transform="translate(200,268)">
                <circle r="9" fill="#14282F" />
                <rect x="-7" y="6" width="14" height="26" rx="6" fill="#14282F" />
              </g>
            </svg>

            <div className="absolute top-8 left-8 rounded-2xl bg-cream-soft/95 px-4 py-2.5 shadow-lg animate-drift">
              <span className="text-sm font-semibold text-navy">وضوح</span>
            </div>
            <div className="absolute top-24 right-8 rounded-2xl bg-cream-soft/95 px-4 py-2.5 shadow-lg animate-drift [animation-delay:1.2s]">
              <span className="text-sm font-semibold text-navy">استعداد</span>
            </div>
            <div className="absolute bottom-24 right-10 rounded-2xl bg-cream-soft/95 px-4 py-2.5 shadow-lg animate-drift [animation-delay:2.4s]">
              <span className="text-sm font-semibold text-navy">نمو مستمر</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
