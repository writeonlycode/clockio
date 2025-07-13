import { z } from "zod";

export const taskRowScheme = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  status: z.string(),
  profile_id: z.string(),
});

export const taskInsertScheme = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
});

export const taskUpdateScheme = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
});
