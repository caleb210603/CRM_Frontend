import { useState } from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Provider as BaseProvider } from "@/types/purchase";
import { Button } from "@/components/ui/button";
import { ProviderDetail } from "../ProviderDetail";

interface ExtendedProvider extends BaseProvider {
  role_auth: number;
}

export const ActionsCell = ({ provider }: { provider: ExtendedProvider }) => {
  const [open, setIsOpen] = useState(false);

  if (provider.role_auth === 1) {
    return (
      <Sheet open={open} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Ver</Button>
        </SheetTrigger>
        <ProviderDetail provider={provider} setIsOpen={setIsOpen} />
      </Sheet>
    );
  } else {
    return null;
  }
};
