"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, SpinnerIcon } from "./icons";
import { WEB3FORMS_ACCESS_KEY } from "@/lib/content";

type Status = "idle" | "loading" | "success" | "error";

export default function CollaborationModal({ onClose }: { onClose: () => void }) {
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
    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `طلب تعاون جديد — ${data.get("organization")}`,
          from_name: "نموذج التعاون — فُورْوَرْد",
          "اسم الجهة": data.get("organization"),
          "نوع الجهة": data.get("type"),
          "الاسم الكامل": data.get("name"),
          "البريد الإلكتروني": data.get("email"),
          الرسالة: data.get("message"),
        }),
      });
      const result = await res.json();
      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="collaboration-modal-title"
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
            <h2 className="text-xl font-bold text-navy">تم إرسال طلبكم بنجاح!</h2>
            <p className="text-ink-soft leading-relaxed">
              وصلنا طلب التعاون، وبنتواصل معكم قريبًا.
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
              id="collaboration-modal-title"
              className="text-xl font-bold text-navy pl-8"
            >
              تواصل معنا للتعاون
            </h2>
            <p className="text-sm text-ink-faint mt-1 mb-6">
              أخبرنا عن جهتكم وفكرة التعاون، وبنرجع لكم قريبًا.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="organization" className="text-sm font-semibold text-navy">
                  اسم الجهة / المؤسسة
                </label>
                <input
                  ref={firstFieldRef}
                  id="organization"
                  name="organization"
                  type="text"
                  required
                  placeholder="مثال: جامعة الملك سعود"
                  className="rounded-xl border border-navy/15 bg-cream px-4 py-3 text-ink placeholder:text-ink-faint focus:border-teal outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="type" className="text-sm font-semibold text-navy">
                  نوع الجهة
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  defaultValue=""
                  className="rounded-xl border border-navy/15 bg-cream px-4 py-3 text-ink focus:border-teal outline-none transition-colors"
                >
                  <option value="" disabled>
                    اختر النوع
                  </option>
                  <option value="جامعة">جامعة</option>
                  <option value="جهة تعليمية">جهة تعليمية</option>
                  <option value="مؤسسة أو شركة">مؤسسة أو شركة</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-semibold text-navy">
                  الاسم الكامل
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="اسمك الكامل"
                  className="rounded-xl border border-navy/15 bg-cream px-4 py-3 text-ink placeholder:text-ink-faint focus:border-teal outline-none transition-colors"
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
                <label htmlFor="message" className="text-sm font-semibold text-navy">
                  الرسالة
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  placeholder="أخبرنا عن فكرة التعاون..."
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
                إرسال الطلب
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
