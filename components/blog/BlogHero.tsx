import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-teal/[0.06] blur-3xl"
      />

      <Container className="relative flex flex-col items-center text-center gap-6">
        <Reveal>
          <span className="inline-flex items-center rounded-full bg-teal-mint px-4 py-1.5 text-sm font-semibold text-teal-deep">
            المدونة
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-arabic font-bold text-navy text-4xl sm:text-6xl leading-tight balance">
            أفكار وخطوات على الطريق
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-xl text-ink-soft leading-relaxed balance max-w-2xl">
            مقالات من فريق فُورْوَرْد حول اختيار التخصص، الحياة الجامعية، والانتقال إلى سوق العمل.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
