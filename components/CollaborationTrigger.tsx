"use client";

import { useState } from "react";
import Button from "./Button";
import { ArrowNextIcon } from "./icons";
import { COMMUNITY_URL, WEB3FORMS_ACCESS_KEY } from "@/lib/content";
import CollaborationModal from "./CollaborationModal";

export default function CollaborationTrigger() {
  const [open, setOpen] = useState(false);
  const formIsLive = Boolean(WEB3FORMS_ACCESS_KEY);

  return (
    <>
      {formIsLive ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-cream-soft text-navy border border-navy/10 hover:border-navy/30 px-6 py-3.5 text-[0.95rem] font-semibold transition-all duration-300 ease-out"
        >
          تواصل معنا للتعاون
          <ArrowNextIcon className="w-4 h-4" />
        </button>
      ) : (
        <Button
          href={COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          variant="light"
        >
          تواصل معنا للتعاون
          <ArrowNextIcon className="w-4 h-4" />
        </Button>
      )}

      {open && <CollaborationModal onClose={() => setOpen(false)} />}
    </>
  );
}
