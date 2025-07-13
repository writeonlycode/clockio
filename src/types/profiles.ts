import { updateProfile } from "@/lib/schemas/profiles";
import { z } from "zod";

export type UpdateProfile = z.infer<typeof updateProfile>;
