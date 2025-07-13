import { z } from "zod";

export const updateProfile = z.object({
  display_name: z.string().optional(),
  description: z.string().optional(),
});
