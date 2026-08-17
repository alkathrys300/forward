import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import DrawPath from "@/components/DrawPath";

const chaosItems = [
  "تخصصات كثيرة.",
  "تجارب مختلفة.",
  "قرارات متتابعة.",
  "أسئلة لا نجد لها دائمًا مساحة كافية.",
];

const scatterPositions = [
  { top: "8%", right: "18%" },
  { top: "38%", right: "58%" },
  { top: "62%", right: "8%" },
  { top: "18%", right: "72%" },
  { top: "70%", right: "42%" },
  { top: "42%", right: "28%" },
];

export default function WhyForward() {
  return (
    <section className="relative py-20 sm:py-28 bg-navy overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-teal/10 blur-3xl"
      />

      <Container className="relative flex flex-col items-center text-center gap-6">
        <Reveal>
          <span className="inline-flex items-center rounded-full bg-cream-soft/10 border border-cream-soft/25 px-4 py-1.5 text-sm font-semibold text-cream-soft">
            لماذا فُورْوَرْد؟
          </span>
        </Reveal>

        <Reveal delay={80}>
          <p className="text-xl sm:text-2xl text-cream-soft/70 leading-relaxed balance max-w-2xl">
            في مراحل التعليم، لا تكون المشكلة دائمًا في قلة الخيارات.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <h2 className="font-arabic font-bold text-cream-soft text-4xl sm:text-5xl lg:text-6xl leading-tight balance">
            أحيانًا تكون المشكلة في كثرتها.
          </h2>
        </Reveal>
      </Container>

      <Container className="relative mt-16 sm:mt-20">
        <div className="flex flex-col items-center gap-3">
          {chaosItems.map((item, i) => (
            <Reveal key={item} delay={i * 140} className="flex flex-col items-center gap-3">
              <span className="text-lg sm:text-xl font-semibold text-cream-soft/85">
                {item}
              </span>
              {i < chaosItems.length - 1 && (
                <span className="text-sun-light/70 text-xl" aria-hidden="true">
                  ↓
                </span>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={chaosItems.length * 140 + 120}>
          <p className="mt-14 text-center font-arabic font-bold text-teal-light text-2xl sm:text-3xl">
            من هنا جاءت فُورْوَرْد.
          </p>
        </Reveal>
      </Container>

      <Container className="relative mt-16 sm:mt-24">
        <div className="relative h-40 sm:h-48 max-w-2xl mx-auto">
          <Reveal className="absolute inset-0">
            <div className="relative w-full h-full" aria-hidden="true">
              {scatterPositions.map((pos, i) => (
                <span
                  key={i}
                  className="absolute w-2.5 h-2.5 rounded-full bg-cream-soft/25"
                  style={pos}
                />
              ))}
            </div>
          </Reveal>
          <DrawPath
            viewBox="0 0 500 100"
            className="absolute inset-0 w-full h-full text-sun"
            strokeWidth={2.5}
            d="M480 50 H40 M40 50 L70 32 M40 50 L70 68"
            delay={500}
            duration={1400}
          />
        </div>
      </Container>

      <Container className="relative mt-14 sm:mt-20 flex flex-col items-center text-center gap-5">
        <Reveal>
          <p className="text-xl sm:text-2xl text-cream-soft/70 leading-relaxed balance max-w-xl">
            نحن لا نرسم المستقبل بدلًا عنك.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h3 className="font-arabic font-bold text-cream-soft text-4xl sm:text-6xl lg:text-7xl leading-tight balance">
            نساعدك على أن ترسمه بنفسك.
          </h3>
        </Reveal>
        <Reveal delay={260}>
          <span
            aria-hidden="true"
            className="block h-1 w-24 sm:w-32 rounded-full bg-gradient-to-l from-sun to-teal mt-2"
          />
        </Reveal>
      </Container>
    </section>
  );
}
