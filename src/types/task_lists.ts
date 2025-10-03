import { taskListInsertScheme, taskListRowScheme, taskListUpdateScheme } from "@/lib/schemas/task_lists";
import { z } from "zod";

export type TaskListRow = z.infer<typeof taskListRowScheme>;
export type TaskListInsert = z.infer<typeof taskListInsertScheme>;
export type TaskListUpdate = z.infer<typeof taskListUpdateScheme>;

export type QueryTaskListsResponse = { data?: TaskListRow[]; count?: number; error?: Error };
export type QueryTaskListsSingleResponse = { data?: TaskListRow; count?: number; error?: Error };
export type QueryTaskListsInsertResponse = { data?: TaskListRow; count?: number; error?: Error };
export type QueryTaskListsUpdateResponse = { data?: TaskListRow; count?: number; error?: Error };
export type QueryTaskListsDeleteResponse = { data?: TaskListRow; count?: number; error?: Error };
