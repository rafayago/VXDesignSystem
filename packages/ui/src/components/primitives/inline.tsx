import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";

type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
type Align = "start" | "center" | "end" | "stretch" | "baseline";
type Justify = "start" | "center" | "end" | "between" | "around" | "evenly";

const gapMap: Record<Gap, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
};

const alignMap: Record<Align, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyMap: Record<Justify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

export type InlineProps<T extends ElementType = "div"> = {
  as?: T;
  gap?: Gap;
  align?: Align;
  justify?: Justify;
  wrap?: boolean;
} & ComponentPropsWithoutRef<T>;

export function Inline<T extends ElementType = "div">({
  as,
  gap = 2,
  align = "center",
  justify = "start",
  wrap = false,
  className,
  ...props
}: InlineProps<T>) {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component
      data-slot="inline"
      className={cn(
        "flex",
        gapMap[gap],
        alignMap[align],
        justifyMap[justify],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    />
  );
}
