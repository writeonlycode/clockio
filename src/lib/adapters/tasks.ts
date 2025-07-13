import { Tables } from "@/types/supabase";
import { TaskRow } from "@/types/tasks";

export function mapTask({
  id,
  title,
  description,
  status,
  created_at,
  updated_at,
  profile_id,
}: Tables<"tasks">): TaskRow {
  return {
    id: id ?? undefined,
    title: title ?? undefined,
    description: description ?? undefined,
    status: status ?? undefined,
    created_at: created_at ?? undefined,
    updated_at: updated_at ?? undefined,
    profile_id: profile_id ?? undefined,
  };
}
