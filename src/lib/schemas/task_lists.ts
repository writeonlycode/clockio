import { z } from "zod";
import { taskRowScheme } from "./tasks";

export const taskListRowScheme = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  task_list_order: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  profile_id: z.string(),
  tasks: z.array(taskRowScheme),
});

export const taskListInsertScheme = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  task_list_order: z.number().optional(),
});

export const taskListUpdateScheme = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  task_list_order: z.number().optional(),
});
