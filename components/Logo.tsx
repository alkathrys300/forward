type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const mark = variant === "light" ? "#F7F2E7" : "#14282F";

  return (
    <a
      href="/"
      aria-label="فُورْوَرْد — الصفحة الرئيسية"
      className={`inline-flex items-center gap-2 shrink-0 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo-mark.png"
        alt=""
        aria-hidden="true"
        className="h-8 w-auto shrink-0"
      />
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
