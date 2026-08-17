import Container from "./Container";
import SectionHeading from "./SectionHeading";
import { journeyStages } from "@/lib/content";
import { CompassIcon, BookIcon, RocketIcon, BriefcaseIcon } from "./icons";

const icons = {
  takhassus: CompassIcon,
  tahayoub: BookIcon,
  tamayouz: RocketIcon,
  mawaraa: BriefcaseIcon,
};

export default function WhereAreYouNow() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="أين أنت الآن؟"
          title="لكل مرحلة أسئلتها، ولكل سؤال خطوة."
          description="فُورْوَرْد يرافقك أينما كنت في رحلتك التعليمية. اختر المرحلة الأقرب لك اليوم."
        />

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[4.5rem] right-0 left-0 h-px bg-gradient-to-l from-teal/0 via-navy/15 to-teal/0"
          />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeyStages.map((s) => {
              const Icon = icons[s.key];
              const featured = s.featured;
              return (
                <li
                  key={s.key}
                  className={`relative flex flex-col gap-5 rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1.5 ${
                    featured
                      ? "bg-navy text-cream-soft shadow-[0_30px_60px_-24px_rgba(13,28,33,0.5)] lg:mt-0"
                      : "bg-cream-soft text-navy border border-navy/[0.06] shadow-[0_16px_40px_-28px_rgba(20,40,47,0.35)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex items-center justify-center w-11 h-11 rounded-xl2 ${
                        featured ? "bg-cream-soft/10 text-sun-light" : "bg-teal-mint text-teal-deep"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        featured ? "text-sun-light" : "text-sun-deep"
                      }`}
                    >
                      {s.order}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span
                      className={`text-sm font-semibold ${
                        featured ? "text-cream-soft/60" : "text-ink-faint"
                      }`}
                    >
                      {s.stage}
                    </span>
                    <h3 className="text-xl font-bold leading-snug">{s.title}</h3>
                  </div>

                  <p
                    className={`text-[0.95rem] leading-relaxed ${
                      featured ? "text-cream-soft/75" : "text-ink-soft"
                    }`}
                  >
                    {s.description}
                  </p>

                  <span
                    className={`mt-auto pt-2 text-xs font-semibold ${
                      featured ? "text-cream-soft/50" : "text-ink-faint"
                    }`}
                  >
                    {s.audience}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
