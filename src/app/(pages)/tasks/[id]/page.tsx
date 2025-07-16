import { getTask } from "@/lib/actions/tasks";
import { formatResponse } from "@/lib/utils";
import { TasksUpdate } from "@/components/tasks/tasks-update";

export default async function TodoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getTask({}, id);
  const defaultValues = formatResponse(data || {});

  return <TasksUpdate id={id} defaultValues={defaultValues} onCloseRedirect="/tasks" />;
}
