import { createClient } from "../supabase/client";

export async function getCurrentUser() {
  const supabase = createClient();
  const authResponse = await supabase.auth.getUser();

  return authResponse;
}

export async function getCurrentProfile() {
  const supabase = createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) {
    return { error: authError };
  }

  const profilesResponse = await supabase.from("profiles").select().eq("id", authData.user.id).single();

  return profilesResponse;
}
