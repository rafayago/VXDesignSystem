"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { IconChevronRight } from "@tabler/icons-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/utils";

export function Collapsible({
  className,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className={cn("", className)}
      {...props}
    />
  );
}

export function CollapsibleTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Trigger> & {
  children?: ReactNode;
}) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn(
        "flex w-full items-center justify-between py-1 text-sm font-medium transition-colors hover:text-foreground [&[data-open]>svg:last-child]:rotate-90",
        className,
      )}
      {...props}
    >
      {children}
      <IconChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </CollapsiblePrimitive.Trigger>
  );
}

export function CollapsiblePanel({
  className,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Panel>) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-panel"
      className={cn(
        "overflow-hidden transition-all data-[ending-style]:animate-none data-[starting-style]:animate-none",
        className,
      )}
      {...props}
    />
  );
}
