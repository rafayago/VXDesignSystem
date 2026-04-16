"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import type { ComponentProps } from "react";
import { cn } from "../lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<
  ComponentProps<typeof SelectPrimitive.Root>,
  "children" | "value" | "onValueChange"
> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}
export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  className,
  disabled,
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={
        onValueChange
          ? (v) => {
              if (v != null) onValueChange(v);
            }
          : undefined
      }
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        className={cn(
          "flex h-9 w-full items-center justify-between gap-2 whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          className,
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder ?? "Select…"} />
        <IconSelector className="h-4 w-4 shrink-0 opacity-50" />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner sideOffset={4}>
          <SelectPrimitive.Popup
            data-slot="select-content"
            className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md"
          >
            <SelectPrimitive.List className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  data-slot="select-item"
                  className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                    <IconCheck className="h-4 w-4" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.List>
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
