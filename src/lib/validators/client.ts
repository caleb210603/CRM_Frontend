import { z } from "zod";

const requiredErrorMsg = "Campo requerido";
const emailErrorMsg = "Correo electrónico inválido";
const documentErrorMsg = "Documento inválido";

export const ClientSchema = z.object({
  name: z.string().min(1, "Ingrese al menos un nombre"),
  lastname: z.string().min(1, "Ingrese al menos un apellido"),
  address: z.string().min(1, requiredErrorMsg),
  document_type: z.number().nonnegative("Seleccione un tipo"),
  document_number: z
  .string()
  .min(8, requiredErrorMsg)
  .refine(value => /^[0-9.]+$/.test(value), {message: documentErrorMsg}),
  phone: z
  .string()
  .min(9, { message: "Ingrese un número de teléfono" })
  .max(9, { message: "Número de teléfono inválido" }),
  email: z.string().email(emailErrorMsg).min(1, requiredErrorMsg),
  gender: z.number().nonnegative("Seleccione un tipo"),
  day: z.string().min(1, requiredErrorMsg),
  month: z.string().min(1, requiredErrorMsg),
  year: z.string().min(1, requiredErrorMsg)
  .min(4, { message: "Ejemplo: 2004" })
  .max(4, { message: "Ejemplo: 2004" })
  .refine(value => {
    const currentYear = new Date().getFullYear();
    const enteredYear = parseInt(value, 10);
    return enteredYear <= currentYear;
  }, { message: "El año no puede ser mayor al año actual" }),
  postal_code: z.string().min(1, requiredErrorMsg),
  country: z.string().min(1, requiredErrorMsg),
  province: z.string().min(1, requiredErrorMsg),
  district: z.string().min(1, requiredErrorMsg),
  image: z.any(),
  birthdate: z.any(),
});