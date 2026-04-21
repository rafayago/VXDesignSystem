import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";

type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
type Align = "start" | "center" | "end" | "stretch";
type Justify = "start" | "center" | "end" | "between";

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
  16: "gap-16",
};

const alignMap: Record<Align, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyMap: Record<Justify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export type StackProps<T extends ElementType = "div"> = {
  as?: T;
  gap?: Gap;
  align?: Align;
  justify?: Justify;
} & ComponentPropsWithoutRef<T>;

export function Stack<T extends ElementType = "div">({
  as,
  gap = 4,
  align = "stretch",
  justify = "start",
  className,
  ...props
}: StackProps<T>) {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component
      data-slot="stack"
      className={cn(
        "flex flex-col",
        gapMap[gap],
        alignMap[align],
        justifyMap[justify],
        className
      )}
      {...props}
    />
  );
}
