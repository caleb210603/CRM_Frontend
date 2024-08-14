import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/useToast";
import { getInitials } from "@/lib/utils";
import { ClientSchema } from "@/lib/validators/client";
import api from "@/services/api";
import { ClientDetail as ClientDetailType } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Ban, Trash, Check, ShieldCheck, CircleEllipsis, MousePointerClick } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { z } from "zod";
import CLientDataEditable from "./ClientDataEditable";
import Dropzone from "react-dropzone";

interface Props {
  client: ClientDetailType;
}

export function ClientDetail({ client }: Props) {
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const handleCancelUpdate = () => {
    setEdit(true);
    setImageUrl("");
    form.reset();
  };
  
  const form = useForm<z.infer<typeof ClientSchema>>({
    resolver: zodResolver(ClientSchema),
    defaultValues: {
      name: client?.name,
      lastname: client?.lastname,
      document_type: client?.document_type,
      document_number: client?.document_number,
      birthdate: client?.birthdate,
      email: client?.email,
      gender: client?.gender,
      phone: client?.phone,
      address: client?.address,
      postal_code: client?.postal_code,
      province: client?.province,
      district: client?.district,
      country: client?.country,
      image: client.image,
    },
  });

  const showError = (errorMessage: string, second: number) => {
    setFileError(errorMessage);
    setTimeout(() => {
      setFileError('');
    }, second*1000); // Ocultar el error después de los segundos que quieras
  };

  const handleUpdateClient = async (client:ClientDetailType) => {
    let status: number;
    try {
      if (client.active) {
        ({ status } = await api.delete(`/clients/delete/${client?.id}`));
      } else {
        ({ status } = await api.patch(`/clients/update/${client?.id}`, {
          active: 1,
        }));
      }

      if (status >= 400) {
        toast({ title: "Error al actualizar cliente", variant: "destructive" });
      } else {
        toast({ title: "Cliente actualizado exitosamente" });
        queryClient.invalidateQueries("clients");
      }
    } catch (error) {
      toast({
        title: "Error durante la solicitud a la API",
        variant: "destructive",
      });
    }
  };

  const handleDrop = (acceptedFiles: File[]) => {
    try {
      if (acceptedFiles.length === 0) {
        showError("Por favor, seleccione un archivo.", 3);
        throw new Error("Por favor, seleccione un archivo.");
      }

      const selectedFile = acceptedFiles[0];

      if (!selectedFile.type.startsWith("image/")) {
        showError("El archivo seleccionado no es una imagen.", 3);
        throw new Error("El archivo seleccionado no es una imagen.");
      }

      const maxSize = 1.2 * 1024 * 1024; // Tamaño máximo en bytes (1.2 MB)
      if (selectedFile.size > maxSize) {
        showError("El tamaño del archivo seleccionado es demasiado grande. Por favor, seleccione un archivo más pequeño.", 5);
        throw new Error(
          "El tamaño del archivo seleccionado es demasiado grande. Por favor, seleccione un archivo más pequeño."
        );
      }

      const imageUrl = URL.createObjectURL(selectedFile);

      setFile(selectedFile);
      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
    }
  };

  return (
    <SheetContent
      onCloseAutoFocus={() => setEdit(true)}
      className="w-[400px] sm:min-w-[500px]"
    >
      <SheetTitle>Información del cliente</SheetTitle>
      <div className="pt-8">
        <div className="flex flex-col items</ResizablePanel>-center gap-1">
        {!edit && (
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="w-50 h-50 mx-auto rounded-full flex-initial object-cover cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <div className="group h-full w-full relative transition-colors duration-300 bg-background rounded-full text-center flex justify-center items-center overflow-hidden border-dashed hover:border-solid border-2 border-accent hover:border-primary">
                    <div className="absolute top-0 left-0 flex flex-col items-center justify-center gap-4 w-full h-full bg-foreground/30 dark:bg-background/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <MousePointerClick className="h-18 w-18 text-white/50" />
                      <p className="text-white/50 px-7">
                        Haga click o arrastre para cambiar imagen
                      </p>
                    </div>
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Imagen de perfil"
                        className="rounded-full w-48 h-48 object-cover"
                      />
                    ) : (
                      <Avatar className="mx-auto rounded-full w-48 h-48 flex-initial object-cover">
                        <AvatarImage src={typeof client.image === 'string' ? client.image : undefined} alt="image profile user" className="object-cover"/>
                         <AvatarFallback className="text-3xl">
                          {getInitials(client.name, client.lastname)}
                         </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              )}
            </Dropzone>
          )}
          <div>
            {fileError && (
              <div className="mt-2 text-red-500 text-sm">{fileError}</div>
            )}
         </div>
          {edit && (
            <Avatar className="mx-auto rounded-full w-48 h-48 flex-initial object-cover">
            <AvatarImage src={typeof client.image === 'string' ? client.image : undefined} alt="image profile user" className="object-cover"/>
            <AvatarFallback className="text-3xl">
              {getInitials(client.name, client.lastname)}
            </AvatarFallback>
          </Avatar>
          )}
          <p className="flex flex-col items-center mb-[0.5rem] mt-3">
            {client.name} {client.lastname}
            <span className="text-muted-foreground"></span>
          </p>

          <CLientDataEditable
            edit={edit}
            client={client}
            setIsPending={setIsPending}
            form={form}
            file={file}
            setFile={setFile}
          />
        </div>
      </div>
      <SheetFooter className="mt-8 md:mt-3 sm:justify-center gap-9">
        {edit ? (
          <>
            <Button
              onClick={(event) => {
                setEdit(!edit);
                event.preventDefault();
              }}
            >
              <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
              Editar
            </Button>
            <SheetClose>
              <Button
                onClick={() => handleUpdateClient(client)}
                type="button"
                variant={client.active ? "destructive" : "outline"}
              >
                {client.active ? (
                  <Trash className="mr-2 h-4 w-4" aria-hidden="true" />
                ) : (
                  <ShieldCheck className="mr-2 h-4 w-4" aria-hidden="true" />
                )}
                {client.active ? "Eliminar" : "Activar"}
              </Button>
            </SheetClose>
          </>
        ) : (
          <>
            <SheetClose>
              <Button
                type="submit"
                form="update-client-form"
                disabled={isPending}
              >
                <Check className="mr-2 h-4 w-4" aria-hidden="true" />
                Aplicar
              </Button>
            </SheetClose>
            <Button
              onClick={handleCancelUpdate}
              type="button"
              variant="outline"
            >
              <Ban className="mr-2 h-4 w-4" aria-hidden="true" />
              Cancelar
            </Button>
          </>
        )}
      </SheetFooter>
    </SheetContent>
  );
}
