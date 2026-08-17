type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const mark = variant === "light" ? "#F7F2E7" : "#14282F";
  const accent = "#EFA45C";
  const tealAccent = "#3E8C86";

  return (
    <a
      href="/"
      aria-label="فُورْوَرْد — الصفحة الرئيسية"
      className={`inline-flex items-center gap-2 shrink-0 ${className}`}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M4 20 C10 20, 12 12, 18 8"
          stroke={tealAccent}
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M12 6 L20 6 L20 14"
          stroke={accent}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M12 6 L26 6" stroke="none" />
        <path
          d="M20 6 L26 12"
          stroke={accent}
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-arabic font-bold text-[1.05rem] tracking-tight"
          style={{ color: mark }}
        >
          فُورْوَرْد
        </span>
        <span
          className="text-[0.6rem] tracking-[0.2em] uppercase mt-0.5"
          style={{ color: mark, opacity: 0.55 }}
        >
          Forward
        </span>
      </span>
    </a>
  );
}
