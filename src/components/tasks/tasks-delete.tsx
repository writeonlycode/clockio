"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { EllipsisVerticalIcon, Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTask } from "@/lib/actions/tasks";
import { useRouter, useSearchParams } from "next/navigation";

export function TasksDelete({ id, onDeleteRedirect }: { id: string; onDeleteRedirect?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm();

  const handleClose = () => {
    if (onDeleteRedirect) {
      router.push(onDeleteRedirect + "?" + searchParams.toString(), { scroll: false });
    } else {
      router.back();
    }
  };

  async function onSubmit() {
    const { error } = await deleteTask(id);
    if (error) {
      console.log(error);
    } else {
      handleClose();
    }
  }

  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVerticalIcon size="1rem" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <span>Delete</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to permanently delete this note from our servers?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && <Loader2Icon className="animate-spin" />}
                  Delete
                </Button>
              </form>
            </Form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
