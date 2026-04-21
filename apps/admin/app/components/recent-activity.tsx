import { cn } from "@vortx/ui";

interface ActivityItem {
  initials: string;
  name: string;
  action: string;
  time: string;
  color: string;
}

const items: ActivityItem[] = [
  { initials: "RY", name: "Rafael Yago", action: "Added Switch component + stories", time: "2m ago", color: "bg-primary" },
  { initials: "RY", name: "Rafael Yago", action: "Restructured design-token layers", time: "1h ago", color: "bg-primary" },
  { initials: "RY", name: "Rafael Yago", action: "Added Badge — 7 variants", time: "3h ago", color: "bg-primary" },
  { initials: "RY", name: "Rafael Yago", action: "Added Input, Textarea, Form", time: "5h ago", color: "bg-primary" },
  { initials: "RY", name: "Rafael Yago", action: "Created ThemeProvider + useTheme", time: "8h ago", color: "bg-primary" },
  { initials: "RY", name: "Rafael Yago", action: "Added 7 layout primitives", time: "1d ago", color: "bg-primary" },
  { initials: "RY", name: "Rafael Yago", action: "Initial monorepo setup", time: "2d ago", color: "bg-primary" },
];

export function RecentActivity() {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <div
            className={cn(
              "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-primary-foreground",
              item.color,
            )}
          >
            {item.initials}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="truncate text-xs font-medium">{item.name}</p>
            <p className="truncate text-xs text-muted-foreground">{item.action}</p>
          </div>
          <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
            {item.time}
          </span>
        </div>
      ))}
    </div>
  );
}
