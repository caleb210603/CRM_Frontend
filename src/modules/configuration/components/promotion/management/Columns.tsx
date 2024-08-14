import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DialogContent, DialogFooter, DialogHeader} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PromotionDetail as PromotionDetailType } from "@/types/auth";
import { ArrowUpDown, Loader2} from "lucide-react";
import { Dialog, DialogClose, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { useQueryClient } from "react-query";
import api from "@/services/api";
import { AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { PromotionEdit } from "../PromotionEdit";
//import { EditCell, DeleteCell } from "./Cells"; // New components

export const columns: ColumnDef<PromotionDetailType>[] = [
  {
    id: "tipo",
    header: ({ table }) => (
      <Checkbox
        className="ml-4"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombres
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

  },

  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descripcion
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  
  {
    accessorKey: "discount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descuento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const discount = row.getValue("discount") as number;
      const formattedDiscount = `${(discount)}%`;
      return <div>{formattedDiscount}</div>;
    },
  },

  {
    accessorKey: "start_date",
    header: "Fecha de inicio",
    cell: ({ row }) => {
      const startDate = row.getValue("start_date") as string;
      return <div>{startDate}</div>;
    },
  },
  {
    accessorKey: "ending_date",
    header: "Fecha de finalización",
    cell: ({ row }) => {
      const endDate = row.getValue("ending_date") as string;
      return <div>{endDate}</div>;
    },
  },

  {
    id: "edit",
    enableHiding: false,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const promotion = row.original;
      const [isPending, setIsPending] = useState(false);
      const [isOpen, setIsOpen] = useState(false);

      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Editar</Button>
          </DialogTrigger>
          <DialogContent className="gap-8">
            <DialogHeader>
              <DialogTitle>Editar Promocion</DialogTitle>
              <DialogDescription>
                En este formulario puedes editar la promocion
              </DialogDescription>
            </DialogHeader>
            <PromotionEdit
              setIsPending={setIsPending}
              setIsOpen={setIsOpen}
              promotion={promotion}
            />
            <DialogFooter className="flex sm:justify-between gap-4">
              <DialogClose asChild>
                <Button className="w-full" variant="outline">
                  Cerrar
                </Button>
              </DialogClose>
              <Button
                className="w-full"
                disabled={isPending}
                type="submit"
                form="edit-user-form"
              >
                {isPending && (
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Guardar cambios
                <span className="sr-only">Editar nueva promocion</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },

  {
    id: "delete",
    enableHiding: false,
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const promotion = row.original;
      const idpromotion = promotion.id;
      const [isPending, setIsPending] = useState(false);
      const [isOpen, setIsOpen] = useState(false);
      const [error, setError] = useState<string | null>(null);

      const handleOpen = () => setIsOpen(true);
      const handleClose = () => setIsOpen(false);

      const handleDeletePromotion = async () => {
        setIsPending(true);

        try {
          const response = await api.delete(`promotions/delete/${idpromotion}`);
          if (response.status === 204) {
            console.log("Promocion eliminada exitosamente.");
            // Actualizar datos localmente aquí
            queryClient.invalidateQueries("promocion");
          } else {
            console.error(
              "Error al eliminar la promoción. Estado de respuesta:",
              response.status
            );
          }
        } catch (error: any) {
          console.error("Error general:", error);

          if (error.response && error.response.status === 400) {
            console.log(
              "La promoción no se puede eliminar. Estado de respuesta:",
              error.response.status
            );

            setError(
              "No se puede eliminar porque tiene productos relacionados"
            );
          } else if (error.response) {
            console.error(
              "Error en la respuesta del servidor:",
              error.response.data
            );
          } else if (error.request) {
            console.error(
              "No se recibió respuesta del servidor:",
              error.request
            );
          } else {
            console.error(
              "Error durante la configuración de la solicitud:",
              error.message
            );
          }
        } finally {
          setIsPending(false);
        }
      };

      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Eliminar</Button>
          </AlertDialogTrigger>
          <form id="delete-user-form" className="space-y-7 w-[97%] p-[0.2rem]">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Eliminar Promoción</AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Estás seguro de que quieres eliminar esta promoción?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex sm:justify-between gap-4">
                <AlertDialogCancel className="w-full" onClick={handleClose}>
                  Cancelar
                </AlertDialogCancel>
                <Button
                  className="w-full"
                  disabled={isPending}
                  variant="destructive"
                  type="submit"
                  form="add-user-form"
                  onClick={handleDeletePromotion}
                >
                  {isPending && (
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  Eliminar
                  <span className="sr-only">Agregar nueva promoción</span>
                </Button>
              </AlertDialogFooter>
              {error && <div className="text-destructive mt-2">{error}</div>}
            </AlertDialogContent>
          </form>
        </AlertDialog>
      );
    },
  },
];
