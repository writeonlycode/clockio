"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogTitle, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateTask } from "@/lib/actions/tasks";
import { taskUpdateScheme } from "@/lib/schemas/tasks";
import { TaskUpdate } from "@/types/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { TaskItemStatus } from "./tasks-item-status";
import { useRouter, useSearchParams } from "next/navigation";
import { TasksDelete } from "./tasks-delete";

export function TasksUpdate({
  id,
  defaultValues,
  onCloseRedirect,
}: {
  id: string;
  defaultValues: TaskUpdate;
  onCloseRedirect?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(true);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const [error, setError] = useState<Error | undefined>();

  const form = useForm<TaskUpdate>({
    resolver: zodResolver(taskUpdateScheme),
    defaultValues,
  });

  const {
    reset,
    formState: { isDirty, isSubmitSuccessful },
  } = form;

  const handleOpenChange = () => {
    if (isDirty) {
      setAlertDialogOpen(true);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);

    if (onCloseRedirect) {
      router.push(onCloseRedirect + "?" + searchParams.toString(), { scroll: false });
    } else {
      router.back();
    }
  };

  async function onSubmit(values: TaskUpdate) {
    setError(undefined);
    const { error } = await updateTask(values, id);
    setError(error);
  }

  useEffect(() => {
    reset(undefined, { keepValues: true, keepDirty: false });
  }, [reset, isSubmitSuccessful]);

  return (
    <>
      <Dialog defaultOpen open={open} onOpenChange={handleOpenChange}>
        <DialogContent hideOverlay>
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle>{defaultValues?.title}</DialogTitle>
            </VisuallyHidden>
            <VisuallyHidden>
              <DialogDescription>{defaultValues?.description}</DialogDescription>
            </VisuallyHidden>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder="Task title..."
                        className="h-auto border-none text-4xl md:text-4xl inline text-ellipsis"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={form.formState.isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className="border-none text-white font-bold">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="todo">
                          <TaskItemStatus status="todo" />
                        </SelectItem>
                        <SelectItem value="in_progress">
                          <TaskItemStatus status="in_progress" />
                        </SelectItem>
                        <SelectItem value="done">
                          <TaskItemStatus status="done" />
                        </SelectItem>
                        <SelectItem value="cancelled">
                          <TaskItemStatus status="cancelled" />
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="h-auto border-none"
                        disabled={form.formState.isSubmitting}
                        placeholder="Task description..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-center text-sm text-red-500">{error.message}</p>}
              <Button type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2Icon className="animate-spin" />}
                Save
              </Button>
            </form>
          </Form>
          <div className="absolute top-4 right-4">
            <TasksDelete id={id} />
          </div>
        </DialogContent>
      </Dialog>
      <AlertDialog open={alertDialogOpen} onOpenChange={() => {}}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You have unsaved changes!</AlertDialogTitle>
            <AlertDialogDescription>Do you want to discard the unsaved changes?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setAlertDialogOpen(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setAlertDialogOpen(false);
                handleClose();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
