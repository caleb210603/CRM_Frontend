import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export interface Props {
    handleDelete: ()=>void
}

const DeleteModal: React.FC<Props> = ({handleDelete}) => {
    return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-transparent m-0 p-0 h-fit hover:bg-transparent hover:-translate-y-1 transition-all"><Trash2 size={18} className="text-red-500"/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de que quieres eliminar esta notificación?</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="mb-3">Al eliminar esta notificación ya no podrá recuperlo en el futuro</p>            
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    );
};

export default DeleteModal;