"use client";

import { Dialog as DrawerPrimitive } from "@base-ui/react/dialog";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/utils";

export function Sheet({
  ...props
}: ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root {...props} />;
}

export function SheetTrigger({
  ...props
}: ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger {...props} />;
}

export function SheetClose({
  ...props
}: ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close {...props} />;
}

export function SheetContent({
  className,
  side = "right",
  children,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Popup> & {
  side?: "left" | "right" | "top" | "bottom";
}) {
  const sideClasses = {
    right:
      "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm translate-x-0 data-[ending-style]:translate-x-full",
    left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm translate-x-0 data-[ending-style]:-translate-x-full",
    top: "inset-x-0 top-0 border-b translate-y-0 data-[ending-style]:-translate-y-full",
    bottom:
      "inset-x-0 bottom-0 border-t translate-y-0 data-[ending-style]:translate-y-full",
  };

  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
      <DrawerPrimitive.Popup
        data-slot="sheet-content"
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-background p-6 shadow-lg transition ease-in-out",
          sideClasses[side],
          className,
        )}
        {...props}
      >
        {children}
      </DrawerPrimitive.Popup>
    </DrawerPrimitive.Portal>
  );
}

export function SheetHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

export function SheetFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "mt-auto flex flex-col gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

export function SheetTitle({
  ...props
}: ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="sheet-title"
      className="text-lg font-semibold text-foreground"
      {...props}
    />
  );
}

export function SheetDescription({
  ...props
}: ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="sheet-description"
      className="text-sm text-muted-foreground"
      {...props}
    />
  );
}
