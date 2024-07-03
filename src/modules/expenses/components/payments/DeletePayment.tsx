import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { isPending } from "@reduxjs/toolkit";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface DeletePaymentsProps {
    id: number;
  }
  
  export const DeletePayments: React.FC<DeletePaymentsProps> = ({ id }) => {
    const [isPending, setIsPending] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleClose = () => setIsOpen(false);
  
    const handleDelete = async () => {
      setIsPending(true);
      try {
        await api.delete("/users/delete/"+id);
        setIsPending(false);
        handleClose();
      } catch (error) {
        setIsPending(false);
        setError("Error eliminando el pago.");
      }
    };
  
    return (
        <AlertDialog>
        <AlertDialogTrigger>
          <button
            className="bg-red-500 text-white rounded-lg p-2 ml-2"
          >
            <FaTimes/>
          </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
       <AlertDialogTitle>Eliminar Pago</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Está seguro de que quiere eliminar este Pago?
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
          {error && <div className="text-destructive mt-2">{error}</div>}
      </AlertDialogContent>
    </AlertDialog>

    )
};

export default DeletePayments;