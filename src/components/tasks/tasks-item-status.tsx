import { Circle, CircleCheckBig, CircleHelp, CircleSlash2, Timer } from "lucide-react";

export function TaskItemStatus({ status }: { status: string }) {
  switch (status) {
    case "todo":
      return (
        <div className="flex items-center gap-1 text-sm">
          <Circle size="0.75rem" className="text-muted-foreground" />
          <span className="whitespace-nowrap">Todo</span>
        </div>
      );
    case "in_progress":
      return (
        <div className="flex items-center gap-1 text-sm">
          <Timer size="0.75rem" className="text-muted-foreground" />
          <span className="whitespace-nowrap">In Progress</span>
        </div>
      );
    case "backlog":
      return (
        <div className="flex items-center gap-1 text-sm">
          <CircleHelp size="0.75rem" className="text-muted-foreground" />
          <span className="whitespace-nowrap">Backlog</span>
        </div>
      );
    case "cancelled":
      return (
        <div className="flex items-center gap-1 text-sm">
          <CircleSlash2 size="0.75rem" className="text-muted-foreground" />
          <span className="whitespace-nowrap">Cancelled</span>
        </div>
      );
    case "done":
      return (
        <div className="flex items-center gap-1 text-sm">
          <CircleCheckBig size="0.75rem" className="text-muted-foreground" />
          <span className="whitespace-nowrap">Done</span>
        </div>
      );
    default:
      return null;
  }
}
