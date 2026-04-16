"use client";

import { useState, type ReactNode } from "react";
import { cn } from "../lib/utils";

export interface PopoverProps {
  triggerLabel: string;
  trigger?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Popover({
  triggerLabel,
  trigger,
  children,
  className,
}: PopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative inline-block", className)}>
      <button
        type="button"
        className="inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        onClick={() => setOpen((value) => !value)}
      >
        {trigger ?? triggerLabel}
      </button>
      {open ? (
        <div
          role="dialog"
          aria-label={triggerLabel}
          className="absolute left-0 top-[calc(100%+0.5rem)] z-20 min-w-56 rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-lg"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
