export const dynamic = "force-dynamic";

import { getTasks } from "@/lib/actions/tasks";
import { TableQueryOptions } from "@/types/supabase-utils";
import TaskItem from "@/components/tasks/tasks-item";
import TasksCreate from "@/components/tasks/tasks-create";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TaskListsCreate from "@/components/task_lists/task-lists-create";
import { getTaskLists } from "@/lib/actions/task_lists";
import Link from "next/link";

export default async function PageLists() {
  const queryOptions: TableQueryOptions = {
    includeCount: "exact",
    limit: 0,
    order: { column: "created_at", ascending: false },
  };

  console.log("Getting orphan tasks...");
  const { data } = await getTasks(queryOptions);

  console.log("Getting task lists...");
  const { data: listData } = await getTaskLists(queryOptions);

  return (
    <div className="mx-auto mt-8 flex items-start w-full h-[calc(100vh-6rem)] grow px-4 gap-6 overflow-x-auto overflow-y-hidden [scrollbar-width:thin] [scrollbar-color:gray_transparent]">
      {listData?.map((task_list) => (
        <Card
          key={task_list.id}
          className="flex flex-col min-w-80 max-w-80 mb-8 max-h-[calc(100%-1rem)] overflow-y-hidden"
        >
          <CardHeader className="p-4">
            <Link href={"/lists/" + task_list.id}>
              <CardTitle className="w-full">{task_list?.title}</CardTitle>
            </Link>
            <CardDescription>{task_list?.description}</CardDescription>
          </CardHeader>
          <div className="flex flex-col gap-2 mb-4 px-3">
            <TasksCreate task_list_id={task_list.id} task_list_order={0} />
          </div>
          <div className="flex flex-col gap-2 mb-4 px-3 overflow-y-auto grow">
            {task_list.tasks?.map((task) => (
              <TaskItem key={task.id} href={"/lists/tasks/" + task.id} {...task} />
            ))}
          </div>
        </Card>
      ))}
      <Card className="min-w-80 max-w-80 mb-8">
        <CardHeader className="p-4">
          <CardTitle>No List</CardTitle>
          <CardDescription>Tasks that don’t belong to any specific list yet.</CardDescription>
        </CardHeader>
        <div className="flex flex-col gap-2 mb-4 px-3">
          <TasksCreate task_list_order={0} />
          {data?.map((task) => (
            <TaskItem key={task.id} href={"/lists/tasks/" + task.id} {...task} />
          ))}
        </div>
      </Card>
      <div className="min-w-80 max-w-80 mb-8">
        <TaskListsCreate />
      </div>
    </div>
  );
}
