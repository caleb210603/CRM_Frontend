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
import { Provider } from "@/types/purchase";
import { ProviderSchema } from "@/lib/validators/provider";
import { ProviderEditForm } from "./ProviderEditForm";

interface Props {
  provider: Provider;
  setIsOpen: (value: boolean) => void;
}

export function ProviderDetail({ provider, setIsOpen }: Props) {
  const [edit, setEdit] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const handleCancelUpdate = () => {
    setEdit(true);
    form.reset();
  };

  const form = useForm<z.infer<typeof ProviderSchema>>({
    resolver: zodResolver(ProviderSchema),
    defaultValues: {
      name: provider.name,
      ruc: +provider.ruc,
      person_contact: provider.person_contact,
      phone: provider.phone,
      email: provider.email,
      address: provider.address,
      note: provider.note,
    },
  });

  const handleDeleteProvider = async (provider: Provider) => {
    setIsPending(true);
    try {
      const { status } = await api.delete(`/providers/delete/${provider.id}`);

      status === 204 &&
        toast({
          title: "Proveedor eliminado exitosamente",
        });

      queryClient.invalidateQueries("providers");
      setIsOpen(false);
    } catch (error) {

      toast({
        title: "Error al eliminar proveedor",
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
      <SheetTitle>Información del usuario</SheetTitle>
      <div className="pt-8">
        <div className="flex flex-col items</ResizablePanel>-center gap-1">
          <p className="flex flex-col items-center mb-[0.5rem] mt-3">
            {provider.name} {provider.ruc}
          </p>
          <ProviderEditForm
            edit={edit}
            provider={provider}
            form={form}
            setIsOpen={setIsOpen}
            setIsPending={setIsPending}
          />
        </div>
      </div>
      {edit ? (
        <SheetFooter className="mt-8 md:mt-0 sm:justify-center">
          <div className="flex justify-center">
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
                onClick={() => handleDeleteProvider(provider)}
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
                form="update-provider-form"
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
