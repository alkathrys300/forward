import { ReactNode } from "react";

type Align = "start" | "center";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  tone = "dark",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: Align;
  tone?: "dark" | "light";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <div
      className={`flex flex-col gap-5 ${
        isCenter ? "items-center text-center" : "items-start text-right"
      } ${className}`}
    >
      {eyebrow && (
        <span
          className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold ${
            tone === "light"
              ? "bg-cream-soft/10 text-cream-soft border border-cream-soft/25"
              : "bg-teal-mint text-teal-deep"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-arabic font-bold leading-[1.25] balance text-3xl sm:text-4xl lg:text-[2.75rem] ${
          tone === "light" ? "text-cream-soft" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-lg leading-loose max-w-2xl balance ${
            tone === "light" ? "text-cream-soft/75" : "text-ink-soft"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
