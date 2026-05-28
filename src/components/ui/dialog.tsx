import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { useTranslation } from "@/i18n";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
}: DialogProps) {
  const { t } = useTranslation();

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="
          fixed inset-0 z-50 bg-black/40 backdrop-blur-sm
        " />
        <DialogPrimitive.Content className="
          fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm
          -translate-1/2 rounded-2xl border border-border bg-card p-6 shadow-xl
          outline-none
        ">
          <div className="flex flex-col gap-1.5">
            <DialogPrimitive.Title className="
              text-base font-semibold tracking-tight
            ">
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="
              text-sm text-muted-foreground
            ">
              {description}
            </DialogPrimitive.Description>
          </div>
          {children}
          <DialogPrimitive.Close className="
            absolute top-4 right-4 flex size-7 cursor-pointer items-center
            justify-center rounded-md text-muted-foreground transition-colors
            hover:bg-foreground/5 hover:text-foreground
          ">
            <X size={16} />
            <span className="sr-only">{t.io.close}</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
