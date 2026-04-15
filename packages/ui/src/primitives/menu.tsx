import { useState } from "react";
import { cn } from "../lib/cn";

export interface MenuItem {
  id: string;
  label: string;
  onSelect?: (id: string) => void;
}

export interface MenuProps {
  label?: string;
  items: MenuItem[];
  className?: string;
}

export function Menu({ label = "Actions", items, className }: MenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative inline-block", className)}>
      <button
        type="button"
        className="inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        {label}
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-20 min-w-44 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg"
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
              onClick={() => {
                item.onSelect?.(item.id);
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
