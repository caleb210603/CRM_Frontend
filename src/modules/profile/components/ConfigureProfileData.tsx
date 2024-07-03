import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateProfile } from "@/lib/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import { ZodError } from "zod";

interface FormValues {
  email?: string;
  phone?: string;
  address?: string;
}

interface DataProfileItem {
  title: string;
  key: string;
  data: string;
}

interface ConfigureProfileDataProps {
  dataProfile: DataProfileItem[];
  id?: number;
}

export const ConfigureProfileData: React.FC<ConfigureProfileDataProps> = ({
  dataProfile,
  id,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateProfile),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      UpdateProfile.parse(data);

      const dataUpdate = {
        email: data.email,
        phone: data.phone,
        address: data.address,
      };

      await api.patch(`users/update/${id}`, dataUpdate);
      setErrorMessage(null);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        console.error("Error de validación:", error.errors);
        setErrorMessage("Por favor, corrige los campos marcados.");
      } else {
        console.error("Error actualizando los datos del usuario:", error);
        setErrorMessage(
          "Ocurrió un error al actualizar los datos del usuario. Por favor, intenta nuevamente."
        );
      }
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <>
      <p className="font-bold mb-5 text-xl flex justify-center md:flex-none md:justify-start">
        Configuración de cuenta
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-6 w-full ">
          {dataProfile.map((item, index) => (
            <div className="grid w-full content-start gap-1.5" key={index}>
              <p className="text-gray-500 text-sm ">{item.title}</p>
              <Input
                type="text"
                {...register(item.key)}
                defaultValue={item.data}
                disabled={
                  !(
                    isEditing &&
                    ["email", "phone", "address"].includes(item.key)
                  )
                }
              />
              {errors[item.key as keyof FormValues]?.message && (
                <span className="text-red-500 text-xs">
                  {errors[item.key as keyof FormValues]?.message || ""}
                </span>
              )}
            </div>
          ))}
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        <p className="font-bold mb-2 mt-8 text-xl flex justify-evenly md:flex-none md:justify-evenly">
          <Button
            type="button"
            onClick={() => {
              if (errorMessage) setErrorMessage(null);
              setIsEditing(!isEditing);
            }}
            variant={isEditing ? "destructive" : "default"}
          >
            {isEditing ? "Cancelar" : "Configurar"}
          </Button>
          {isEditing && (
            <Button type="submit" disabled={!isEditing}>
              Guardar cambios
            </Button>
          )}
        </p>
      </form>
    </>
  );
};
