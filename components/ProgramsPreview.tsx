import Container from "./Container";
import SectionHeading from "./SectionHeading";
import { journeyStages } from "@/lib/content";
import { CompassIcon, BookIcon, RocketIcon, BriefcaseIcon, ArrowNextIcon } from "./icons";

const icons = {
  takhassus: CompassIcon,
  tahayoub: BookIcon,
  tamayouz: RocketIcon,
  mawaraa: BriefcaseIcon,
};

const accents = {
  takhassus: "bg-teal-mint text-teal-deep",
  tahayoub: "bg-sun/15 text-sun-deep",
  tamayouz: "bg-navy text-cream-soft",
  mawaraa: "bg-teal-mint text-teal-deep",
};

export default function ProgramsPreview() {
  return (
    <section id="programs" className="pt-8 pb-20 sm:pt-12 sm:pb-28">
      <Container>
        <SectionHeading
          eyebrow="برامج فُورْوَرْد"
          title="رحلة واحدة. أربع محطات."
          description="كل برنامج محطة في نفس الرحلة، مصمم ليلتقي معك عند مرحلتك بالضبط."
        />

        <div className="mt-14 flex flex-col divide-y divide-navy/[0.08] border-t border-b border-navy/[0.08]">
          {journeyStages.map((s) => {
            const Icon = icons[s.key];
            return (
              <a
                key={s.key}
                href={`/programs/${s.key}/`}
                className="group grid lg:grid-cols-[auto_1fr_auto] items-center gap-6 py-9 lg:py-10 transition-colors hover:bg-navy/[0.02] -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 rounded-2xl"
              >
                <div className="flex items-center gap-5">
                  <span className="text-4xl sm:text-5xl font-bold text-navy/10 tabular-nums w-16">
                    {s.order}
                  </span>
                  <span
                    className={`flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 ${accents[s.key]}`}
                  >
                    <Icon className="w-6 h-6" />
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-teal">
                    {s.stage}
                  </span>
                  <h3 className="text-2xl font-bold text-navy">{s.title}</h3>
                  <p className="text-ink-soft leading-relaxed max-w-xl">
                    {s.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-navy font-semibold shrink-0 lg:pr-4">
                  <span>استكشف البرنامج</span>
                  <ArrowNextIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </div>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
