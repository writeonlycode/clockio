"use server";

import { createClient } from "@/lib/supabase/server";
import { SignInValidationSchema, SignUpValidationSchema } from "@/types/auth";
import { AuthError, AuthResponse } from "@supabase/supabase-js";

import { signInValidationSchema, signUpValidationSchema } from "../schemas/auth";

export async function signUpServerAction(data: SignUpValidationSchema): Promise<AuthResponse> {
  const { data: zodData, error: zodError } = signUpValidationSchema.safeParse(data);

  if (zodError) {
    console.log("Validation Error: ", zodError);
    return { data: { user: null, session: null }, error: new AuthError("Ops... Somehting went wrong!") };
  }

  const { email, password } = zodData;

  const supabase = await createClient();
  const response = await supabase.auth.signUp({
    email,
    password,
  });

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  return response;
}

export async function signInServerAction(data: SignInValidationSchema): Promise<AuthResponse> {
  const { data: zodData, error: zodError } = signInValidationSchema.safeParse(data);

  if (zodError) {
    return { data: { user: null, session: null }, error: new AuthError("Ops... Somehting went wrong!") };
  }

  const { email, password } = zodData;

  const supabase = await createClient();
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  return response;
}

export async function signOutServerAction(): Promise<{ error: AuthError | null }> {
  const supabase = await createClient();
  const response = await supabase.auth.signOut();

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  return response;
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const response = await supabase.auth.getUser();

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  return response;
}
