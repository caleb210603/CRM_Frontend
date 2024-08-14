import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PurchaseDetailSchema as ItemSchema } from "@/lib/validators/purchase";
import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQueryClient } from "react-query";

interface Props {
  setIsPending: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

export const ItemForm = ({ setIsOpen }: Props) => {
  const form = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      item: "",
      description: "",
      quantity: 1,
      price: 0,
      total: 0,
    },
  });

  const [updateTotal, setUpdateTotal] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const [successPost, setSuccessPost] = useState(false);
  const [errorPost, setErrorPost] = useState(false);
  const queryClient = useQueryClient();

  const onSubmit = async (data: z.infer<typeof ItemSchema>) => {
    try {
      const date_purchase = new Date().toISOString().slice(0, 10);
      setIsOpenTwo(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await api.post("detailpurchases/create", {
        item: data.item,
        description: data.description,
        quantity: data.quantity,
        price: data.price,

        date_purchase: date_purchase,
      });
      console.log(response);

      if (response.status === 201) {
        queryClient.invalidateQueries("items");
      }

      setSuccessPost(true);
    } catch (error) {
      console.log(error);
      setErrorPost(true);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsOpenTwo(false);
      setIsOpen(false);
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
    <div className="flex flex-col gap-4 max-w-md">
      <p className="font-bold">Crear Item</p>
      <ScrollArea className="max-h-[550px]">
        <Form {...form}>
          <form
            id="add-item-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 px-3"
          >
            <FormField
              control={form.control}
              name="item"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Item</FormLabel>
                  <FormControl>
                    <Input placeholder="Item" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="Descripción" {...field} />
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
                      placeholder="Cantidad"
                      {...field}
                      inputMode="numeric"
                      onInput={handleNumericInput}
                    />
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
                      placeholder="Precio"
                      inputMode="numeric"
                      onInput={handleNumericInput}
                      {...field}
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
                    <Input placeholder="Total" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </ScrollArea>
      <Dialog open={isOpenTwo} onOpenChange={setIsOpenTwo}>
        <DialogContent>
          {errorPost ? (
            <>
              <AlertCircle className="mx-auto h-20 w-20" />
              <DialogDescription className="mx-auto text-lg">
                Hubo un error al crear el artículo
              </DialogDescription>
            </>
          ) : !successPost ? (
            <>
              <Loader2 className="mx-auto h-20 w-20 animate-spin" />
              <DialogDescription className="mx-auto text-lg">
                Creando item...
              </DialogDescription>
            </>
          ) : (
            <>
              <Check className="mx-auto h-20 w-20" />
              <DialogDescription className="mx-auto text-lg">
                Item creado exitosamente
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
