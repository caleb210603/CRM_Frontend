import { useState, ChangeEvent, useEffect, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ComboboxMulti } from "./ui/comboBoxMulti";
import { Slider } from "../components/ui/slider";
import { Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { getCategories } from "@/store/categories/thunk";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { categoryColors } from "@/lib/utils";
import { CategoriaDetail } from "@/types/auth";
import { setCategories } from "@/store/categories";

interface PropFilters {
  categoryIds: number[]
  minValue: number
  maxValue: number
  max?: number
}


interface PropFilterInventory {
  onFilter: Dispatch<SetStateAction<PropFilters>>
  activeTab: string
  filter: PropFilters

}


export const FilterInventory = ({
  onFilter,
  activeTab,
  filter
}: PropFilterInventory) => {
  const [minValue, setMinValue] = useState<number>(filter.minValue);
  const [maxValue, setMaxValue] = useState<number>(filter.maxValue);
  const [selectedCategories, setSelectedCategories] = useState<CategoriaDetail[]>([]);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleRemoveCategory = (categoria: CategoriaDetail) => {
    const updatedCategories = selectedCategories.filter((c) => c.id !== categoria.id);
    setSelectedCategories(updatedCategories);
    const categoryIds = updatedCategories.map(category => category.id)
    onFilter({ categoryIds, minValue, maxValue });

  };

  const handleSelectCategory = (categoryName: string[]) => {
    const updatedCategories = categories.filter((category) => categoryName.includes(category.name.toLocaleLowerCase()));
    setSelectedCategories(updatedCategories);
  };

  const handleMinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinValue(Number(e.target.value));
  };

  const handleMaxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxValue(Number(e.target.value));
  };

  const handleSliderChange = (newValues: number[]) => {
    setMinValue(newValues[0]);
    setMaxValue(newValues[1]);
    console.log("change", { minValue, maxValue })
  };

  const handleFilterClick = () => {
    setOpen(false)
    console.log("submit", { minValue, maxValue })
    const categoryIds = selectedCategories.map(category => category.id)
    onFilter({ categoryIds, minValue, maxValue })
  };

  const showModal = () => {
    if (open === true) {
      setMaxValue(filter.maxValue)
      setMinValue(filter.minValue)
      const a = categories.filter(item => filter.categoryIds.includes(item.id));
      setSelectedCategories(a)
    }
    setOpen(!open)
  }



  return (
    <div className="flex justify-between mt-4 2xl:mt-0 gap-4">
      <div className="flex gap-3 items-center justify-center">
        <Input
          className="w-16"
          id="Min"
          value={filter.minValue.toString()}
          readOnly
          disabled
        />
        -
        <Input
          className="w-16"
          id="Max"
          value={filter.maxValue.toString()}
          readOnly
          disabled
        />

      </div>

      <ScrollArea className="w-full max-w-[20rem] mt-1">
        <div className="flex items-center gap-5 ">
          {
            filter.categoryIds?.map((id, index) => {
              const categoria = categories.find(
                (c) => c.id === id
              );
             
              const categoriaColor = categoria ? categoria.color : 0;
              return (
                <Badge
                  key={index}
                  className={`${categoryColors[categoriaColor]} `}
                >
                  {categoria?.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(categoria!)}
                    className="ml-1"
                  >
                    <X className="w-4" />
                  </button>
                </Badge>
              );
            })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>


      <Dialog open={open} onOpenChange={showModal}>
        <DialogTrigger asChild>
          <Button>
            Filter <Filter className="ml-2"></Filter>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Categoria:</DialogTitle>
          </DialogHeader>
          <ComboboxMulti
            onSelectCategory={handleSelectCategory}
            categorias={categories}
            selectedCategories={selectedCategories}
          />


          {activeTab === "products" && (
            <>
              <DialogHeader>
                <DialogTitle>Precio:</DialogTitle>
              </DialogHeader>

              <Slider
                defaultValue={[filter.minValue, filter.maxValue]}
                onValueChange={handleSliderChange}
                max={1000}
              />

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-5 gap-5">
                  <div className="col-span-2 flex items-center">
                    <Input
                      id="Min"
                      defaultValue={filter.minValue}
                      value={minValue.toString()}
                      onChange={handleMinInputChange}
                    />
                  </div>
                  <div className="flex items-center justify-center col-span-1">
                    <span className="text-center">-</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <Input
                      id="Max"
                      defaultValue={filter.maxValue}
                      value={maxValue}
                      onChange={handleMaxInputChange}
                    />
                  </div>
                </div>
              </div>
            </>)}

          <DialogFooter>
            <Button type="button" onClick={handleFilterClick}>
              Filtrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
