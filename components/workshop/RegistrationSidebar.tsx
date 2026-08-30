"use client";

import { useState } from "react";
import { CalendarIcon, PinIcon, TagIcon, ArrowNextIcon, PlayIcon } from "@/components/icons";
import Button from "@/components/Button";
import { COMMUNITY_URL, WEB3FORMS_ACCESS_KEY } from "@/lib/content";
import type { WorkshopItem } from "@/lib/workshops";
import RegistrationModal from "./RegistrationModal";
import ShareButton from "./ShareButton";

const statusLabel: Record<
  NonNullable<WorkshopItem["registrationStatus"]>,
  { text: string; className: string }
> = {
  available: { text: "الحضور متاح", className: "bg-teal-mint text-teal-deep" },
  full: { text: "المقاعد مكتملة", className: "bg-sun/20 text-sun-deep" },
  closed: { text: "التسجيل مغلق", className: "bg-navy/[0.06] text-ink-faint" },
};

export default function RegistrationSidebar({ item }: { item: WorkshopItem }) {
  const [open, setOpen] = useState(false);
  const formIsLive = Boolean(item.formUrl) || Boolean(WEB3FORMS_ACCESS_KEY);
  const status = item.registrationStatus ? statusLabel[item.registrationStatus] : null;

  return (
    <div className="rounded-3xl bg-cream-soft border border-navy/[0.06] p-6 flex flex-col gap-5 shadow-[0_16px_40px_-28px_rgba(20,40,47,0.35)] lg:sticky lg:top-24">
      {status && (
        <span
          className={`inline-flex w-fit items-center rounded-full px-3.5 py-1.5 text-xs font-bold ${status.className}`}
        >
          {status.text}
        </span>
      )}

      <div className="flex items-center gap-3 text-ink-soft">
        <CalendarIcon className="w-5 h-5 text-teal-deep shrink-0" />
        <span>{item.date}</span>
      </div>

      {item.location && (
        <div className="flex items-center gap-3 text-ink-soft">
          <PinIcon className="w-5 h-5 text-teal-deep shrink-0" />
          <span>{item.location}</span>
        </div>
      )}

      <div className="flex items-center gap-3 font-bold text-teal-deep">
        <TagIcon className="w-5 h-5 shrink-0" />
        <span>{item.price}</span>
      </div>

      {formIsLive ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          disabled={item.registrationStatus === "closed" || item.registrationStatus === "full"}
          className="w-full rounded-full bg-navy text-cream-soft px-6 py-3.5 font-semibold hover:bg-navy-light transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          احصل على التسجيل
        </button>
      ) : item.youtubeUrl ? (
        <a
          href="#video"
          className="flex items-center justify-center gap-2 w-full rounded-full bg-navy text-cream-soft px-6 py-3.5 font-semibold hover:bg-navy-light transition-colors"
        >
          <PlayIcon className="w-4 h-4" />
          شاهد الفيديو
        </a>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-ink-faint leading-relaxed">
            التسجيل قيد الإضافة — انضم للمجتمع لتصلك أول التحديثات.
          </p>
          <Button
            href={COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="w-full"
          >
            انضم إلى المجتمع
            <ArrowNextIcon className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div className="pt-1 border-t border-navy/[0.06] flex justify-center">
        <ShareButton title={item.title} />
      </div>

      {open && (
        <RegistrationModal
          workshopTitle={item.title}
          formUrl={item.formUrl}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
