"use client";

import { taskInsertScheme } from "@/lib/schemas/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TaskInsert } from "@/types/tasks";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { createTask } from "@/lib/actions/tasks";

export default function TasksCreate() {
  const form = useForm({ resolver: zodResolver(taskInsertScheme), defaultValues: { title: "" } });

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

  async function onSubmit({ title, description, status }: TaskInsert) {
    setError(undefined);
    const { error } = await createTask({ title, description, status });
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
                    placeholder="New task..."
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
