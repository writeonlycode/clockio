import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TaskRow } from "@/types/tasks";
import Link from "next/link";
import { TaskItemStatus } from "./tasks-item-status";

export default function TaskItem({ title, description, status, href }: TaskRow & { href: string }) {
  const isInactive = status === "done" || status === "cancelled";

  return (
    <Link href={href} scroll={false}>
      <Card>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <CardTitle className={cn({ "line-through": isInactive })}>{title}</CardTitle>
            <TaskItemStatus status={status} />
          </div>
          {description && (
            <CardDescription className={cn({ "line-through": isInactive })}>{description}</CardDescription>
          )}
        </CardHeader>
      </Card>
    </Link>
  );
}
