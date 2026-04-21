"use client";

import type { ComponentProps } from "react";
import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconCircleCheck,
  IconDots,
  IconHelp,
  IconInfoCircle,
  IconLayoutSidebar,
  IconLoader,
  IconMinus,
  IconSearch,
  IconSelector,
  IconX,
} from "@tabler/icons-react";

import { cn } from "../../lib/utils";

const icons = {
  IconAlertOctagon,
  IconAlertTriangle,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconCircleCheck,
  IconDots,
  IconInfoCircle,
  IconLayoutSidebar,
  IconLoader,
  IconMinus,
  IconSearch,
  IconSelector,
  IconX,
} as const;

export type TablerIconName = keyof typeof icons;

export type IconPlaceholderProps = ComponentProps<"svg"> & {
  tabler?: TablerIconName | string;
};

export function IconPlaceholder({
  tabler,
  className,
  ...props
}: IconPlaceholderProps) {
  const Icon =
    tabler && tabler in icons ? icons[tabler as TablerIconName] : IconHelp;

  return (
    <Icon aria-hidden="true" className={cn("size-4", className)} {...props} />
  );
}

export default IconPlaceholder;
