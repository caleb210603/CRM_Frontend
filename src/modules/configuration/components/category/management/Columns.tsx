import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { CategoriaDetail as CategoriaDetailType} from "@/types/auth";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, HandPlatter, Loader2,  ShoppingCart } from "lucide-react";
import { CategoriaEdit } from "../CategoryEdit";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useState } from "react";
import api from "@/services/api";
import { useQueryClient } from "react-query";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { Badge } from "@/components/ui/badge";
import { categoryColors } from "@/lib/utils";
import { Column } from '../../../../../types/kboard';

export const columns: ColumnDef<CategoriaDetailType>[] = [
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
    cell: ({ row }) => {
      const colorIndex = row.getValue("color") as number;

      const categoryName = row.getValue("name") as string;

      return (
        <Badge className={`${categoryColors[colorIndex]}`}>
          {categoryName}
        </Badge>
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
    cell: ({ row }) => <div className="2xl:w-72">{row.getValue("description")}</div>,
  },
  
  {
    accessorKey:"type_category",
    header:({column})=>{
      return(
        <div className="text-center">
          
        </div>
      );
    },
    cell: ({ row }) => {
      const selectedType = row.getValue("type_category");
      return (
        <div className="flex-items-center">
          {selectedType === 0 ? (
            <>
              <ShoppingCart />
            </>
          ) : (
            <>
              <HandPlatter /> 
            </>
          )}
        </div>
      );
    }
  },

  {
    accessorKey: "products_related",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Productos Relacionados
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="ml-11">{row.getValue("products_related")}</div>;
    },
  },

  {
    accessorKey: "color",
    header: ({ column }) => {
      return (
        <Button
          className="hidden"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Color
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="hidden">{row.getValue("color")}</div>;
    },
  },

  {
    id: "edit",
    enableHiding: false,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const categoria = row.original;
      const [isPending, setIsPending] = useState(false);
      const [isOpen, setIsOpen] = useState(false);

      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Editar</Button>
          </DialogTrigger>
          <DialogContent className="gap-8">
            <DialogHeader>
              <DialogTitle>Editar Categoria</DialogTitle>
              <DialogDescription>
                En este formulario puedes editar la categoria
              </DialogDescription>
            </DialogHeader>
            <CategoriaEdit
              setIsPending={setIsPending}
              setIsOpen={setIsOpen}
              categoria={categoria}
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
                <span className="sr-only">Editar nuevo categoria</span>
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
      const categoria = row.original;
      const idcategoria = categoria.id;
      const [isPending, setIsPending] = useState(false);
      const [isOpen, setIsOpen] = useState(false);
      const [error, setError] = useState<string | null>(null);

      const handleOpen = () => setIsOpen(true);
      const handleClose = () => setIsOpen(false);

      const handleDeleteCategoria = async () => {
        setIsPending(true);

        try {
          const response = await api.delete(`categories/delete/${idcategoria}`);
          if (response.status === 204) {
            console.log("Categoría eliminada exitosamente.");
            // Actualizar datos localmente aquí
            queryClient.invalidateQueries("categoria");
          } else {
            console.error(
              "Error al eliminar la categoría. Estado de respuesta:",
              response.status
            );
          }
        } catch (error: any) {
          console.error("Error general:", error);

          if (error.response && error.response.status === 400) {
            console.log(
              "La categoría no se puede eliminar. Estado de respuesta:",
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
                <AlertDialogTitle>Eliminar Categoría</AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Estás seguro de que quieres eliminar esta categoría?
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
                  onClick={handleDeleteCategoria}
                >
                  {isPending && (
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  Eliminar
                  <span className="sr-only">Agregar nuevo categoria</span>
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
