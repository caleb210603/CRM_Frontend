import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/useToast";
import { ClientSchema } from "@/lib/validators/client";
import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { useQueryClient } from "react-query";
import { useClientCreate } from "../hooks/useClientCreate ";
import Dropzone from "react-dropzone";
import { ImagePlus, MousePointerClick } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

interface Props {
  setIsPending: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

export function ClientForm({ setIsPending, setIsOpen }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState("")
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof ClientSchema>>({
    resolver: zodResolver(ClientSchema),
    defaultValues: {
      name: "",
      lastname: "",
      document_type: 0,
      document_number: "",
      day: "",
      month: "",
      year: "",
      birthdate: "",
      email: "",
      gender: 0,
      phone: "",
      address: "",
      postal_code:"",
      country: "",
      province: "",
      district: "",
    },
  });

  const { createClientMutation } = useClientCreate();

  const { mutate, isLoading } = createClientMutation();

  const onSubmit = async (values: z.infer<typeof ClientSchema>) => {
    setIsPending(true);
    try {
       // Combinar los valores de día, mes y año para formar la fecha de nacimiento
    const { day, month, year, ...rest } = values;
    // Formato de la fecha de nacimiento.
    const birthdate = `${values.year}-${values.month}-${values.day}`;
    // Crear un nuevo objeto de datos que incluye la fecha de nacimiento combinada
    const data = { ...rest, birthdate };

    // Crear un objeto FormData
    const formData = new FormData();
    formData.append("active", "1");
    // Agregar cada campo del formulario al objeto FormData
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    // Agregar la imagen de perfil si está presente
    if (file) {
      formData.append("image", file);
    }

      await mutate(formData);
      setIsOpen(false);
    } finally {
      setIsPending(false);
    }
  };

  const showError = (errorMessage: string, second: number) => {
    setFileError(errorMessage);
    setTimeout(() => {
      setFileError('');
    }, second*1000); // Ocultar el error después de los segundos que quieras
  };


  const handleDrop = (acceptedFiles: File[]) => {
    try {
      // Verificar que se haya seleccionado al menos un archivo
      if (acceptedFiles.length === 0) {
        showError("Por favor, seleccione un archivo.", 3)
        throw new Error("Por favor, seleccione un archivo.");
      }
  
      // Obtener el primer archivo seleccionado
      const selectedFile = acceptedFiles[0];
  
      // Verificar si el archivo no es una imagen
      if (!selectedFile.type.startsWith("image/")) {
        showError("El archivo seleccionado no es una imagen.", 3)
        throw new Error("El archivo seleccionado no es una imagen.");
      }
  
      // Verificar que el tamaño del archivo no sea mayor a 2 MB
      const maxSize = 1.2 * 1024 * 1024; // Tamaño máximo en bytes (1.2 MB)
      if (selectedFile.size > maxSize) {
        showError("El tamaño del archivo seleccionado es demasiado grande. Por favor, seleccione un archivo más pequeño.", 5)
        throw new Error("El tamaño del archivo seleccionado es demasiado grande. Por favor, seleccione un archivo más pequeño.");
      }

          // Obtener la URL del archivo seleccionado
          const previewUrl = URL.createObjectURL(selectedFile);
  
          setPreviewUrl(previewUrl);
          // Guardar el archivo seleccionado en el estado
          setFile(selectedFile);
        
    } catch (error) {
      console.log("Error al procesar el archivo:", error);
    }
  };

  useEffect(() => {
    console.log(file); // Imprime el valor actualizado de 'file' cada vez que cambia
  }, [file]);


  return (
    <ScrollArea className="max-h-[550px] pl-4">
      <Form {...form}>
        <form
          id="add-user-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 w-[97%] p-[0.2rem]"
        >
        <div className="w-1/2 flex flex-col h-[100%] w-[100%] relative">
        <FormLabel className="text-base font-semibold text-white-700">
            Foto de Perfil <span className="text-sm text-gray-500">(Opcional)</span>
          </FormLabel>
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="h-full mx-auto rounded-full flex-initial object-cover cursor-pointer mt-4">
                <input {...getInputProps()} />
                  <div className="group h-full relative transition-colors duration-300 bg-background rounded-full text-center flex justify-center items-center overflow-hidden border-dashed hover:border-solid border-2 border-accent hover:border-primary">
                  <div className="absolute top-0 left-0 flex flex-col items-center justify-center gap-4 w-full h-full bg-foreground/30 dark:bg-background/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <MousePointerClick className="h-18 w-18 text-white/50" />
                      <p className="text-white/50 px-7">
                        Haga click o arrastre para cambiar imagen
                      </p>
                  </div>
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        className="rounded-full w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 flex-initial object-cover"
                        style={{ objectFit: "cover" }}
                        alt="Foto de perfil"
                      />
                     ) : (
                  <div>
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="mx-auto rounded-full w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 flex-initial object-cover ">
                      <AvatarFallback className="text-3xl flex items-center justify-center h-full">
                      <ImagePlus className="h-8 w-8 text-white/80"/>
                      </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  )}
                 </div>
              </div>
              )}
            </Dropzone>

            <div className="flex justify-center">
              {previewUrl && (
                <button
                  type="button"
                  className="w-[60%] transform bg-blue-600 text-white py-2 rounded-lg mt-4"
                  onClick={() => {
                    setFile(null); 
                    setPreviewUrl(null);
                  }}
            >
              Quitar Imagen
            </button>
              )}
            </div>
      
          <FormLabel>
            {fileError && (
              <div className="mt-2 text-red-500 text-sm">{fileError}</div>
            )}
          </FormLabel>
      </div>
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input placeholder="Apellidos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="">
          <FormLabel>Fecha de nacimiento</FormLabel>
          <div className="flex justify-between gap-4 mt-2">
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input 
                    placeholder="Día" 
                    onChange={(e) => {
                      let value = e.target.value;
                      // Verificar si el valor es vacío o tiene menos de 2 dígitos y si es un número
                      if (!value || (value !== '0' && value.length < 2 && /^\d*$/.test(value))) {
                        // Agregar un 0 al principio del valor si solo tiene un dígito y no es '0'
                        value = value ? `0${value}` : ''; // Agregar el 0 solo si hay un valor
                      } else if (value.length > 2) {
                        // Si hay más de 2 dígitos, eliminar el primer dígito
                        value = value.substring(1);
                      }
                      field.onChange(value);
                    }}
                    value={field.value}
                    maxLength={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={(value) => field.onChange(String(value))}
                    value={String(field.value) || "default"}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${
                          !field.value && "text-muted-foreground"
                        } hover:text-accent-foreground`}
                      >
                        <SelectValue placeholder="Mes" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="default" disabled hidden>Mes</SelectItem>
                      <SelectItem value="01">Enero</SelectItem>
                      <SelectItem value="02">Febrero</SelectItem>
                      <SelectItem value="03">Marzo</SelectItem>
                      <SelectItem value="04">Abril</SelectItem>
                      <SelectItem value="05">Mayo</SelectItem>
                      <SelectItem value="06">Junio</SelectItem>
                      <SelectItem value="07">Julio</SelectItem>
                      <SelectItem value="08">Agosto</SelectItem>
                      <SelectItem value="09">Septiembre</SelectItem>
                      <SelectItem value="10">Octubre</SelectItem>
                      <SelectItem value="11">Noviembre</SelectItem>
                      <SelectItem value="12">Diciembre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input 
                    placeholder="Año"
                    {...field} 
                    maxLength={4}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          </div>
          <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Sexo</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={String(field.value) || "default"}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${
                          !field.value && "text-muted-foreground"
                        } hover:text-accent-foreground`}
                      >
                        <SelectValue placeholder="Sexo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Mujer</SelectItem>
                      <SelectItem value="1">Hombre</SelectItem>
                      <SelectItem value="2">Prefiero no decirlo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="document_type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tipo identificación</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={String(field.value) || "default"}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${
                          !field.value && "text-muted-foreground"
                        } hover:text-accent-foreground`}
                      >
                        <SelectValue placeholder="Seleccione un tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">DNI</SelectItem>
                      <SelectItem value="1">Cedula</SelectItem>
                      <SelectItem value="2">Pasaporte</SelectItem>
                      <SelectItem value="3">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="document_number"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nº identificación</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Número de documento"
                      onInput={(e) =>
                        (e.currentTarget.value = e.currentTarget.value.replace(
                          /[^0-9.]/g, ""
                        ))
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <Input placeholder="País" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Provincia/Región</FormLabel>
                  <FormControl>
                    <Input placeholder="Provincia/Región" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Distrito</FormLabel>
                  <FormControl>
                    <Input placeholder="Distrito" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Código Postal</FormLabel>
                  <FormControl>
                    <Input placeholder="Código postal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input placeholder="Dirección" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Numero</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      pattern="^\d{1,9}$"
                      placeholder="Numero de celular"
                      onInput={(e) =>
                        (e.currentTarget.value = e.currentTarget.value.replace(
                          /[^\d]/g,
                          ""
                        ))
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} 
            />
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
}
