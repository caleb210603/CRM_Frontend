import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { toast } from "@/hooks/useToast";
import api from "@/services/api";
import { useQueryClient } from "react-query";
import { Item } from "@/types/purchase";
import { ItemSchema } from "@/lib/validators/item";
import { ChangeEvent, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  edit: boolean;
  item: Item | null;
  setIsPending: (value: boolean) => void;
  form: UseFormReturn<z.infer<typeof ItemSchema>>;
  setIsOpen: (value: boolean) => void;
}

export function ItemEditForm({
  edit,
  item,
  setIsPending,
  form,
  setIsOpen,
}: Props) {
  const queryClient = useQueryClient();
  const [updateTotal, setUpdateTotal] = useState(false);

  const onSubmit = async (values: z.infer<typeof ItemSchema>) => {
    setIsPending(true);
    const date_purchase = new Date().toISOString().slice(0, 10);
    
    try {
      const updatedProviderData = { ...values };

      const { status } = await api.put(`/detailpurchases/update/${item?.id}`, {
        purchase_id: item?.purchase_obj.id,
        date_purchase: date_purchase,
        quantity: updatedProviderData.quantity,
        price: updatedProviderData.price,
        description: updatedProviderData.description,
        item: updatedProviderData.item,
      });

      status === 200
        ? toast({ title: "Articulo editadoo" })
        : toast({ title: "Error al editar", variant: "destructive" });

      queryClient.invalidateQueries("items");

      setIsOpen(false);
    } catch (error) {
      toast({ title: "Error al editar el artículo", variant: "destructive" });
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (updateTotal) {
      const { price, quantity } = form.getValues();
      const total = (Number(price) || 0) * (Number(quantity) || 0);
      form.setValue("total", total);
      setUpdateTotal(false);
    }
  }, [updateTotal, form]);

  const handleNumericInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    e.target.value = numericValue;
    setUpdateTotal(true);
  };

  return (
    <ScrollArea className="h-[500px] w-[460px]">
      <Form {...form}>
        <form
          id="update-item-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 w-[98%] p-[0.4rem] pb-20"
        >
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="item"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={edit} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={edit}
                      onInput={handleNumericInput}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Input {...field} disabled={edit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={edit}
                    onInput={handleNumericInput}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="total"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Total</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </ScrollArea>
  );
}
