import { formatResponse } from "@/lib/utils";
import { TasksUpdate } from "@/components/tasks/tasks-update";
import { queryTask } from "@/lib/queries/tasks";
import { createClient } from "@/lib/supabase/server";

export default async function TodoPage({ params }: { params: Promise<{ id: string }> }) {
  const supabaseClient = await createClient();
  const { id } = await params;
  const { data } = await queryTask(supabaseClient, {}, id);
  const defaultValues = formatResponse(data || {});

  return <TasksUpdate id={id} defaultValues={defaultValues} onCloseRedirect="/tasks" />;
}
