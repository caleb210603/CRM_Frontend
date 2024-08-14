import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { ProviderSchema } from "@/lib/validators/provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { useQueryClient } from "react-query";
import { ChangeEvent, useState } from "react";

interface Props {
  setIsPending: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

export const ProviderForm = ({ setIsOpen }: Props) => {
  const form = useForm<z.infer<typeof ProviderSchema>>({
    resolver: zodResolver(ProviderSchema),
    defaultValues: {
      name: "",
      ruc: 0,
      person_contact: "",
      phone: "",
      email: "",
      address: "",
      note: "",
    },
  });

  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const [successPost, setSuccessPost] = useState(false);
  const [errorPost, setErrorPost] = useState(false);
  const queryClient = useQueryClient();

  const onSubmit = async (data: z.infer<typeof ProviderSchema>) => {
    try {
      setIsOpenTwo(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await api.post("/providers", data);
      if (response.status === 201) {
        queryClient.invalidateQueries("providers");
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

  const handleNumericInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    e.target.value = numericValue;
  };

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <p className="font-bold">Registro de Proveedor</p>
      <ScrollArea className="max-h-[550px] pl-4">
        <Form {...form}>
          <form
            id="add-prov-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-7 w-[96%] p-[0.3rem]"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" type="string" {...field} />
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
                  <FormLabel>RUC</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="RUC"
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
              name="person_contact"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Persona de Contacto</FormLabel>
                  <FormControl>
                    <Input placeholder="Persona de Contacto" {...field} />
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
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Teléfono"
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
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Correo Electrónico"
                      type="email"
                      {...field}
                    />
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
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Dirección" {...field} minLength={8} />
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
                    <Input placeholder="Notas" {...field} />
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
