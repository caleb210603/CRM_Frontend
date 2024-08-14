import { useTitle } from "@/hooks/useTitle";
import { CategoriaActions } from "../components/category/CategoryActions";
import { CategoriaDataTable } from "../components/category/CategoryDataTable";
import api from "@/services/api";
import { useQuery } from "react-query";
import { Separator } from "@/components/ui/separator";

const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};

export function Categorias() {
  useTitle("Categorías");
  const { data: categories, isLoading } = useQuery("categoria", getCategories);

  return (
    <div className="space-y-6 py-6">
      <div>
        <h3 className="text-lg font-extrabold">Categorias</h3>
        <p className="text-sm text-muted-foreground">
          Organiza tu contenido: Explora tus categorías y encuentra lo que
          necesitas fácilmente.
        </p>
      </div>
      <Separator />
      <CategoriaDataTable
        data={categories ? categories : []}
        isLoading={isLoading}
      />
    </div>
  );
}
