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
  import { useState } from "react";
  import { PromotionForm } from "./PromotionForm";
  import { Loader2 } from "lucide-react";
  
  export function PromotionActions() {
    const [isPending, setIsPending] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-52">Crear</Button>
        </DialogTrigger>
        <DialogContent className="gap-8">
          <DialogHeader>
            <DialogTitle>Nueva Promocion</DialogTitle>
            <DialogDescription>
              En este formulario puedes crear una nueva promocion
            </DialogDescription>
          </DialogHeader>
          <PromotionForm
            setIsPending={setIsPending}
            setIsOpen={setIsOpen}
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
              form="add-user-form"
            >
              {isPending && (
                <Loader2
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Agregar
              <span className="sr-only">Agregar nueva categoria</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  