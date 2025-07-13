//import { getTasks } from "@/lib/actions/tasks";
//import { TableQueryOptions } from "@/types/supabase-utils";
//import { options } from "@/lib/options";
//import TasksLoadMore from "@/components/tasks/tasks-load-more";
//import TaskItem from "@/components/tasks/tasks-item";
//import TasksCreate from "@/components/tasks/tasks-create";
//
//export default async function PageTodos({ searchParams }: { searchParams: Promise<{ limit: string }> }) {
//  const { limit } = await searchParams;
//  const parsedLimit = parseInt(limit) || options.tasks.pagination;
//
//  const queryOptions: TableQueryOptions = {
//    includeCount: "exact",
//    limit: parsedLimit,
//    order: { column: "created_at", ascending: false },
//  };
//  const { data, count } = await getTasks(queryOptions);
//
//  return (
//    <div className="mx-auto my-8 flex w-full max-w-prose grow flex-col px-4 gap-2">
//      <TasksCreate />
//      <div className="flex flex-col gap-2 mb-4">{data?.map((task) => <TaskItem key={task.id} {...task} />)}</div>
//      <div className="text-center text-sm mb-2">
//        Showing {data?.length} of {count} entries
//      </div>
//      <TasksLoadMore count={count || 0} />
//    </div>
//  );
//}

export default function Page() {
  return null;
}
