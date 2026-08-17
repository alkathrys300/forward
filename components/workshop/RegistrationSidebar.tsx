"use client";

import { useState } from "react";
import { CalendarIcon, PinIcon, TagIcon, ArrowNextIcon } from "@/components/icons";
import Button from "@/components/Button";
import { COMMUNITY_URL, WEB3FORMS_ACCESS_KEY } from "@/lib/content";
import type { WorkshopItem } from "@/lib/workshops";
import RegistrationModal from "./RegistrationModal";

export default function RegistrationSidebar({ item }: { item: WorkshopItem }) {
  const [open, setOpen] = useState(false);
  const formIsLive = Boolean(item.formUrl) || Boolean(WEB3FORMS_ACCESS_KEY);

  return (
    <div className="rounded-3xl bg-cream-soft border border-navy/[0.06] p-6 flex flex-col gap-5 shadow-[0_16px_40px_-28px_rgba(20,40,47,0.35)] lg:sticky lg:top-24">
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
          className="w-full rounded-full bg-navy text-cream-soft px-6 py-3.5 font-semibold hover:bg-navy-light transition-colors"
        >
          احصل على التسجيل
        </button>
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
