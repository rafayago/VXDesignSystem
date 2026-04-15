import * as Dialog from "@base-ui/react/dialog";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface AppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  trigger: ReactNode;
  children: ReactNode;
}

export function AppDialog({
  open,
  onOpenChange,
  title,
  description,
  trigger,
  children,
}: AppDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger
        render={
          <button type="button" aria-label={title} className="contents" />
        }
      >
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" />
        <Dialog.Popup
          className={cn(
            "fixed left-1/2 top-1/2 w-[min(92vw,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-xl",
            "duration-[var(--dur-normal)] ease-[var(--ease-energetic)]",
          )}
        >
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
          {description ? (
            <Dialog.Description className="mt-1 text-sm text-muted-foreground">
              {description}
            </Dialog.Description>
          ) : null}
          <div className="mt-4">{children}</div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
