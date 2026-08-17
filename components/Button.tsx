import { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-teal text-cream-soft hover:bg-teal-deep shadow-[0_10px_30px_-12px_rgba(31,107,103,0.55)]",
  secondary:
    "bg-transparent text-navy border border-navy/25 hover:border-navy/60 hover:bg-navy/[0.03]",
  light:
    "bg-cream-soft text-navy border border-navy/10 hover:border-navy/30",
  ghost: "bg-navy text-cream-soft hover:bg-navy-light",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold transition-all duration-300 ease-out ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
