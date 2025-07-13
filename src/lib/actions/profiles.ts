"use server";

import { createClient } from "@/lib/supabase/server";
import { UpdateProfile } from "@/types/profiles";

export async function getCurrentProfile() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log("Supabase Error: ", error);
    return { error: error };
  }

  const response = await supabase.from("profiles").select().eq("id", data.user.id).single();

  if (response.error) {
    console.log("Supabase Error: ", response.error);
  }

  return response;
}

export async function updateCurrentProfile(payload: UpdateProfile) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log("Supabase Error: ", error);
    return { error };
  }

  const response = await supabase.from("profiles").update(payload).eq("id", data.user.id);
  return response;
}
