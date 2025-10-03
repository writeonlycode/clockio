"use client";

import { taskListInsertScheme } from "@/lib/schemas/task_lists";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TaskListInsert } from "@/types/task_lists";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { createTaskList } from "@/lib/actions/task_lists";

export default function TaskListsCreate() {
  const form = useForm({ resolver: zodResolver(taskListInsertScheme), defaultValues: { title: "", description: "" } });

  const {
    reset,
    formState: { isSubmitSuccessful },
  } = form;

  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    if (isSubmitSuccessful && !error) {
      reset();
    }
  }, [reset, error, isSubmitSuccessful]);

  async function onSubmit({ title, description }: TaskListInsert) {
    setError(undefined);
    const { error } = await createTaskList({ title, description });
    setError(error);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    placeholder="New list..."
                    {...field}
                    disabled={form.formState.isSubmitting}
                    className="rounded-e-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="sm" disabled={form.formState.isSubmitting} className="rounded-s-none">
            {form.formState.isSubmitting ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
          </Button>
        </div>
        {error && <p className="text-center text-sm text-red-500">{error.message}</p>}
      </form>
    </Form>
  );
}
