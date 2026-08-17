"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, SpinnerIcon } from "@/components/icons";
import { getEmbeddableFormUrl } from "@/lib/workshops";
import { WEB3FORMS_ACCESS_KEY } from "@/lib/content";

type Status = "idle" | "loading" | "success" | "error";

export default function RegistrationModal({
  workshopTitle,
  formUrl,
  onClose,
}: {
  workshopTitle: string;
  formUrl?: string;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `تسجيل جديد — ${workshopTitle}`,
          from_name: "نموذج تسجيل فُورْوَرْد",
          الاسم: data.get("name"),
          واتساب: data.get("whatsapp"),
          "البريد الإلكتروني": data.get("email"),
          "ماذا تأمل أن تتعلم": data.get("goal"),
        }),
      });
      const result = await res.json();
      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (typeof document === "undefined") return null;

  if (formUrl) {
    return createPortal(
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-modal-title"
      >
        <div
          className="absolute inset-0 bg-navy-deep/60 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
        <div className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-cream-soft p-4 sm:p-6 shadow-2xl flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4 px-2">
            <div>
              <h2 id="registration-modal-title" className="text-lg font-bold text-navy">
                احصل على التسجيل
              </h2>
              <p className="text-sm text-ink-faint mt-0.5">{workshopTitle}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق"
              className="flex items-center justify-center w-9 h-9 rounded-full text-ink-soft hover:bg-navy/[0.06] transition-colors shrink-0"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
          <iframe
            src={getEmbeddableFormUrl(formUrl)}
            title="نموذج التسجيل"
            className="w-full flex-1 rounded-2xl border border-navy/[0.08]"
            style={{ minHeight: "60vh" }}
            loading="lazy"
          >
            جارِ تحميل نموذج التسجيل…
          </iframe>
        </div>
      </div>,
      document.body
    );
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-modal-title"
    >
      <div
        className="absolute inset-0 bg-navy-deep/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-cream-soft p-7 sm:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute top-5 left-5 flex items-center justify-center w-9 h-9 rounded-full text-ink-soft hover:bg-navy/[0.06] transition-colors"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center text-center gap-3 py-8">
            <h2 className="text-xl font-bold text-navy">تم التسجيل بنجاح!</h2>
            <p className="text-ink-soft leading-relaxed">
              وصلنا طلبك، وبنتواصل معك قريبًا بكل التفاصيل.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 rounded-full bg-teal text-cream-soft px-6 py-3 font-semibold"
            >
              إغلاق
            </button>
          </div>
        ) : (
          <>
            <h2
              id="registration-modal-title"
              className="text-xl font-bold text-navy pl-8"
            >
              احصل على التسجيل
            </h2>
            <p className="text-sm text-ink-faint mt-1 mb-6">{workshopTitle}</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-semibold text-navy">
                  الاسم
                </label>
                <input
                  ref={firstFieldRef}
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="الاسم الكامل"
                  className="rounded-xl border border-navy/15 bg-cream px-4 py-3 text-ink placeholder:text-ink-faint focus:border-teal outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="whatsapp" className="text-sm font-semibold text-navy">
                  رقم واتساب
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  placeholder="+966 5xxxxxxxx"
                  dir="ltr"
                  className="rounded-xl border border-navy/15 bg-cream px-4 py-3 text-ink placeholder:text-ink-faint focus:border-teal outline-none transition-colors text-right"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-navy">
                  البريد الإلكتروني
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  dir="ltr"
                  className="rounded-xl border border-navy/15 bg-cream px-4 py-3 text-ink placeholder:text-ink-faint focus:border-teal outline-none transition-colors text-right"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="goal" className="text-sm font-semibold text-navy">
                  ماذا تأمل أن تتعلم؟
                </label>
                <textarea
                  id="goal"
                  name="goal"
                  required
                  rows={3}
                  placeholder="أنا مهتم بـ..."
                  className="rounded-xl border border-navy/15 bg-cream px-4 py-3 text-ink placeholder:text-ink-faint focus:border-teal outline-none transition-colors resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-600 text-center">
                  حدث خطأ أثناء الإرسال، حاول مرة أخرى.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 rounded-full bg-navy text-cream-soft px-6 py-3.5 font-semibold disabled:opacity-60 transition-opacity"
              >
                {status === "loading" && <SpinnerIcon className="w-4 h-4" />}
                احصل على التسجيل
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
