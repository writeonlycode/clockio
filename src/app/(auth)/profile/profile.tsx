"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateCurrentProfile } from "@/lib/actions/profiles";
import { updateProfile } from "@/lib/schemas/profiles";
import { UpdateProfile } from "@/types/profiles";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError, PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function Profile({ defaultValues }: { defaultValues: UpdateProfile }) {
  const [error, setError] = useState<PostgrestError | AuthError | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (data: UpdateProfile) => {
    setError(null);
    setPending(true);

    const { error } = await updateCurrentProfile(data);

    if (error) {
      setError(error);
      console.log("Error: ", error);
    }

    setPending(false);
  };

  const form = useForm<UpdateProfile>({
    resolver: zodResolver(updateProfile),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" disabled={pending} {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={10} placeholder="Lorem ipsum..." disabled={pending} {...field} />
              </FormControl>
              <FormDescription>This is your public description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-center text-sm text-red-500">{error.message}</p>}
        <Button type="submit" disabled={pending}>
          Update Profile
        </Button>
      </form>
    </Form>
  );
}
