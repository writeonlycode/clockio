"use client";

import { Dialog, DialogTitle, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = Readonly<{ title?: string; description?: string; onCloseRedirect?: string; children: React.ReactNode }>;

export function InterceptingDialog({ title, description, onCloseRedirect, children }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);

    if (onCloseRedirect) {
      console.log("Redirecting to: ", onCloseRedirect);
      router.push(onCloseRedirect + "?" + searchParams.toString(), { scroll: false });
    } else {
      console.log("Redirecting to: back");
      router.back();
    }
  };

  return (
    <>
      <Dialog defaultOpen open={open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">{title}</DialogTitle>
            <DialogDescription className="text-center">{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}
