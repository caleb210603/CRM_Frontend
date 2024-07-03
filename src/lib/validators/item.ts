import { z } from "zod";

const requiredErrorMsg = "Este campo no puede estar vacío";

export const ItemSchema = z.object({
    item: z.string().min(1, requiredErrorMsg),
    description: z.string().min(1, requiredErrorMsg),
    quantity: z.coerce.number().min(1, "La cantidad debe ser al menos 1"),
    price: z.coerce.number().positive("El precio debe ser mayor que 0"),
    total: z.coerce.number().min(0, "El total no puede ser negativo"),
});