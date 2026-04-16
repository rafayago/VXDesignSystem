"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import type { ComponentProps } from "react";
import { cn } from "../lib/utils";

export function Progress({
  className,
  value,
  ...props
}: ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Track className="h-full w-full">
        <ProgressPrimitive.Indicator
          className="h-full bg-primary transition-all"
          style={{
            width: `${Math.min(100, Math.max(0, (value as number) ?? 0))}%`,
          }}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}
