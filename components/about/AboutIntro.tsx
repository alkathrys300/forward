import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import DrawPath from "@/components/DrawPath";

export default function AboutIntro() {
  return (
    <section id="intro" className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <span className="inline-flex items-center rounded-full bg-teal-mint px-4 py-1.5 text-sm font-semibold text-teal-deep">
            تعرف على فُورْوَرْد
          </span>
        </Reveal>

        <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-6 items-center mt-10">
          <Reveal delay={80}>
            <p className="font-arabic font-bold text-navy/35 text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.35] balance">
              لسنا هنا لنخبرك
              <br />
              إلى أين تذهب.
            </p>
          </Reveal>

          <div className="relative">
            <DrawPath
              viewBox="0 0 400 60"
              className="hidden lg:block absolute -top-10 right-1/2 translate-x-1/2 w-40 h-10 text-sun rotate-180"
              strokeWidth={2.5}
              d="M10 30 C 150 30, 250 30, 380 30 M 380 30 L 350 15 M 380 30 L 350 45"
              delay={150}
            />
            <Reveal delay={220}>
              <p className="font-arabic font-bold text-navy text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.35] balance">
                نحن هنا لنساعدك
                <br />
                على اكتشاف الطريق.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 sm:mt-28 flex flex-col gap-14 max-w-3xl mx-auto">
          <Reveal>
            <p className="text-lg sm:text-xl leading-loose text-ink-soft text-center balance">
              فُورْوَرْد مؤسسة تعليمية تهدف إلى مساعدة الطلاب والشباب على فهم
              مراحلهم التعليمية، اكتشاف خياراتهم، وخوض تجارب تساعدهم على
              اتخاذ خطوات أكثر وضوحًا نحو مستقبلهم.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="border-r-4 border-teal pr-6 sm:pr-8 py-1 flex flex-col gap-3 text-right">
              <p className="text-xl sm:text-2xl font-semibold text-navy leading-relaxed balance">
                نؤمن أن المستقبل لا يُبنى بقرار واحد، ولا يأتي بعد التخرج
                فقط.
              </p>
              <p className="text-lg sm:text-xl text-ink-soft leading-relaxed balance">
                بل يبدأ من الأسئلة التي نطرحها اليوم، والتجارب التي نخوضها،
                والقرارات الصغيرة التي تصنع اتجاهنا مع الوقت.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-lg sm:text-xl leading-loose text-ink-soft text-center balance">
              لهذا صُممت فُورْوَرْد كرحلة تمتد مع الطالب عبر مراحل مختلفة؛ من
              اكتشاف التخصص، إلى الاستعداد للجامعة، وصناعة تجربة جامعية أكثر
              وعيًا، وصولًا إلى ما بعد الجامعة.
            </p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="mt-20 sm:mt-28 flex flex-col items-center gap-2 text-center">
            <span className="font-arabic font-bold text-navy text-3xl sm:text-5xl leading-tight">
              رحلة واحدة.
            </span>
            <span className="font-arabic font-bold text-navy text-3xl sm:text-5xl leading-tight">
              خطوات متعددة.
            </span>
            <span className="font-arabic font-bold text-teal text-3xl sm:text-5xl leading-tight">
              واتجاه يتشكل مع الوقت.
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
