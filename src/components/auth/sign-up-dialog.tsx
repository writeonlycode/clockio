"use client";

import { Dialog, DialogTitle, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SignUpForm } from "./sign-up-form";

export function SignUpDialog({ onCloseRedirect }: { onCloseRedirect?: string }) {
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Sign Up</DialogTitle>
            <DialogDescription className="text-center">Sign up for a new account!</DialogDescription>
          </DialogHeader>
          <SignUpForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
