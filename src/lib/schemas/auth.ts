import { z } from "zod";

export const signInValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const signUpValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
