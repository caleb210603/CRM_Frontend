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
import { Provider } from "@/types/purchase";
import { ProviderSchema } from "@/lib/validators/provider";
import { ChangeEvent } from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  edit: boolean;
  provider: Provider | null;
  setIsPending: (value: boolean) => void;
  form: UseFormReturn<z.infer<typeof ProviderSchema>>;
  setIsOpen: (value: boolean) => void;
}

export function ProviderEditForm({
  edit,
  provider,
  setIsPending,
  form,
  setIsOpen,
}: Props) {
  const queryClient = useQueryClient();

  const onSubmit = async (values: z.infer<typeof ProviderSchema>) => {
    setIsPending(true);
    try {
      const updatedProviderData = { ...values };
      console.log(updatedProviderData);

      const { status } = await api.put(
        `/providers/update/${provider?.id}`,
        updatedProviderData
      );
      status === 200
        ? toast({ title: "Proveedor editado" })
        : toast({ title: "Error al editar", variant: "destructive" });

      queryClient.invalidateQueries("providers");
      setIsOpen(false);
    } catch (error) {
      toast({ title: "Error al editar proveedor", variant: "destructive" });
    } finally {
      setIsPending(false);
    }
  };

  const handleNumericInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    e.target.value = numericValue;
  };

  return (
    <ScrollArea className="h-[500px] w-[460px]">
      <Form {...form}>
        <form
          id="update-provider-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 w-[98%] p-[0.4rem] pb-20"
        >
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={edit} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ruc"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>R.U.C.</FormLabel>
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
            name="person_contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contacto</FormLabel>
                <FormControl>
                  <Input {...field} disabled={edit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Numero</FormLabel>
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
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={edit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Direccion</FormLabel>
                <FormControl>
                  <Input {...field} disabled={edit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nota</FormLabel>
                <FormControl>
                  <Input {...field} disabled={edit} />
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
