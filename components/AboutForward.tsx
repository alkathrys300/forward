import Container from "./Container";
import Button from "./Button";
import { ArrowNextIcon } from "./icons";

export default function AboutForward() {
  return (
    <section id="about" className="pt-14 pb-8 sm:pt-20 sm:pb-12">
      <Container>
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center rounded-full bg-teal-mint px-4 py-1.5 text-sm font-semibold text-teal-deep">
              عن فُورْوَرْد
            </span>
            <h2 className="font-arabic font-bold text-navy text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.35] balance">
              نؤمن أن الطريق لا يحتاج أن يكون واضحًا بالكامل.
              <br />
              يكفي أن تعرف خطوتك القادمة.
            </h2>
          </div>

          <div className="flex flex-col gap-7 lg:pt-3">
            <p className="text-lg leading-loose text-ink-soft balance">
              فُورْوَرْد منظومة تجمع بين الاستكشاف والتعلّم العملي والمجتمع.
              نساعد الطالب على فهم اتجاهه، وتجربة مهارات حقيقية عبر ورش وأنشطة
              واقعية، ليتخذ قراراته القادمة بثقة أكبر — لا بمفرده، بل ضمن
              مجتمع يشاركه نفس الرحلة.
            </p>
            <div>
              <Button href="/about/" variant="secondary">
                اعرف قصتنا
                <ArrowNextIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
