import {
  Avatar,
  AvatarFallback,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@vortx/ui";
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconTrendingUp,
} from "@tabler/icons-react";
import type { InputHTMLAttributes, ReactNode } from "react";

// ── SectionHeader ──────────────────────────────────────────────────────────────
export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

// ── StatCard ───────────────────────────────────────────────────────────────────
export function StatCard({
  label,
  value,
  delta,
  tone = "up",
  icon,
}: {
  label: string;
  value: string;
  delta: string;
  tone?: "up" | "down" | "neutral";
  icon?: ReactNode;
}) {
  const DeltaIcon =
    tone === "up"
      ? IconArrowUpRight
      : tone === "down"
        ? IconArrowDownRight
        : null;
  const deltaClass =
    tone === "up"
      ? "text-success"
      : tone === "down"
        ? "text-destructive"
        : "text-muted-foreground";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardDescription>{label}</CardDescription>
          {icon && <span className="text-muted-foreground">{icon}</span>}
        </div>
        <CardTitle className="text-2xl font-bold">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`flex items-center gap-1 text-xs ${deltaClass}`}>
          {DeltaIcon && <DeltaIcon className="h-3 w-3" />}
          {delta}
        </p>
      </CardContent>
    </Card>
  );
}

// ── MiniBarChart ───────────────────────────────────────────────────────────────
export function MiniBarChart({
  values,
  colorClass = "bg-primary",
  labels,
}: {
  values: number[];
  colorClass?: string;
  labels?: string[];
}) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex h-40 items-end gap-1">
      {values.map((v, i) => (
        <div key={i} className="group flex flex-1 flex-col items-center gap-1">
          <div
            className={`w-full rounded-sm ${colorClass} opacity-80 transition-opacity group-hover:opacity-100`}
            style={{ height: `${Math.round((v / max) * 100)}%` }}
          />
          {labels && (
            <span className="text-[9px] text-muted-foreground">
              {labels[i]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ── BarProgressRow ─────────────────────────────────────────────────────────────
export function BarProgressRow({
  label,
  value,
  barClass = "bg-primary",
}: {
  label: string;
  value: number;
  barClass?: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-secondary">
        <div
          className={`h-2 rounded-full transition-all ${barClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// ── RecentSaleRow ──────────────────────────────────────────────────────────────
export function RecentSaleRow({
  name,
  email,
  amount,
  initials,
}: {
  name: string;
  email: string;
  amount: string;
  initials: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{email}</p>
      </div>
      <span className="shrink-0 font-medium">{amount}</span>
    </div>
  );
}

export function InputField({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={[
        "h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
