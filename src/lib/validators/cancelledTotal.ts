import { z } from "zod";


export const totalSchema = (deudaPendiente: number) => z.object({
    /*El preprocess sirve para prevenir que se envie un string ya que queremos number*/
  abono: z.preprocess(
    (val) => parseFloat(z.string().parse(val)),
    z.number().min(1, "La cantidad debe ser al menos S/1").max(deudaPendiente, "La cantidad no puede ser mayor que la deuda")
  )
});