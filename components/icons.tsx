type IconProps = {
  className?: string;
};

const base = {
  fill: "none",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CompassIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2.2 5.2L8 16l2.2-5.2L15 9z" />
    </svg>
  );
}

export function BookIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5v-13z" />
      <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5c.8 0 1.5-.7 1.5-1.5v-13z" />
    </svg>
  );
}

export function RocketIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <path d="M12 15c-2.5 0-5-1-6.5-3 2-4.5 4.5-8 6.5-9 2 1 4.5 4.5 6.5 9-1.5 2-4 3-6.5 3z" />
      <path d="M9 14l-2.5 1.5V19l2.5-1.2M15 14l2.5 1.5V19L15 17.8" />
      <circle cx="12" cy="9" r="1.4" />
      <path d="M9 17.5c0 1.5.8 2.7 3 3.5 2.2-.8 3-2 3-3.5" />
    </svg>
  );
}

export function BriefcaseIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <rect x="3.5" y="7.5" width="17" height="12" rx="1.8" />
      <path d="M8.5 7.5v-2c0-.8.7-1.5 1.5-1.5h4c.8 0 1.5.7 1.5 1.5v2" />
      <path d="M3.5 12.5h17" />
    </svg>
  );
}

export function ArrowNextIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  );
}

export function SparkIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.5 6.5l2.5 2.5M15 15l2.5 2.5M17.5 6.5L15 9M9 15l-2.5 2.5" />
    </svg>
  );
}

export function ExperimentIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <path d="M10 3h4" />
      <path d="M10.5 3v6L5.5 18a2 2 0 001.8 3h9.4a2 2 0 001.8-3l-5-9V3" />
      <path d="M7.5 15h9" />
    </svg>
  );
}

export function BuildIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <path d="M14.5 3.5l6 6-2.5 2.5-6-6z" />
      <path d="M12.7 5.3L4 14v6h6l8.7-8.7" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function GrowthIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <path d="M4 17l5-5 4 4 7-8" />
      <path d="M15 8h5v5" />
    </svg>
  );
}

export function UsersIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.5-3 2.7-5 5.5-5s5 2 5.5 5" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M15.5 14c2.2.4 3.8 2 4 4.5" />
    </svg>
  );
}

export function HandshakeIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <path d="M2.5 12l4-3.5 3 2 3-2.4 3 2.4 4-2.5" />
      <path d="M4 11l4 5 2-1.3 1.7 2.3a1.5 1.5 0 002.4-1.8" />
      <path d="M18 10.5l2.5 3.5-2 1.5" />
      <path d="M10.3 15.3l1.7-1.3" />
    </svg>
  );
}

export function CheckIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

export function MenuIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function CalendarIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
    </svg>
  );
}

export function PinIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <path d="M12 21s-7-6.1-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.9 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

export function SpinnerIcon({ className = "w-5 h-5 animate-spin" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function PlayIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13a1 1 0 001.53.85l10.5-6.5a1 1 0 000-1.7l-10.5-6.5A1 1 0 008 5.5z" />
    </svg>
  );
}

export function TagIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} stroke="currentColor" aria-hidden="true">
      <path d="M11.5 4h5.7a1.3 1.3 0 011.3 1.3v5.7a2 2 0 01-.6 1.4l-8 8a2 2 0 01-2.8 0l-4.6-4.6a2 2 0 010-2.8l8-8a2 2 0 011.4-.6z" />
      <circle cx="15" cy="8.5" r="1.3" />
    </svg>
  );
}

export function LinkedInIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M6.94 5a2 2 0 11-4-.02 2 2 0 014 .02zM7 8.48H3V21h4V8.48zM13.32 8.48H9.5V21h3.82v-6.57c0-1.65.31-3.25 2.36-3.25 2.02 0 2.05 1.89 2.05 3.36V21H21.5v-7.13c0-3.44-1.85-5.04-4.32-5.04-1.99 0-2.88 1.1-3.38 1.86h.05V8.48h-.53z" />
    </svg>
  );
}
