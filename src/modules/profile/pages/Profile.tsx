import { Button } from "@/components/ui/button";
import { ChevronRight, MousePointerClick } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/services/api";
import { User } from "@/types/auth";
import { ConfigurationList } from "../components/ConfigurationList";
import { useTitle } from "@/hooks/useTitle";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getInitials } from "@/lib/utils";
import Dropzone from "react-dropzone";
import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";
import { ConfigureProfileData } from "../components/ConfigureProfileData";
import { HelpAndSupport } from "../components/HelpAndSupport";

interface Props {
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

export const Profile = ({ open, setIsOpen }: Props) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  useTitle(user?.name || "Perfil");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);

  // const [isLoading, setIsLoading] = useState(false)
  const [dataUser, setDataUser] = useState<User>({
    id: 0,
    username: "",
    email: "",
    name: "",
    lastname: "",
    document_type: 0,
    document_number: "",
    phone: "",
    address: "",
    role: 0,
    image: "",
    role_auth: 0,
  });

  const showError = (errorMessage: string, second: number) => {
    setFileError(errorMessage);
    setTimeout(() => {
      setFileError("");
    }, second * 1000); // Ocultar el error después de los segundos que quieras
  };

  const [isAdmin, setIsAdmin] = useState<number | null>(null);

  const [statusButton, setstatusButton] = useState("CC");

  const handleButton = (status: string) => {
    if ("CC" === status) {
      setstatusButton("CC");
    }

    if ("PS" === status) {
      setstatusButton("PS");
    }

    if ("AS" === status) {
      setstatusButton("AS");
    }
  };

  const getDataUser = async () => {
    try {
      const response = await api.get(`users/${user?.id}`);
      // if (response) {
      //     setLoading(false)
      // }
      const userData = response.data;
      setDataUser(userData);
      console.log("Data de usuario guardada correctamente:", userData);
      setImageUrl(userData.image); // Establece la URL de la imagen
      console.log("URL de la imagen:", userData.image);
      setIsAdmin(userData.role);
      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const formData = new FormData();

      const response = await api.get(`users/${user?.id}`);
      // if (response) {
      //     setLoading(false)
      // }
      const userData = response.data;
      setDataUser(userData);

      if (file) {
        formData.append("image", file);
      }

      const response2 = await api.patch(
        `/users/update/${userData?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Especificar el tipo de contenido como formData
          },
        }
      );

      if (response2.status === 200) {
        toast({
          title: "Cuenta actualizada exitosamente",
        });
        queryClient.invalidateQueries("users");
        setIsOpen(false);
      } else {
        toast({
          title: "Esta cuenta esta actualizada",
        });
      }
    } catch (error) {
      console.error("Error al actualizar cuenta:", error);
    } finally {
      window.location.reload();
    }
  };

  useEffect(() => {
    const dataLocalStorage = localStorage.getItem("dataUser");
    if (!dataLocalStorage || JSON.parse(dataLocalStorage).id !== user?.id) {
      getDataUser();
      // setLoading(true)
    } else {
      setDataUser(JSON.parse(dataLocalStorage));
    }
  }, []);

  const dataProfile = [
    {
      title: "Nombre",
      key: "name",
      data: `${dataUser?.name}`,
    },
    {
      title: "Apellido",
      key: "lastname",
      data: `${dataUser?.lastname}`,
    },
    {
      title: "Email",
      key: "email",
      data: `${dataUser?.email}`,
    },
    {
      title: "Nº telefono",
      key: "phone",
      data: `${dataUser?.phone}`,
    },

    {
      title: "Direccion",
      key: "address",
      data: `${dataUser?.address}`,
    },
    {
      title: "Rol",
      key: "role",
      data:
        dataUser?.role === 1
          ? "Administrador"
          : dataUser?.role === 2
          ? "Empleado"
          : "Rol no reconocido",
    },
  ];

  /*Esta es la función para el dropzone y que cambie de imagen*/
  const handleDrop = (acceptedFiles: File[]) => {
    try {
      // Verificar que se haya seleccionado al menos un archivo
      if (acceptedFiles.length === 0) {
        showError("Por favor, seleccione un archivo.", 3);
        throw new Error("Por favor, seleccione un archivo.");
      }

      // Obtener el primer archivo seleccionado
      const selectedFile = acceptedFiles[0];

      // Verificar si el archivo no es una imagen
      if (!selectedFile.type.startsWith("image/")) {
        showError("El archivo seleccionado no es una imagen.", 3);
        throw new Error("El archivo seleccionado no es una imagen.");
      }

      // Verificar que el tamaño del archivo no sea mayor a 2 MB
      const maxSize = 1.2 * 1024 * 1024; // Tamaño máximo en bytes (1.2 MB)
      if (selectedFile.size > maxSize) {
        showError(
          "El tamaño del archivo seleccionado es demasiado grande. Por favor, seleccione un archivo más pequeño.",
          5
        );
        throw new Error(
          "El tamaño del archivo seleccionado es demasiado grande. Por favor, seleccione un archivo más pequeño."
        );
      }

      // Obtener la URL del archivo seleccionado
      const imageUrl = URL.createObjectURL(selectedFile);

      // Guardar el archivo seleccionado en el estado
      setFile(selectedFile);

      // Mostrar la imagen en la interfaz de usuario
      setImageUrl(imageUrl);
      setShowSaveButton(true);
    } catch (error) {
      console.log("Error al procesar el archivo:", error);
    }
  };

  const handleCancel = () => {
    setFile(null); // Limpiar el archivo seleccionado
    setImageUrl(dataUser.image.toString()); // Mostrar la imagen anterior
    setShowSaveButton(false); // Ocultar los botones
  };

  return (
    <div className="graphics-container block px-0">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col basis-1/3 py-5 px-3 2xl:px-10">
          {/* si queremos quitarle la validación de si es admin o no, el código sería así: onDrop={handleDrop}*/}
          <Dropzone
            onDrop={isAdmin === 1 ? handleDrop : undefined}
            disabled={isAdmin !== 1}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className=" h-full mx-auto rounded-full flex-initial object-cover cursor-pointer"
              >
                <input {...getInputProps()} />
                <div className="group h-full relative transition-colors duration-300 bg-background rounded-full text-center flex justify-center items-center overflow-hidden border-dashed hover:border-solid border-2 border-accent hover:border-primary">
                  {isAdmin === 1 && (
                    <div className="absolute top-0 left-0 flex flex-col items-center justify-center gap-4 w-full h-full bg-foreground/30 dark:bg-background/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <MousePointerClick className="h-18 w-18 text-white/50" />
                      <p className="text-white/50 px-7">
                        Haga click o arrastre para cambiar imagen
                      </p>
                    </div>
                  )}
                  {imageUrl ? (
                    <img
                      src=""
                      className="rounded-full w-48 h-48 2xl:w-80 2xl:h-80 flex-initial object-cover"
                      alt="Foto de perfil"
                    />
                  ) : (
                    <div>
                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="mx-auto border-2 rounded-full w-80 h-80 flex-initial object-cover bg-gray-200">
                          {user ? (
                            <AvatarFallback className="text-5xl flex items-center justify-center h-full ">
                              {getInitials(user.name, user.lastname)}
                            </AvatarFallback>
                          ) : null}
                        </Avatar>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Dropzone>
          <div>
            {fileError && (
              <div className="mt-2 text-red-500 text-sm">{fileError}</div>
            )}
          </div>
          {showSaveButton && (
            <div className="flex justify-center mt-4 mb-6 space-x-4">
              <Button
                onClick={handleCancel}
                className=" w-28 text-white bg-red-500 hover:bg-red-600"
              >
                Cancelar
              </Button>
              <Button onClick={handleUpdateUser} className="w-28">
                Guardar
              </Button>
            </div>
          )}
          <div className="flex flex-col items-center mb-4 mt-4 gap-3">
            <p className="font-bold text-2xl">{dataUser?.username}</p>
            <p className="text-gray-500 text-sm">
              Bienvenido a Consigue Ventas
            </p>
          </div>
          <hr />
          <div className="flex flex-col gap-4 2xl:gap-8 mt-4">
            <Button
              variant={`${statusButton === "CC" ? "default" : "outline"}`}
              className="flex justify-between"
              onClick={() => handleButton("CC")}
            >
              <p>Configuración de Cuenta</p>
              <ChevronRight size={"18px"} />
            </Button>
            <Button
              variant={`${statusButton === "PS" ? "default" : "outline"}`}
              className="flex justify-between"
              onClick={() => handleButton("PS")}
            >
              <p>Privacidad y Seguridad</p>
              <ChevronRight size={"18px"} />
            </Button>
            <Button
              variant={`${statusButton === "AS" ? "default" : "outline"}`}
              className="flex justify-between"
              onClick={() => handleButton("AS")}
            >
              <p>Ayuda y Soporte</p>
              <ChevronRight size={"18px"} />
            </Button>
          </div>
        </div>

        {statusButton === "CC" && (
          <div className="md:flex-1 py-5  px-4 lg:px-10">
            <ConfigureProfileData dataProfile={dataProfile} id={user?.id} />
          </div>
        )}

        {statusButton === "PS" && (
          <div className="md:flex-1 py-5  px-4 lg:px-10">
            <ConfigurationList />
          </div>
        )}

        {statusButton === "AS" && (
          <div className="md:flex-1 py-5  px-4 lg:px-10">
            <HelpAndSupport />
          </div>
        )}
      </div>
    </div>
  );
};
