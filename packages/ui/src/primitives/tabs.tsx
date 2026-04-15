import { useState, type ReactNode } from "react";
import { cn } from "../lib/cn";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  initialTabId?: string;
  className?: string;
}

export function Tabs({ tabs, initialTabId, className }: TabsProps) {
  const fallbackTabId = tabs[0]?.id;
  const [activeId, setActiveId] = useState(initialTabId ?? fallbackTabId);

  if (!tabs.length || !activeId) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div role="tablist" className="inline-flex gap-2 rounded-lg bg-muted p-1">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="rounded-lg border border-border bg-card p-4 text-card-foreground">
        {tabs.find((tab) => tab.id === activeId)?.content}
      </div>
    </div>
  );
}
