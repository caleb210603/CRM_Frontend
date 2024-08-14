import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductoSchema } from "@/lib/validators/product";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "react-query";
import { Product } from "@/types/product";
import { z } from "zod";
import Dropzone from "react-dropzone";
import api from "@/services/api";
import { toast } from "@/hooks/useToast";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/store";

import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { categoryColors } from "@/lib/utils";
import { MousePointerClick } from "lucide-react";
import { useState } from "react";
import { statusProduct } from "../config";


interface Props {
  mode: "create" | "update";
  product?: Product;
  setIsPending: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

export function ProductForm({ mode, setIsPending, setIsOpen, product }: Props) {
  const [draggedImage, setDraggedImage] = useState<string | File>(product?.image || "")
  const { categories } = useSelector((state: RootState) => state.categories);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof ProductoSchema>>({
    resolver: zodResolver(ProductoSchema),
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      stock: product?.stock,
      stock_security: product?.stock_security,
      barcode: product?.barcode,
      status: product?.status,
      category: product?.category,
      brand: product?.brand,
      rating: product?.rating,
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductoSchema>) => {

    if (!draggedImage) {
      return toast({
        description: "Falta agregar Imagen",
        variant: "destructive",
      });
    }

    setIsPending(true);

    const formData = new FormData();

    if (typeof draggedImage !== 'string') {

      formData.append('image', draggedImage)
    }

    Object.keys(values).forEach(key => {
      formData.append(key, values[key]);
    });

    if (mode === "create") {
      api.post("/products/create", formData)
        .then(response => {
          const { status } = response;
          console.log({ res: status });
          if (status >= 400) {
            toast({
              description: "Error al crear Producto",
              variant: "destructive",
            });
          } else {
            setIsOpen(false);
            toast({ description: "Producto creado correctamente" });
            queryClient.invalidateQueries("products");
          }
        })
        .catch(error => {
          console.error("Error en la solicitud:");
          const { response: { data } } = error
          let message = "";
          for (const key in data) {
            console.log(key + ": " + data[key]);
            message += `${data[key][0]}\n`
          }

          toast({
            description: message,
            variant: "destructive",
          });
          setIsPending(false);
          return
        });
    } else {
      api.patch(`/products/update/${product?.id}`, formData)
        .then(response => {
          const { status } = response;

          if (status >= 400) {
            toast({
              description: "Error al editar Producto",
              variant: "destructive",
            });
          } else {
            setIsOpen(false);
            toast({ description: "Producto editado correctamente" });
            queryClient.invalidateQueries("products");
          }
        })
        .catch(error => {
          console.error("Error en la solicitud:", error);
          // Maneja el error de manera adecuada aquí, si es necesario
        });
    }

    setIsPending(false);

  };

  const handleImageUpload = (file: File) => setDraggedImage(file)

  const filteredCategories = categories.filter(category => category.type_category === 0);


  return (
    <div className="flex gap-4 ">
      {(
        <div className="w-1/2 flex h-[500px]">

          <Dropzone onDrop={(acceptedFiles) => handleImageUpload(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <section className="h-full w-[99%] border-2 rounded-sm">
                <div
                  {...getRootProps()}
                  className="group h-full relative transition-all duration-300 bg-background
        rounded-sm text-center flex justify-center items-center overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 flex flex-col items-center justify-center gap-4 w-full h-full
        bg-foreground/30 dark:bg-background/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MousePointerClick className="h-20 w-20 text-white/50" />
                    <p className="text-white/50 px-20">
                      Arrastre y suelte algunos archivos aquí o haga clic para
                      seleccionar archivos
                    </p>
                  </div>
                  <input {...getInputProps()} />
                  {draggedImage != "" && <img
                    src={typeof draggedImage === 'string'
                      ? draggedImage
                      : URL.createObjectURL(draggedImage)}
                    alt={product?.name}
                    className="w-full h-full object-cover max-w-[400px] max-h-[330px] duration-700 ease-in-out"
                  />}
                </div>
              </section>
            )}
          </Dropzone>

        </div>
      )}

      <div className="w-1/2 ">
        <ScrollArea className="h-[500px] w-full">
          <Form {...form}>
            <form
              id="add-product-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-7 w-[97%] p-[0.2rem]"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input placeholder="Descripción" {...field}
                        className="w-full" />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Precio</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          inputMode="decimal"
                          placeholder="Precio"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value) && value >= 1 && value <= Number.MAX_SAFE_INTEGER) {
                              field.onChange(value);
                            } else {
                              field.onChange('');
                            }
                          }}
                          className="number-to-text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="barcode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Barcode</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Barcode" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Categoría</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`${!field.value && "text-muted-foreground"
                            } hover:text-accent-foreground`}
                        >
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredCategories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            <Badge
                              className={`${categoryColors[category.color]}`}
                            >
                              {category.name}
                            </Badge>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <div className="w-full flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <Input placeholder="5.2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          inputMode="numeric"
                          {...field}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (!isNaN(value) && value >= 1) {
                              field.onChange(value);
                            } else {
                              field.onChange('');
                            }
                          }}
                          placeholder="Cantidad de productos"
                          className="number-to-text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              <FormField
                control={form.control}
                name="stock_security"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Stock security</FormLabel>
                    <FormControl>

                      <Input
                        type="number"
                        inputMode="numeric"
                        {...field}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          if (!isNaN(value) && value >= 1) {
                            field.onChange(value); // Actualiza el valor del campo con el valor numérico
                          } else {
                            field.onChange(''); // Permite borrar completamente el input
                          }
                        }}
                        placeholder="Cantidad de productos"
                        className="number-to-text"
                      />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Estado</FormLabel>
                    <Select
                      defaultValue={(field.value != undefined) ? field.value.toString() : ""}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`${!field.value && "text-muted-foreground"
                            } hover:text-accent-foreground`}
                        >
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusProduct.map((values) => (
                          <SelectItem
                            key={values.id}
                            value={values.id.toString()}
                          >
                            {values.name}
                          </SelectItem>

                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="brand" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </form>

          </Form>
        </ScrollArea>
      </div>
    </div>
  );
}