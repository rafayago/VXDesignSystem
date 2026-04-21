import * as React from "react";
import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type TextSize = "xs" | "sm" | "base" | "lg" | "xl";
type TextTone = "default" | "muted" | "brand";
type TextTag = "p" | "span" | "div" | "label";

const sizeMap: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const toneMap: Record<TextTone, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  brand: "text-primary",
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
  size?: TextSize;
  tone?: TextTone;
  muted?: boolean;
  as?: TextTag;
}

export function Text({
  size = "base",
  tone = "default",
  muted = false,
  as = "p",
  className,
  ...props
}: TextProps) {
  return React.createElement(as, {
    "data-slot": "text",
    className: cn(
      "leading-normal",
      sizeMap[size],
      muted ? toneMap.muted : toneMap[tone],
      className
    ),
    ...props,
  });
}
