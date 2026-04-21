import type { ComponentType } from "react";
import type { IconProps as TablerIconProps } from "@tabler/icons-react";
import { cn } from "../../lib/cn";

export interface IconProps {
  icon: ComponentType<TablerIconProps>;
  size?: number;
  stroke?: number;
  className?: string;
  label?: string;
}

export function Icon({
  icon: IconComponent,
  size = 16,
  stroke = 1.75,
  className,
  label,
}: IconProps) {
  return (
    <IconComponent
      size={size}
      stroke={stroke}
      className={cn("shrink-0", className)}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
