import { getTask } from "@/lib/actions/tasks";
import { formatResponse, sleep } from "@/lib/utils";
import { TasksUpdate } from "@/components/tasks/tasks-update";

export default async function TodoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getTask({}, id);
  const defaultValues = formatResponse(data || {});

  await sleep(3000);
  return <TasksUpdate id={id} defaultValues={defaultValues} onCloseRedirect="/tasks" />;
}
