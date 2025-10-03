import { formatResponse } from "@/lib/utils";
import { TaskListsUpdate } from "@/components/task_lists/task-lists-update";
import { getTaskList } from "@/lib/actions/task_lists";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getTaskList({}, id);
  const defaultValues = formatResponse(data || {});

  return <TaskListsUpdate id={id} defaultValues={defaultValues} onCloseRedirect="/lists" />;
}
