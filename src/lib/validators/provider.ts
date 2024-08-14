import { z } from "zod";

const requiredErrorMsg = "Este campo no puede estar vacío";

export const ProviderSchema = z.object({
  name: z.string().min(1, requiredErrorMsg),
  ruc: z.coerce.number().min(1, requiredErrorMsg),
  person_contact: z.string().min(1, requiredErrorMsg),
  phone: z.string().min(1, requiredErrorMsg),
  email: z.string().email("Ingrese un correo electrónico válido"),
  address: z.string().min(1, requiredErrorMsg),
  note: z.string().min(1, requiredErrorMsg),
});
