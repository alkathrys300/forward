import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const beliefs = [
  "أن لكل شخص طريقه.",
  "أن الأسئلة جزء من الرحلة، وليست علامة على الضياع.",
  "أن التجربة قد تعلّمك أكثر مما تفعله الإجابة الجاهزة.",
  "أن الجامعة ليست نهاية الطريق، بل واحدة من محطاته.",
];

export default function BeliefsManifesto() {
  return (
    <section className="relative pt-20 sm:pt-28 pb-10 sm:pb-14 bg-navy overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/4 w-[26rem] h-[26rem] rounded-full bg-sun/10 blur-3xl"
      />

      <Container className="relative flex flex-col items-center text-center gap-4">
        <Reveal>
          <span className="inline-flex items-center rounded-full bg-cream-soft/10 border border-cream-soft/25 px-4 py-1.5 text-sm font-semibold text-cream-soft">
            ما نؤمن به
          </span>
        </Reveal>
      </Container>

      <Container className="relative mt-16 flex flex-col items-center gap-8 sm:gap-10">
        {beliefs.map((b, i) => (
          <Reveal key={b} delay={i * 160}>
            <p className="font-arabic font-semibold text-cream-soft/85 text-xl sm:text-2xl lg:text-3xl leading-relaxed text-center balance max-w-2xl">
              {b}
            </p>
          </Reveal>
        ))}

        <Reveal delay={beliefs.length * 160 + 100}>
          <p className="font-arabic font-semibold text-cream-soft/70 text-xl sm:text-2xl leading-relaxed text-center balance max-w-2xl mt-4">
            وأن التقدم لا يعني أن تعرف إلى أين ستصل تمامًا.
          </p>
        </Reveal>

        <Reveal delay={beliefs.length * 160 + 260}>
          <h2 className="font-arabic font-bold text-cream-soft text-4xl sm:text-5xl lg:text-6xl leading-tight text-center balance mt-4">
            يكفي أن تعرف خطوتك القادمة.
          </h2>
        </Reveal>

        <Reveal delay={beliefs.length * 160 + 420}>
          <p className="font-arabic font-bold text-sun-light text-xl sm:text-2xl text-center mt-2">
            وهنا يأتي دور فُورْوَرْد.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
