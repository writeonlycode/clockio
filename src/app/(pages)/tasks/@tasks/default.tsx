import { options } from "@/lib/options";
import TasksLoadMore from "@/components/tasks/tasks-load-more";
import TaskItem from "@/components/tasks/tasks-item";
import TasksCreate from "@/components/tasks/tasks-create";
import { queryTasks } from "@/lib/queries/tasks";
import { createClient } from "@/lib/supabase/server";

export default async function PageTodos({ searchParams }: { searchParams: Promise<{ limit: string }> }) {
  const { limit } = await searchParams;
  const parsedLimit = parseInt(limit) || options.tasks.pagination;

  const supabaseClient = await createClient();

  const { data, count } = await queryTasks(supabaseClient, {
    includeCount: "exact",
    limit: parsedLimit,
    order: { column: "created_at", ascending: false },
  });

  return (
    <div className="mx-auto my-8 flex w-full max-w-prose grow flex-col px-4 gap-2">
      <TasksCreate />
      <div className="flex flex-col gap-2 mb-4">
        {data?.map((task) => (
          <TaskItem key={task.id} href={"/tasks/" + task.id + "?limit=" + limit} {...task} />
        ))}
      </div>
      <div className="text-center text-sm mb-2">
        Showing {data?.length} of {count} entries
      </div>
      <TasksLoadMore count={count || 0} />
    </div>
  );
}
