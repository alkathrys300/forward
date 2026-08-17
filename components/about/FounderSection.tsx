import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import FounderPortrait from "./FounderPortrait";

export default function FounderSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-teal-mint px-4 py-1.5 text-sm font-semibold text-teal-deep">
              خلف فُورْوَرْد
            </span>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-xl sm:text-2xl text-ink-soft leading-relaxed balance">
              بدأت فُورْوَرْد من سؤال بسيط:
            </p>
          </Reveal>
          <Reveal delay={160}>
            <h2 className="font-arabic font-bold text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight balance">
              كيف نساعد الشباب على أن يصنعوا قراراتهم بوعي أكبر؟
            </h2>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center mt-20">
          <Reveal>
            <FounderPortrait />
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-xl font-bold text-navy">سلمان أمين العبد</span>
              <span className="text-sm font-semibold text-teal-deep">المؤسس</span>
            </div>

            <p className="text-lg leading-loose text-ink-soft balance">
              طالب دكتوراه في تحسين الحوسبة الكمية (Quantum Computing
              Optimization)، ومتخصص في قضايا المناخ والطاقة وبناء القدرات.
              أسس فُورْوَرْد إيمانًا بأهمية مساعدة الشباب على فهم مسارهم
              التعليمي والمهني بوعي أكبر، كما أسس Spark Design، استوديو
              إبداعي متخصص في تصميم الهوية البصرية ومونتاج الفيديو لخدمة
              العلامات ذات الأثر البيئي.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
