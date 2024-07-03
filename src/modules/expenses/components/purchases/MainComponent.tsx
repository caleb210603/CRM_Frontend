// MainComponent.tsx
import { useState, useEffect } from "react";
import { ItemDataTable } from "./ItemDataTable";
import { PurchaseActions } from "./PurchaseActions";
import { PurchaseDetail } from '@/types/purchase';
import { PurchaseForm } from "./PurchaseForm";

export function MainComponent() {
  const [items, setItems] = useState<PurchaseDetail[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);

  useEffect(() => {
    // Calcular la suma total cada vez que la lista de items cambie
    const sum = items.reduce((acc, item) => acc + item.total, 0);
    setTotalSum(sum);
  }, [items]);

  const handleDeleteItem = (name: string) => {
    setItems(items.filter(item => item.item !== name));
  };

  return (
    <>
    <div className="flex flex-col mt-10">
      <h1 className="text-3xl font-bold">Nueva Compra</h1>
      <p className="text-muted-foreground mt-2">Agrega los productos que compraste y llena el formulario de compra para registrar tu compra y llevar un control de tus gastos en el negocio</p>
    </div>
      <div className="flex flex-col md:flex-row justify-center mt-10">
      <div className="w-full md:w-1/2 mr-0 md:mr-10">
          <PurchaseActions onItemsChange={setItems} />
          <ItemDataTable data={items} handleDelete={handleDeleteItem} isLoading={false} />
          <p className="text-right mt-5 font-bold">TOTAL: {totalSum}</p>
          </div>
          <div className="w-full md:w-1/2 bg-background">
            <PurchaseForm>    
            </PurchaseForm>
          </div>
      </div>
    </>
  );
}
