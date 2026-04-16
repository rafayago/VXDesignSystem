"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { IconCheck, IconMinus } from "@tabler/icons-react";
import type { ComponentProps } from "react";
import { cn } from "../lib/utils";

export function Checkbox({
  className,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary data-[checked]:text-primary-foreground data-[indeterminate]:bg-primary data-[indeterminate]:text-primary-foreground",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        {props.indeterminate ? (
          <IconMinus className="size-3 stroke-[3]" />
        ) : (
          <IconCheck className="size-3 stroke-[3]" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
