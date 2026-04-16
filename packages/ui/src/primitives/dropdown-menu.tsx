"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/utils";

export function DropdownMenu({
  ...props
}: ComponentProps<typeof MenuPrimitive.Root>) {
  return <MenuPrimitive.Root {...props} />;
}

export function DropdownMenuTrigger({
  ...props
}: ComponentProps<typeof MenuPrimitive.Trigger>) {
  return <MenuPrimitive.Trigger {...props} />;
}

export function DropdownMenuContent({
  className,
  align,
  sideOffset = 4,
  ...props
}: ComponentProps<typeof MenuPrimitive.Popup> & {
  align?: ComponentProps<typeof MenuPrimitive.Positioner>["align"];
  sideOffset?: number;
}) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner align={align} sideOffset={sideOffset}>
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({
  className,
  inset,
  ...props
}: ComponentProps<typeof MenuPrimitive.Item> & { inset?: boolean }) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof MenuPrimitive.Separator>) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export function DropdownMenuLabel({
  className,
  inset,
  children,
  ...props
}: {
  className?: string;
  inset?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      data-slot="dropdown-menu-label"
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        inset && "pl-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuGroup({
  ...props
}: ComponentProps<typeof MenuPrimitive.Group>) {
  return <MenuPrimitive.Group {...props} />;
}

export function DropdownMenuGroupLabel({
  className,
  ...props
}: ComponentProps<typeof MenuPrimitive.GroupLabel>) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-group-label"
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function DropdownMenuShortcut({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
}
