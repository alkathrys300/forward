"use client";

import { useEffect, useRef, useState } from "react";

export default function FounderPortrait() {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // A server-rendered <img> can fail to load before React hydrates and
    // attaches onError, so the error event fires with no listener to catch
    // it. Checking naturalWidth on mount catches that already-failed state.
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, []);

  return (
    <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-teal-deep">
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src="/images/founder.jpg"
          alt="مؤسس فُورْوَرْد"
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      )}

      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(247,242,231,0.9) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <span className="relative text-sm font-semibold text-cream-soft/60 border border-dashed border-cream-soft/30 rounded-full px-4 py-1.5">
            صورة المؤسس — قيد الإضافة
          </span>
          <span className="relative text-xs text-cream-soft/35">
            ضع الصورة في public/images/founder.jpg
          </span>
        </div>
      )}
    </div>
  );
}
