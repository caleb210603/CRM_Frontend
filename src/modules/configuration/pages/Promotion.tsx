import { useTitle } from "@/hooks/useTitle";
import api from "@/services/api";
import { useQuery } from "react-query";
import { Separator } from "@/components/ui/separator";
import { PromotionDataTable } from "../components/promotion/PromotionDataTable";
import { getPromotions } from "@/services/fetch";



export function Promociones() {
  useTitle("Promociones");
  const { data: promotions, isLoading } = useQuery("promocion", getPromotions);

  return (
    <div className="space-y-6 py-6">
      <div>
        <h3 className="text-lg font-extrabold">Promociones</h3>
        <p className="text-sm text-muted-foreground">
          Organiza tu contenido: Explora tus promociones y encuentra lo que
          necesitas fácilmente.
        </p>
      </div>
      <Separator />
      <PromotionDataTable
        data={promotions ? promotions : []}
        isLoading={isLoading}
      />
    </div>
  );
}
