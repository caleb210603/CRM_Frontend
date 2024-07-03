import { z } from "zod";
import { checkEmailSchema } from "./auth";

export const supportSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  email: checkEmailSchema.shape.email,
  subject: z
    .string()
    .min(5, "El asunto debe tener al menos 5 caracteres")
    .max(100, "El asunto no puede tener más de 100 caracteres"),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje no puede tener más de 1000 caracteres"),
});