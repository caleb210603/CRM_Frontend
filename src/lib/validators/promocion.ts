import { z } from "zod";

export const PromotionSchema = z.object({
  name: z.string().min(1, "Ingrese al menos un nombre"),
  description: z.string().min(1, "Ingrese al menos una descripción"),
  discount: z.number().min(1, "El descuento debe ser mayor que cero").max(100, "El descuento no puede ser mayor que 100"),
  start_date: z.string().regex(/^(2024|2025)-\d{2}-\d{2}$/, {
    message: "Ingrese una fecha de inicio válida"
  }),
  ending_date: z.string().regex(/^(2024|2025)-\d{2}-\d{2}$/, {
    message: "Ingrese una fecha de finalización válida"
  }),
}).refine(data => {
  const today = new Date().toISOString().split('T')[0];
  return data.start_date >= today;
}, {
  message: "La fecha de inicio debe ser igual o posterior al día actual",
  path: ["start_date"]
}).refine(data => {
  return data.ending_date > data.start_date;
}, {
  message: "La fecha de finalización debe ser posterior a la fecha de inicio",
  path: ["ending_date"]
});
