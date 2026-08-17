"use client";

import { useEffect, useRef, useState } from "react";

export default function DrawPath({
  d,
  viewBox,
  className = "",
  strokeWidth = 2,
  delay = 0,
  duration = 1600,
}: {
  d: string;
  viewBox: string;
  className?: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={d}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: visible ? 0 : 1,
          transition: `stroke-dashoffset ${duration}ms cubic-bezier(0.16,1,0.3,1)`,
          transitionDelay: `${delay}ms`,
        }}
      />
    </svg>
  );
}
