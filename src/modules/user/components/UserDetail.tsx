import { Button } from "@/components/ui/button";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";
import { User, User as UserDetailType } from "@/types/auth";
import { MousePointerClick, Pencil, ShieldCheck, Trash } from "lucide-react";
import { UserEditForm } from "./UserEditForm";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { toast } from "@/hooks/useToast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/lib/validators/user";
import { useQueryClient } from "react-query";
import Dropzone from "react-dropzone";


interface Props {
  user: UserDetailType;
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

export function UserDetail({ user, open, setIsOpen }: Props) {
  const [edit, setEdit] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");


  const handleCancelUpdate = () => {
    setEdit(true);
    setImageUrl("");
    form.reset();
  };

  const showError = (errorMessage: string, second: number) => {
    setFileError(errorMessage);
    setTimeout(() => {
      setFileError('');
    }, second*1000); // Ocultar el error después de los segundos que quieras
  };

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      name: user?.name,
      lastname: user?.lastname,
      document_type: user?.document_type,
      document_number: user?.document_number,
      phone: user?.phone,
      address: user?.address,
      role: 1,
      image: user?.image || "",
    },
  });

  const handleUpdateUser = async (user: User) => {
    setIsPending(true);
    try {
      let status: number;
      if (user.is_active) {
        ({ status } = await api.delete(`/users/delete/${user.id}`));
      } else {
        ({ status } = await api.patch(`/users/update/${user.id}`, {
          is_active: true,
        }));
      }
      status === 200
        ? toast({
            title: "Cuenta actualizada exitosamente",
          })
        : toast({
            title: "Esta cuenta esta actualizada",
          });
      queryClient.invalidateQueries("users");
      setIsOpen(false);
    } catch (error) {
      console.error(error); // Log del error
      toast({
        title: "Error al actualizar cuenta",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
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
      <SheetTitle>Información del usuario</SheetTitle>
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
                        <AvatarImage src={typeof user.image === 'string' ? user.image : undefined} alt="image profile user" className="object-cover"/>
                         <AvatarFallback className="text-3xl">
                          {getInitials(user.name, user.lastname)}
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
            <AvatarImage src={typeof user.image === 'string' ? user.image : undefined} alt="image profile user" className="object-cover"/>
            <AvatarFallback className="text-3xl">
              {getInitials(user.name, user.lastname)}
            </AvatarFallback>
          </Avatar>
          )}
          <p className="flex flex-col items-center mb-[0.5rem] mt-3">
            {user.name} {user.lastname}
          </p>
          <UserEditForm
            edit={edit}
            user={user}
            form={form}
            setIsOpen={setIsOpen}
            setIsPending={setIsPending}
            file={file}
            setFile={setFile}
          />
        </div>
      </div>
      {edit ? (
        <SheetFooter className="mt-8 md:mt-0 sm:justify-center">
          <div className="flex justify-center"> {/* Cambiamos de md:justify-end a justify-center */}
          <div className="flex gap-9">
          <Button
            onClick={(event) => {
              setEdit(!edit);
              event.preventDefault();
            }}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button
            onClick={() => handleUpdateUser(user)}
            type="button"
            variant={user.is_active ? "destructive" : "outline"}
          >
            {user.is_active ? (
              <Trash className="mr-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <ShieldCheck className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {user.is_active ? "Eliminar" : "Activar"}
          </Button>
          </div>
        </div>
        </SheetFooter>
      ) : (
        <SheetFooter className="mt-8 md:mt-1 sm:justify-center gap-9">
          <Button type="submit" form="update-user-form" disabled={isPending}>
            <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
            Aplicar
          </Button>
          <Button onClick={handleCancelUpdate} type="button" variant="outline">
            <Trash className="mr-2 h-4 w-4" aria-hidden="true" />
            Cancelar
          </Button>
        </SheetFooter>
      )}
    </SheetContent>
  );
}