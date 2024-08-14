import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { number, z } from "zod";
import {
  CategoriaDetail,
  CategoriaDetail as CategoriaDetailType,
} from "@/types/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoriaSchema } from "@/lib/validators/categoria";
import { useState } from "react";
import { useTheme } from "@/contexts/theme";

import { Badge } from "@/components/ui/badge";
import { useQueryClient } from "react-query";
import { categoryColors } from "@/lib/utils";
import { useCategoriaCreate } from "../../hooks/useCategoriaCreate";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface Props {
  setIsPending?: (value: boolean) => void;
  setCategoria?: (categorias: CategoriaDetail[]) => void;
  setIsOpen?: (value: boolean) => void;
  categoria?: CategoriaDetailType;
}

export function CategoriaForm({
  setIsPending = () => {},
  setIsOpen = () => {},
}: Props) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const [error, setError] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");
  const [tipo, setTipo] = useState<number | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
    form.setValue("name", e.target.value.trim());
  };
  
  const handleTipoChange = (value: string) => {
    const tipoValue = value === "producto" ? 0 : value === "servicio" ? 1 : null;
    setTipo(tipoValue);
    form.setValue('type_category', tipoValue!);
  };
  const form = useForm<z.infer<typeof CategoriaSchema>>({
    resolver: zodResolver(CategoriaSchema),
    defaultValues: {
      name: "",
      color: 0,
      description: "",
      type_category:0,
    },
  });

  const selectColor = (colorIndex: number) => {
    form.setValue("color", colorIndex);
    setSelectedColorIndex(colorIndex);
  };

  const queryClient = useQueryClient();

  const renderColorCircles = () => {
    const { theme } = useTheme();

    return (
      <div className="flex items-center mt-4 flex-col">
        <p className="text-center font-bold mb-2">Selecciona el color</p>
        <div className="flex">
          {categoryColors.map((color, index) => (
            <div
              key={index}
              className={`relative w-6 h-6 rounded-full mx-2  cursor-pointer ${color} ${
                selectedColorIndex === index ? "ring-2" : ""
              } ${
                theme === "light" && selectedColorIndex === index
                  ? "ring-black"
                  : "ring-white"
              }`}
              onClick={() => selectColor(index)}
            >
              {selectedColorIndex === index && (
                <svg
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white ${
                    theme === "light" ? "text-black" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="12"
                  height="12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  const hideColorField = true;

  const { createCategoriaMutation } = useCategoriaCreate();

  const { mutate, isLoading } = createCategoriaMutation();

  const onSubmit = async (values: z.infer<typeof CategoriaSchema>) => {
    setIsPending(true);

    try {
      await mutate(values);
      setIsOpen(false);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <ScrollArea className="max-h-[550px] pl-4">
      <Form {...form}>
        <form
          id="add-user-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 w-[97%] p-[0.2rem]"
        >
          <div className="flex justify-center">
            <Badge className={`${categoryColors[selectedColorIndex!]}`}>
              {form.getValues("name")}
            </Badge>
          </div>
          <div className="flex justify-center">{renderColorCircles()}</div>
          <div className="flex justify-between gap-4">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombres"
                        {...field}
                        onChange={handleNameChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2 pl-12">
              <FormField
                control={form.control}
                name="type_category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-4">
                        <Select
                          onValueChange={(value) => handleTipoChange(value)}
                          defaultValue={"producto"}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue  />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="producto">Producto</SelectItem>
                              <SelectItem value="servicio">Servicio</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>    
            {hideColorField ? null : (
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="color"
                          {...field}
                          readOnly
                          value={form.getValues("color").toString()}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="Descripción" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
      </Form>
    </ScrollArea>
  );
}
