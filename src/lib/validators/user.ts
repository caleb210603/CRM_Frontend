import { z } from "zod";

const requiredErrorMsg = "Este campo no puede estar vacío";
const emailErrorMsg = "Debe ser un correo electrónico válido";

export const UserSchema = z.object({
  username: z.string().min(1, requiredErrorMsg),
  email: z.string().email(emailErrorMsg).min(1, requiredErrorMsg),
  name: z.string().min(1, "Ingrese al menos un nombre"),
  lastname: z.string().min(1, "Ingrese al menos un apellido"),
  document_type: z.number().min(1, "Seleccion un tipo"),
  document_number: z
    .string()
    .min(1, requiredErrorMsg)
    .min(8, { message: "Este campo debe contener 8 dígitos mínimo" }),
  phone: z
    .string()
    .min(9, { message: "Ingrese un número de teléfono" })
    .max(9, { message: "Número de teléfono inválido" }),
  image: z.any(),
  address: z.string().min(1, requiredErrorMsg),
  role: z.number().min(1, "Seleccion un tipo"),
});

const PasswordScheme = z.object({
  password: z
    .string()
    .min(6, requiredErrorMsg + " y requiere mínimo 6 caracteres")
    .regex(/^\S+$/, {
      message: "El nombre de usuario no puede contener espacios en blanco",
    })
    .regex(
      /[A-Z]/,
      "La nueva contraseña debe contener al menos una letra mayuscula"
    )
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "La nueva contraseña debe contener al menos un caracter especial"
    ),
});

export const RegisterSchema = z.intersection(UserSchema, PasswordScheme);

export const UpdateProfile = z.object({
  email: z.string().email(emailErrorMsg).min(1, requiredErrorMsg).optional(),
  address: z.string().min(1, requiredErrorMsg).optional(),
  phone: z
    .string()
    .min(9, { message: "Ingrese un número de teléfono" })
    .max(9, { message: "Número de teléfono inválido" })
    .optional(),
});
