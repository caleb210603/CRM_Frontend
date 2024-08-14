import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ProviderForm } from "./ProviderForm";

export function ProviderActions() {
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Crear Proveedor</Button>
      </DialogTrigger>
      <DialogContent className="gap-8">
        <DialogHeader>
          <DialogTitle>Nuevo Proveedor</DialogTitle>
          <DialogDescription>
            En este formulario puedes crear un nuevo proveedor
          </DialogDescription>
        </DialogHeader>
        <ProviderForm setIsPending={setIsPending} setIsOpen={setIsOpen} />
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
            form="add-prov-form"
          >
            {isPending && (
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Agregar
            <span className="sr-only"> Agregar nuevo cliente </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
