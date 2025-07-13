"use client";

import { Button } from "@/components/ui/button";
import { signOutServerAction } from "@/lib/actions/auth";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function SignOutForm() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    setPending(true);

    const { error } = await signOutServerAction();

    if (error) {
      setPending(false);
      console.log("Error: ", error);
      return;
    }

    router.refresh();
  };

  const { handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button type="submit" size="sm" variant="destructive" disabled={pending}>
        {pending && <LoaderCircleIcon className="animate-spin" />}
        Sign Out
      </Button>
    </form>
  );
}
