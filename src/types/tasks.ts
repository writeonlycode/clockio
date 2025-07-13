import { taskInsertScheme, taskRowScheme, taskUpdateScheme } from "@/lib/schemas/tasks";
import { z } from "zod";

export type TaskRow = z.infer<typeof taskRowScheme>;
export type TaskInsert = z.infer<typeof taskInsertScheme>;
export type TaskUpdate = z.infer<typeof taskUpdateScheme>;

export type QueryTasksResponse = { data?: TaskRow[]; count?: number; error?: Error };
export type QueryTasksSingleResponse = { data?: TaskRow; count?: number; error?: Error };
export type QueryTasksInsertResponse = { data?: TaskRow; count?: number; error?: Error };
export type QueryTasksUpdateResponse = { data?: TaskRow; count?: number; error?: Error };
export type QueryTasksDeleteResponse = { data?: TaskRow; count?: number; error?: Error };
