import { Button } from "@/components/ui/button";
import { SheetContent, SheetFooter, SheetTitle } from "@/components/ui/sheet";

import { Pencil, Trash } from "lucide-react";

import { useState } from "react";
import api from "@/services/api";
import { toast } from "@/hooks/useToast";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "react-query";
import { Item } from "@/types/purchase";

import { ItemEditForm } from "./ItemEditForm";
import { ItemSchema } from "@/lib/validators/item";

interface Props {
  item: Item;
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

export function ItemDetail({ item, setIsOpen }: Props) {

  
  const [edit, setEdit] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const handleCancelUpdate = () => {
    setEdit(true);
    form.reset();
  };

  const form = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      item: item.item,
      description: item.description,
      quantity: item.quantity,
      price: +item.price,
      total: +item.total,
    },
  });

  const handleDeleteItem = async (item: Item) => {
    setIsPending(true);
    try {
      const { status } = await api.delete(`/detailpurchases/delete/${item.id}`);

      status === 204 &&
        toast({
          title: "Artículo eliminado exitosamente",
        });

      queryClient.invalidateQueries("items");
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error al eliminar artículo",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <SheetContent
      onCloseAutoFocus={() => setEdit(true)}
      className="w-[400px] sm:min-w-[500px]"
    >
      <SheetTitle>Información del Artículo</SheetTitle>

      <div className="flex flex-col items</ResizablePanel>-center gap-1">
        <p className="flex flex-col items-center mb-[0.5rem] mt-3 text-lg font-bold">
          {item.item}
        </p>
        <ItemEditForm
          edit={edit}
          item={item}
          form={form}
          setIsOpen={setIsOpen}
          setIsPending={setIsPending}
        />
      </div>

      {edit ? (
        <SheetFooter className="mt-8 md:mt-0 sm:justify-center">
          <div className="flex justify-center">
            {" "}
            <div className="flex gap-9">
              <Button
                onClick={(event) => {
                  setEdit(!edit);
                  event.preventDefault();
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button
                onClick={() => handleDeleteItem(item)}
                type="button"
                variant={"destructive"}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </SheetFooter>
      ) : (
        <SheetFooter className="mt-8 md:mt-1 sm:justify-center">
          <div className="flex justify-center">
            <div className="flex gap-9">
              <Button
                type="submit"
                form="update-item-form"
                disabled={isPending}
              >
                <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
                Aplicar
              </Button>
              <Button
                onClick={handleCancelUpdate}
                type="button"
                variant="outline"
              >
                <Trash className="mr-2 h-4 w-4" aria-hidden="true" />
                Cancelar
              </Button>
            </div>
          </div>
        </SheetFooter>
      )}
    </SheetContent>
  );
}
