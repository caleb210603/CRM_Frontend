import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import api from '@/services/api';
import { useMutation, useQueryClient } from 'react-query';
import { useToast } from "@/hooks/useToast"; // Importa el hook useToast para mostrar toasts

interface DeleteModalProps {
  isOpenM: boolean;
  closeModalM: () => void;
  purchaseId: number | null;
  purchaseData: any;
}

const AlertDelete: React.FC<DeleteModalProps> = ({ isOpenM, closeModalM, purchaseId, purchaseData }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast(); // Usa el hook useToast para obtener la función toast

  // Configura la mutación para eliminar el registro de compra
  const deleteMutation = useMutation(
    async () => {
      if (purchaseId && purchaseData) {
        // Prepara los datos actualizados para la solicitud PUT
        const updatedPurchaseData = {
          ...purchaseData,
          estatus: 'Eliminado',
          provider_id: purchaseData.provider_obj.id,
        };
        // Realiza la solicitud PUT para actualizar el registro de compra
        return await api.put(`/purchases/update/${purchaseId}`, updatedPurchaseData);
      } else {
        throw new Error('Datos de compra no proporcionados');
      }
    },
    {
      onSuccess: () => {
        // Cuando la eliminación tiene éxito, muestra un toast de éxito
        toast({
          title: 'Eliminado con éxito',
        });

        // Invalida y refresca la consulta de 'purchases' para actualizar la lista
        queryClient.invalidateQueries('purchases');
        // Cierra el diálogo de eliminación
        closeModalM();
      },
      onError: (error: any) => {
        console.error('Error al eliminar el registro:', error);
      },
    }
  );

  // Maneja la acción de eliminación cuando se hace clic en el botón "Eliminar"
  const handleDelete = async () => {
    deleteMutation.mutate(); // Inicia la mutación para eliminar el registro de compra
  };

  return (
    <Dialog open={isOpenM} onOpenChange={closeModalM}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            ¿Confirmar Eliminación de Registro?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="mb-4 text-left">
          ¿Estás seguro de que deseas eliminar este registro del historial de compras?
        </DialogDescription>
        <DialogFooter className="flex justify-center space-x-4">
          <Button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
            onClick={handleDelete} // Llama a handleDelete cuando se hace clic en "Eliminar"
          >
            Eliminar
          </Button>
          <Button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            onClick={closeModalM} // Cierra el diálogo cuando se hace clic en "Cancelar"
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDelete;