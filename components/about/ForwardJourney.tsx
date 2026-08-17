import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import DrawPath from "@/components/DrawPath";
import {
  CompassIcon,
  BookIcon,
  RocketIcon,
  BriefcaseIcon,
  ArrowNextIcon,
} from "@/components/icons";

const stations = [
  {
    order: "01",
    stage: "تخصّص",
    title: "اكتشف اتجاهك.",
    Icon: CompassIcon,
    tone: "bg-teal-mint text-teal-deep",
  },
  {
    order: "02",
    stage: "تأهّب",
    title: "استعد للجامعة.",
    Icon: BookIcon,
    tone: "bg-sun/15 text-sun-deep",
  },
  {
    order: "03",
    stage: "تميّز",
    title: "اصنع تجربتك الجامعية.",
    Icon: RocketIcon,
    tone: "bg-navy text-cream-soft",
  },
  {
    order: "04",
    stage: "ما وراء الجامعة",
    title: "استعد للخطوة التالية.",
    Icon: BriefcaseIcon,
    tone: "bg-teal-mint text-teal-deep",
  },
];

export default function ForwardJourney() {
  return (
    <section id="journey" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-center text-center gap-4">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-teal-mint px-4 py-1.5 text-sm font-semibold text-teal-deep">
              رحلة فُورْوَرْد
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-arabic font-bold text-navy text-3xl sm:text-4xl lg:text-5xl balance">
              رحلة واحدة. أربع محطات.
            </h2>
          </Reveal>
        </div>

        {/* Desktop: horizontal path */}
        <div className="relative mt-24 hidden lg:block">
          <DrawPath
            viewBox="0 0 1200 10"
            className="absolute top-8 right-0 left-0 w-full h-2 text-navy/15"
            strokeWidth={1.5}
            d="M20 5 H1180"
            duration={1800}
          />

          <div className="relative flex items-start justify-between">
            <div className="flex flex-col items-center gap-3 w-24 pt-1">
              <span className="w-4 h-4 rounded-full bg-navy/20" />
              <span className="text-xs font-semibold text-ink-faint">
                البداية
              </span>
            </div>

            {stations.map((s, i) => (
              <Reveal
                key={s.order}
                delay={i * 160 + 200}
                className="flex flex-col items-center gap-4 w-52"
              >
                <span
                  className={`flex items-center justify-center w-16 h-16 rounded-2xl shadow-[0_16px_32px_-16px_rgba(20,40,47,0.35)] ${s.tone}`}
                >
                  <s.Icon className="w-7 h-7" />
                </span>
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-sm font-bold text-sun-deep">
                    {s.order} — {s.stage}
                  </span>
                  <span className="text-lg font-bold text-navy leading-snug">
                    {s.title}
                  </span>
                </div>
              </Reveal>
            ))}

            <Reveal
              delay={stations.length * 160 + 300}
              className="flex flex-col items-center gap-3 w-24 pt-1"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-teal text-cream-soft">
                <ArrowNextIcon className="w-4 h-4 rotate-180" />
              </span>
              <span className="text-xs font-semibold text-teal">للأمام</span>
            </Reveal>
          </div>
        </div>

        {/* Mobile / tablet: vertical path */}
        <div className="relative mt-16 lg:hidden">
          <DrawPath
            viewBox="0 10 10 800"
            className="absolute top-2 bottom-2 right-[26px] sm:right-[30px] w-2 h-[calc(100%-1rem)] text-navy/15"
            strokeWidth={1.5}
            d="M5 10 V790"
            duration={1800}
          />

          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-5">
              <span className="w-3.5 h-3.5 rounded-full bg-navy/20 shrink-0" />
              <span className="text-sm font-semibold text-ink-faint">
                البداية
              </span>
            </div>

            {stations.map((s, i) => (
              <Reveal key={s.order} delay={i * 140} className="flex items-center gap-5">
                <span
                  className={`flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 shadow-[0_14px_28px_-14px_rgba(20,40,47,0.35)] ${s.tone}`}
                >
                  <s.Icon className="w-6 h-6" />
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-sun-deep">
                    {s.order} — {s.stage}
                  </span>
                  <span className="text-lg font-bold text-navy leading-snug">
                    {s.title}
                  </span>
                </div>
              </Reveal>
            ))}

            <Reveal delay={stations.length * 140 + 100} className="flex items-center gap-5">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-teal text-cream-soft shrink-0">
                <ArrowNextIcon className="w-4 h-4 rotate-180" />
              </span>
              <span className="text-sm font-semibold text-teal">للأمام</span>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
