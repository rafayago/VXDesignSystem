import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const tagMap: Record<HeadingLevel, HeadingTag> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

const styleMap: Record<HeadingLevel, string> = {
  1: "text-4xl font-semibold tracking-tight text-balance",
  2: "text-3xl font-semibold tracking-tight text-balance",
  3: "text-2xl font-semibold tracking-tight",
  4: "text-xl font-semibold",
  5: "text-lg font-medium",
  6: "text-base font-medium",
};

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: HeadingTag;
}

export function Heading({
  level = 2,
  as,
  className,
  ...props
}: HeadingProps) {
  const Tag = as ?? tagMap[level];

  return <Tag data-slot="heading" className={cn(styleMap[level], className)} {...props} />;
}
