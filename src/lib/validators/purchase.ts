import { z } from "zod";
import { getPaymentType } from "@/enums/paymentType";

const requiredErrorMsg = "Este campo no puede estar vacío";

export const PurchaseDetailSchema = z.object({
    id: z.number().min(1, requiredErrorMsg),
    purchase_id: z.number().min(1, requiredErrorMsg),
    date_purchase: z.date(),
    item: z.string().min(1, requiredErrorMsg), 
    price: z.number().min(0, "El precio no puede ser negativo"),
    quantity: z.number().min(1, "La cantidad debe ser al menos 1"),
    total: z.number().min(0, "El total no puede ser negativo"),
    description: z.string().min(1, requiredErrorMsg),
    created_at: z.date()
});

export const PurchaseSchema = z.object({
    provider_id: z.number().min(1, requiredErrorMsg),
    date_purchase: z.string().regex(/^(2024|2025)-\d{2}-\d{2}$/, {
        message: "Ingrese una fecha válida"
    }),
    description: z.string().min(1, requiredErrorMsg),
    number_bill: z.string().min(1, requiredErrorMsg),
    total: z.coerce.number().min(0, "El total no puede ser negativo"),
    estatus: z.string().min(1, requiredErrorMsg),
    detailpurchase_id: z.coerce.number().min(1, requiredErrorMsg),
    date_limit: z.string().regex(/^(2024|2025)-\d{2}-\d{2}$/, {
        message: "Ingrese una fecha válida"
    }),
    payment_method: z.string().min(1, requiredErrorMsg)
});