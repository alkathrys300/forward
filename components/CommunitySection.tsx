import Container from "./Container";
import Button from "./Button";
import { UsersIcon, ArrowNextIcon } from "./icons";
import { COMMUNITY_URL } from "@/lib/content";

const avatarTones = [
  "bg-teal text-cream-soft",
  "bg-sun text-navy",
  "bg-navy text-cream-soft",
  "bg-teal-light text-cream-soft",
  "bg-sun-light text-navy",
];

export default function CommunitySection() {
  return (
    <section id="community" className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-teal-mint px-8 py-14 sm:px-16 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-teal/15 blur-3xl"
          />
          <div className="relative grid lg:grid-cols-[auto_1fr_auto] items-center gap-10">
            <div
              className="hidden lg:flex -space-x-3 rtl:space-x-reverse"
              aria-hidden="true"
            >
              {avatarTones.map((tone, i) => (
                <span
                  key={i}
                  className={`w-14 h-14 rounded-full border-4 border-teal-mint flex items-center justify-center ${tone}`}
                >
                  <UsersIcon className="w-5 h-5" />
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 text-center lg:text-right">
              <h2 className="font-arabic font-bold text-navy text-3xl sm:text-[2.25rem] leading-snug balance">
                لا تمشِ الطريق وحدك.
              </h2>
              <p className="text-teal-deep/85 text-lg leading-loose max-w-xl mx-auto lg:mx-0 balance">
                انضم إلى مجتمع من الطلاب والمهتمين بالتعلّم والنمو، وكن جزءًا
                من رحلة مستمرة إلى الأمام.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Button
                href={COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                انضم إلى المجتمع
                <ArrowNextIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
