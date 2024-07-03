import { z } from "zod";

export const totalSchema = z.object({
    abono: z.coerce.number().min(1, "La cantidad debe ser al menos S/1"),
           
})