"use client";

import { Dialog, DialogTitle, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SignInForm } from "./sign-in-form";

export function SignInDialog({ onCloseRedirect }: { onCloseRedirect?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);

    if (onCloseRedirect) {
      router.push(onCloseRedirect + "?" + searchParams.toString(), { scroll: false });
    } else {
      router.back();
    }
  };

  return (
    <>
      <Dialog defaultOpen open={open} onOpenChange={handleClose}>
        <DialogContent hideOverlay>
          <DialogHeader>
            <DialogTitle className="text-center">Sign In</DialogTitle>
            <DialogDescription className="text-center">Sign in to your account!</DialogDescription>
          </DialogHeader>
          <SignInForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
