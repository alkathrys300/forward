import Container from "./Container";
import Logo from "./Logo";
import { COMMUNITY_URL } from "@/lib/content";

const columns = [
  {
    title: "البرامج",
    links: [
      { label: "تخصّص", href: "/programs/takhassus/" },
      { label: "تأهّب", href: "/programs/tahayoub/" },
      { label: "تميّز", href: "/programs/tamayouz/" },
      { label: "ما وراء الجامعة", href: "/programs/mawaraa/" },
    ],
  },
  {
    title: "المجتمع",
    links: [
      { label: "انضم إلى المجتمع", href: COMMUNITY_URL, external: true },
      { label: "الفعاليات", href: "#" },
      { label: "الورش", href: "/#workshops" },
    ],
  },
  {
    title: "تعاون معنا",
    links: [
      { label: "شراكات تعليمية", href: "/#collaborate" },
      { label: "جامعات ومؤسسات", href: "/#collaborate" },
      { label: "تواصل معنا", href: "/#collaborate" },
    ],
  },
];

const socials = ["X", "Instagram", "LinkedIn"];

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-cream-soft">
      <Container className="py-16">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
          <div className="flex flex-col gap-5">
            <Logo variant="light" />
            <p className="text-cream-soft/60 leading-loose max-w-xs">
              فُورْوَرْد منظومة تعليمية وتنموية ترافق الطالب في أهم مراحل
              رحلته، من اختيار التخصص إلى بداية المسار المهني.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socials.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-sm font-medium text-cream-soft/60 hover:text-cream-soft transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-cream-soft/50 tracking-wide">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                      className="text-cream-soft/80 hover:text-cream-soft transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-14 pt-8 border-t border-cream-soft/10">
          <p className="text-sm text-cream-soft/45">
            © {new Date().getFullYear()} فُورْوَرْد. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <a href="#" className="text-cream-soft/70 font-semibold">
              العربية
            </a>
            <span className="text-cream-soft/30">/</span>
            <a
              href="#"
              lang="en"
              className="text-cream-soft/45 hover:text-cream-soft/70 transition-colors"
            >
              EN
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
