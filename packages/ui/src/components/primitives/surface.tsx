import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type SurfaceTone = "default" | "muted" | "accent";
type SurfacePadding = "none" | "sm" | "md" | "lg";

const toneMap: Record<SurfaceTone, string> = {
  default: "bg-card text-card-foreground",
  muted: "bg-muted text-foreground",
  accent: "bg-accent text-accent-foreground",
};

const paddingMap: Record<SurfacePadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-5",
  lg: "p-6",
};

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  tone?: SurfaceTone;
  padding?: SurfacePadding;
}

export function Surface({
  elevated = false,
  tone = "default",
  padding = "md",
  className,
  ...props
}: SurfaceProps) {
  return (
    <div
      data-slot="surface"
      className={cn(
        "rounded-xl border border-border",
        toneMap[tone],
        paddingMap[padding],
        elevated && "shadow-md",
        className
      )}
      {...props}
    />
  );
}
