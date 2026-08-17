import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import type { WorkshopItem } from "@/lib/workshops";

export default function WorkshopDetailBody({ item }: { item: WorkshopItem }) {
  return (
    <section className="pb-16 sm:pb-20">
      <Container>
        <Reveal className="max-w-2xl">
          {item.description ? (
            <p className="text-lg leading-loose text-ink-soft balance">
              {item.description}
            </p>
          ) : (
            <div className="rounded-2xl border border-dashed border-navy/20 bg-navy/[0.02] px-6 py-6 flex flex-col gap-1.5">
              <span className="text-lg text-ink-soft leading-relaxed balance">
                سيتم إضافة تفاصيل الدورة الكاملة قريبًا.
              </span>
              <span className="text-sm text-ink-faint">
                تابع المجتمع أو تواصل معنا لمعرفة آخر التحديثات.
              </span>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
