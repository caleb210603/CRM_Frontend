import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { categoryColors, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CategoriaDetail } from "@/types/auth";
import { Badge } from "./badge";

type ComboboxMultiProps = {
  onSelectCategory: (selectedCategories: string[]) => void;
  categorias: CategoriaDetail[];
  selectedCategories: CategoriaDetail[];
};
export function ComboboxMulti({
  onSelectCategory,
  categorias,
  selectedCategories
}: ComboboxMultiProps) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState<string[]>(selectedCategories.map(item => item.name.toLocaleLowerCase()));

  const handleSelect = (selectedValue: string) => {
    const newValue = [...values];
    const index = newValue.indexOf(selectedValue);

    if (index === -1) {
      newValue.push(selectedValue.toLocaleLowerCase());
    } else {
      newValue.splice(index, 1);
    }
    setValues(newValue);
    onSelectCategory(newValue);
  };

  const handlePopoverToggle = () => {
    setOpen(!open);
  };

  const selectedLabels = values.map(
    (value) => {
      return categorias.find((categoria) => categoria.name.toLowerCase() === value.toLocaleLowerCase())?.name || ""
    }
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100%] justify-between"
          onClick={handlePopoverToggle}
        >
          {selectedLabels.length > 0
            ? selectedLabels.join(", ")
            : "Selecciona las categorias..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Busca las categorias..." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            {categorias.map((categoria) => (
              <CommandItem
                key={categoria.id}
                value={categoria.name}
                onSelect={(currentValue) => {
                  handleSelect(currentValue);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    values.includes(categoria.name.toLocaleLowerCase())
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                <Badge className={`${categoryColors[categoria.color]}`}>
                  {categoria.name}
                </Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
