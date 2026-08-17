"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import Container from "./Container";
import Button from "./Button";
import { MenuIcon, CloseIcon } from "./icons";
import { COMMUNITY_URL } from "@/lib/content";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "البرامج", href: "/#programs" },
  { label: "عن فُورْوَرْد", href: "/about/" },
  { label: "ورش العمل", href: "/#workshops" },
  { label: "المجتمع", href: "/#community" },
  { label: "تعاون معنا", href: "/#collaborate" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream-soft/90 backdrop-blur-md border-b border-navy/[0.06] shadow-[0_2px_20px_-8px_rgba(20,40,47,0.12)]"
          : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between h-20">
        <Logo />

        <nav
          aria-label="التنقل الرئيسي"
          className="hidden lg:flex items-center gap-8"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[0.95rem] font-medium text-ink hover:text-teal transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#"
            className="text-sm font-semibold text-ink-soft hover:text-teal transition-colors"
            lang="en"
          >
            EN
          </a>
          <Button href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" variant="ghost" className="!px-5 !py-3 text-sm">
            انضم إلى المجتمع
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-navy/15 text-navy"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </Container>

      {open && (
        <div className="lg:hidden border-t border-navy/[0.06] bg-cream-soft">
          <Container className="flex flex-col gap-1 py-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-lg font-medium text-navy border-b border-navy/[0.06] last:border-none"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center justify-between pt-5">
              <a href="#" lang="en" className="text-sm font-semibold text-ink-soft">
                English
              </a>
              <Button href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" variant="ghost" className="!px-6">
                انضم إلى المجتمع
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
