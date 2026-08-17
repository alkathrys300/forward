import Container from "./Container";
import { HandshakeIcon } from "./icons";
import CollaborationTrigger from "./CollaborationTrigger";

export default function CollaborationCTA() {
  return (
    <section id="collaborate" className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy px-8 py-14 sm:px-16 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 right-1/3 w-72 h-72 rounded-full bg-teal/15 blur-3xl"
          />
          <div className="relative grid lg:grid-cols-[auto_1fr_auto] items-center gap-8">
            <span className="hidden lg:flex items-center justify-center w-16 h-16 rounded-2xl bg-cream-soft/10 text-sun-light shrink-0">
              <HandshakeIcon className="w-7 h-7" />
            </span>

            <div className="flex flex-col gap-3 text-center lg:text-right">
              <h2 className="font-arabic font-bold text-cream-soft text-2xl sm:text-[2rem] leading-snug balance">
                نبني الأثر معًا.
              </h2>
              <p className="text-cream-soft/70 text-lg leading-loose max-w-xl mx-auto lg:mx-0 balance">
                إذا كنت جامعة، جهة تعليمية، أو مؤسسة تبحث عن تجربة تعليمية
                أكثر ارتباطًا باحتياجات الطلاب، لنتعاون.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <CollaborationTrigger />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
