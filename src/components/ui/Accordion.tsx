"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

export function AccordionItem({
  title,
  subtitle,
  children,
  defaultOpen = false,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-black/10 bg-white/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center justify-between gap-3 p-4 md:p-5 rounded-2xl",
          "hover:bg-white/60 transition"
        )}
      >
        <div className="text-left">
          <div className="font-semibold text-ink">{title}</div>
          {subtitle ? <div className="text-xs text-black/60 mt-0.5">{subtitle}</div> : null}
        </div>
        <div className={cn("text-bootred font-bold transition", open ? "rotate-45" : "rotate-0")}>+</div>
      </button>
      {open ? <div className="p-4 md:p-5 pt-0">{children}</div> : null}
    </div>
  );
}
