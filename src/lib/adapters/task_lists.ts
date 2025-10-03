import { Tables } from "@/types/supabase";
import { TaskListRow } from "@/types/task_lists";

export function mapTaskList({
  id,
  title,
  description,
  task_list_order,
  created_at,
  updated_at,
  profile_id,
  tasks,
}: Tables<"task_lists">): TaskListRow {
  return {
    id: id ?? undefined,
    title: title ?? undefined,
    description: description ?? undefined,
    task_list_order: task_list_order ?? undefined,
    created_at: created_at ?? undefined,
    updated_at: updated_at ?? undefined,
    profile_id: profile_id ?? undefined,
    tasks: tasks ?? [],
  };
}
