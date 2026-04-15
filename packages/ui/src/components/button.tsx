import type { ButtonHTMLAttributes } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { cn } from "../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  withIcon?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/85 focus-visible:ring-2 focus-visible:ring-ring",
  ghost:
    "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring",
};

export function Button({
  className,
  children,
  variant = "primary",
  withIcon = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors duration-[var(--dur-fast)] ease-[var(--ease-standard)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {withIcon ? <IconArrowRight aria-hidden size={18} stroke={1.8} /> : null}
    </button>
  );
}
