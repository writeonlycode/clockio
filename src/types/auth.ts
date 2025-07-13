import { signInValidationSchema, signUpValidationSchema } from "@/lib/schemas/auth";
import { z } from "zod";

export type SignInValidationSchema = z.infer<typeof signInValidationSchema>;
export type SignUpValidationSchema = z.infer<typeof signUpValidationSchema>;
