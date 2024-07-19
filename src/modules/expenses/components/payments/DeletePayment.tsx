import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/useToast";
import api from "@/services/api";
import { Payment } from "@/types/purchase";
import { AlertOctagon, Loader2 } from "lucide-react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useQueryClient } from "react-query";
import AlertDialogPayment from "./AlertDialogPayment";

interface DeletePaymentsProps {
    paymentdata: Payment
  }
  
  export const DeletePayments: React.FC<DeletePaymentsProps> = ({ paymentdata }) => {
    const [isPending, setIsPending] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');
    const queryClient = useQueryClient();
  
    const handleClose = () => setIsOpen(false);
  
    const handleDelete = async () => {
      setIsPending(true);
      try {
        const formData = new FormData();
        formData.append("purchase_id", paymentdata.purchase_obj.id)
        formData.append("date_payment", paymentdata.date_payment.toString())
        formData.append("date_limit", paymentdata.date_limit.toString())
        formData.append("payment_method", paymentdata.payment_method)
        formData.append("total", paymentdata.total.toString())
        formData.append("cancelled_total", paymentdata.cancelled_total.toString())
        formData.append("estatus", "Eliminado")
        
        const response = await api.put(`payments/update/${paymentdata.id}`, formData);
  
      if (response.status === 200) {
        setFeedbackType('success');
        setFeedbackMessage("Pago cancelado exitosamente");
        toast({
          title: "Pago cancelado exitosamente",
        });
        queryClient.invalidateQueries("payments");
        setIsOpen(false); // Cierra el diálogo después de la actualización exitosa
      } else if (response.status === 400) {
        setFeedbackType('error');
        setFeedbackMessage("Ha habido un error con los datos");
        toast({
          title: "Ha habido un error con los datos",
        });
      } else {
        setFeedbackType('error');
        setFeedbackMessage("Ha ocurrido un error inesperado");
        toast({
          title: "Ha ocurrido un error inesperado",
        });
      }
    } catch (error) {
      console.error("Error al actualizar cuenta:", error);
    } finally {
      setIsPending(false); // Restablece el estado pendiente
    }
  };
  
    return (
      <>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger>
          <button
            className="bg-red-500 text-white rounded-lg p-2 ml-2"
            onClick={() => setIsOpen(true)}
          >
            <FaTimes/>
          </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
       <AlertDialogTitle>Eliminar Pago</AlertDialogTitle>
          <AlertDialogDescription>
          <AlertOctagon  className="mr-2 h-4 w-4 text-red-500 inline"/>¿Está seguro de que quiere eliminar este Pago?
          </AlertDialogDescription>  
          <AlertDialogFooter className="flex sm:justify-between gap-4">
            <AlertDialogCancel className="w-full" onClick={handleClose}>
              Cancelar
            </AlertDialogCancel>
            <Button
              className="w-full"
              disabled={isPending}
              variant="destructive"
              type="submit"
              onClick={handleDelete}
            >
              {isPending && (
                <Loader2
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Eliminar
            </Button>
          </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    
    {/*Alerta para informar si todo está correcto o si ha ocurrido un error*/}
      <AlertDialogPayment 
        feedbackMessage={feedbackMessage} 
        setFeedbackMessage={setFeedbackMessage} 
        feedbackType={feedbackType} 
      />
    </>
    )
};

export default DeletePayments;