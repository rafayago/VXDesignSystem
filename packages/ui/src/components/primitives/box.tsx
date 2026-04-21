import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";

export type BoxProps<T extends ElementType = "div"> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function Box<T extends ElementType = "div">({
  as,
  className,
  ...props
}: BoxProps<T>) {
  const Component = (as ?? "div") as ElementType;

  return <Component data-slot="box" className={cn(className)} {...props} />;
}
