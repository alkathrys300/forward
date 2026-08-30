"use client";

import { useState } from "react";
import { ShareIcon, CheckIcon } from "@/components/icons";

type State = "idle" | "copied" | "error";

function copyWithFallback(url: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = url;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}

export default function ShareButton({ title }: { title: string }) {
  const [state, setState] = useState<State>("idle");

  async function handleShare() {
    const url = window.location.href;

    // Copying the link (rather than the native share sheet) is what this
    // audience actually does with it — paste into WhatsApp/the community.
    // navigator.share's on-screen behavior varies too much across desktop
    // browsers/OSes to give reliable, visible confirmation.
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        copied = true;
      }
    } catch {
      copied = false;
    }

    if (!copied) copied = copyWithFallback(url);

    setState(copied ? "copied" : "error");
    setTimeout(() => setState("idle"), 2500);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/15 text-navy px-5 py-2.5 text-sm font-semibold hover:bg-navy/[0.04] transition-colors"
    >
      {state === "copied" && (
        <>
          <CheckIcon className="w-4 h-4 text-teal-deep" />
          تم نسخ الرابط
        </>
      )}
      {state === "error" && "تعذّر النسخ — انسخ رابط الصفحة يدويًا"}
      {state === "idle" && (
        <>
          <ShareIcon className="w-4 h-4" />
          مشاركة
        </>
      )}
    </button>
  );
}
