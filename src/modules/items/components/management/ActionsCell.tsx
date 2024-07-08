import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { ItemDetail } from "../ItemDetail";
import { PurchaseDetail as ItemType } from "@/types/purchase";

interface ExtendedItem extends ItemType {
  role_auth: number;
}

export const ActionsCell = ({ item }: {item: ExtendedItem}) => {
  const [open, setIsOpen] = useState(false);

  if (item.role_auth === 1) {
    return (
      <Sheet open={open} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Ver</Button>
        </SheetTrigger>
        <ItemDetail item={item} open={open} setIsOpen={setIsOpen} />
      </Sheet>
    );
  } else {
    return null;
  }
};