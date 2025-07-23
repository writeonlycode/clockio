"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInServerAction } from "@/lib/actions/auth";
import { options } from "@/lib/options";
import { signInValidationSchema } from "@/lib/schemas/auth";
import { SignInValidationSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "@supabase/supabase-js";
import { LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  redirectPath?: string;
}

export function SignInForm({ redirectPath }: Props) {
  const [error, setError] = useState<AuthError | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const onSubmit = async ({ email, password }: SignInValidationSchema) => {
    setError(null);
    setPending(true);

    const { error } = await signInServerAction({ email, password });

    if (error) {
      setError(error);
      setPending(false);
      console.log("Error: ", error);
      return;
    }

    //if (redirectPath) {
    //  router.push(redirectPath);
    //  return;
    //}

    router.back();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signInValidationSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="mail@example.com" disabled={pending} {...register("email")} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href={options.links.auth.resetPassword}
              className="ml-auto inline-block text-sm leading-none underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" disabled={pending} {...register("password")} />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>
        {error && <p className="text-center text-sm text-red-500">{error.message}</p>}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending && <LoaderCircleIcon className="animate-spin" />}
          Sign In
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href={options.links.auth.signUp} className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
