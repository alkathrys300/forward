"use client";

import { useState } from "react";
import { ShareIcon, CheckIcon } from "@/components/icons";

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled the native share sheet — no-op
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/15 text-navy px-5 py-2.5 text-sm font-semibold hover:bg-navy/[0.04] transition-colors"
    >
      {copied ? (
        <>
          <CheckIcon className="w-4 h-4 text-teal-deep" />
          تم نسخ الرابط
        </>
      ) : (
        <>
          <ShareIcon className="w-4 h-4" />
          مشاركة
        </>
      )}
    </button>
  );
}
