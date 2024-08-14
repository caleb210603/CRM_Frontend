import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/useToast';
import { totalSchema } from '@/lib/validators/cancelledTotal';
import api from '@/services/api';
import { Payment } from '@/types/purchase';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCreditCard } from 'react-icons/fa';
import { useQueryClient } from 'react-query';
import AlertDialogPayment from './AlertDialogPayment';
import { z } from 'zod';


interface CancelledTotalProps {
  paymentdata: Payment
}

const CancelledTotal: React.FC<CancelledTotalProps> = ({ paymentdata}) => {

  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');
  const queryClient = useQueryClient();
  
  const deudaPendiente = paymentdata.total - paymentdata.cancelled_total
  const Schema = totalSchema(deudaPendiente)

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      abono: undefined
    },
  });

  const onSubmit = async (value: z.infer<typeof Schema>) => {
    setIsPending(true);
    try {
      const formData = new FormData();
      if (value.abono) {
        const abonoTotal =  Number(value.abono) + Number(paymentdata.cancelled_total) ;
        formData.append("cancelled_total", abonoTotal.toString());
      }
      else{
        formData.append("cancelled_total", paymentdata.cancelled_total.toString())
      }
        formData.append("purchase_id", paymentdata.purchase_obj.id)
        formData.append("date_payment", paymentdata.date_payment.toString())
        formData.append("date_limit", paymentdata.date_limit.toString())
        formData.append("payment_method", paymentdata.payment_method)
        formData.append("total", paymentdata.total.toString())
        formData.append("estatus", paymentdata.estatus)

  
      const response = await api.put(`/payments/update/${paymentdata.id}`, formData);
  
      if (response.status === 200) {
        setFeedbackType('success');
        setFeedbackMessage("Cuenta actualizada exitosamente");
        toast({
          title: "Cuenta actualizada exitosamente",
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

  const formatAmount = (amount: number) => {
    return amount.toFixed(2);
  };

  const handleOpenChange = (open: boolean) => {
    if (paymentdata.total === paymentdata.cancelled_total) {
      toast({
        title: "No se puede abrir el diálogo",
        description: <><Info className='mr-2 h-4 w-4 text-blue-500 inline' />La deuda pendiente ya ha sido cancelada.</>,
      });
    } else {
      setIsOpen(open);
    }
  };

  return (
    <>
    <Dialog open={isOpen} onOpenChange={handleOpenChange} >
      <DialogTrigger asChild>
        <button className="bg-blue-500 text-white rounded-lg p-2">
          <FaCreditCard />
        </button>
      </DialogTrigger>
      <DialogContent className="gap-5 max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Abonar al Total Cancelado</DialogTitle>
          <DialogDescription>
            Paga tu deuda total aquí.
          </DialogDescription>
        </DialogHeader>
        <div className="modal">
            <div className="modal-content">
              <div className='flex justify-center mb-4'>
                <p className='text-lg font-semibold text-red-500'>
                <Info className='mr-2 h-4 w-4 text-red-500 inline' /> Deuda Pendiente: S/{formatAmount(deudaPendiente)}
                </p>
              </div>
              <Form {...form}>
                <form
                  id='update-user-form'
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'
                >
                  <FormField
                    control={form.control}
                    name="abono"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Cantidad a Abonar</FormLabel>
                        <FormControl>
                          <Input placeholder="S/20" {...field} className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
        <DialogFooter className="flex sm:justify-between gap-4">
          <Button
            className="w-full"
            disabled={isPending}
            type="submit"
            form="update-user-form" // Asegúrate de que el botón "Abonar" envíe el formulario
          >
            {isPending && (
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Abonar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/*Alerta para informar si todo está correcto o si ha ocurrido un error*/}
    <AlertDialogPayment 
    feedbackMessage={feedbackMessage} 
    setFeedbackMessage={setFeedbackMessage} 
    feedbackType={feedbackType} 
    />

    </>
  );
};

export default CancelledTotal;