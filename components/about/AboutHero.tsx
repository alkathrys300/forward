import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import DrawPath from "@/components/DrawPath";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-28 sm:pt-20 sm:pb-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-teal/[0.06] blur-3xl"
      />

      <Container className="relative flex flex-col items-center text-center gap-8">
        <Reveal>
          <span className="inline-flex items-center rounded-full bg-teal-mint px-4 py-1.5 text-sm font-semibold text-teal-deep">
            عن فُورْوَرْد
          </span>
        </Reveal>

        <div className="flex flex-col gap-4">
          <Reveal delay={100}>
            <h1 className="font-arabic font-bold text-navy text-[2.4rem] leading-[1.25] sm:text-6xl sm:leading-[1.2] lg:text-7xl lg:leading-[1.15] balance">
              كل رحلة تبدأ بسؤال.
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="font-arabic text-xl sm:text-2xl text-ink-soft leading-relaxed balance max-w-2xl mx-auto">
              وفُورْوَرْد وُجدت لتساعدك على اكتشاف الطريق.
            </p>
          </Reveal>
        </div>
      </Container>

      <div className="relative mt-20 sm:mt-28 h-56 sm:h-72">
        <DrawPath
          viewBox="0 0 1000 220"
          className="absolute inset-0 w-full h-full text-navy/15"
          strokeWidth={1.5}
          d="M0 40 H1000"
          delay={300}
          duration={1800}
        />
        <DrawPath
          viewBox="0 0 1000 220"
          className="absolute inset-0 w-full h-full text-teal"
          strokeWidth={3}
          d="M60 190 C 300 190, 420 120, 500 42"
          delay={500}
          duration={1600}
        />
        <div
          aria-hidden="true"
          className="absolute rounded-full bg-gradient-to-b from-sun-light to-sun shadow-[0_0_60px_10px_rgba(239,164,92,0.25)]"
          style={{
            width: "3.5rem",
            height: "3.5rem",
            left: "50%",
            top: "6%",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    </section>
  );
}
