import { useState, useEffect } from "react";
import { PurchaseDetail } from '@/types/purchase';
import { PurchaseForm } from "./PurchaseForm";

export function MainComponent() {
  const [items, setItems] = useState<PurchaseDetail[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="flex flex-col mt-10">
      <h1 className="text-3xl font-bold">Nueva Compra</h1>
      <p className="text-muted-foreground mt-2">Agrega los productos que compraste y llena el formulario de compra para registrar tu compra y llevar un control de tus gastos en el negocio</p>
    </div>
      <div className="flex justify-center mt-10">
          <div className="w-full bg-background">
            <PurchaseForm setIsPending={setIsPending} setIsOpen={setIsOpen} />
          </div>
      </div>
    </>
  );
}
