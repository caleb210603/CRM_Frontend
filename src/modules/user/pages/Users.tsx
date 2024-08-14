import { UserDataTable } from "../components/UserDataTable";
import { UserActions } from "../components/UserActions";
import { useTitle } from "@/hooks/useTitle";
import api from "@/services/api";
import { useQuery } from "react-query";

import { User } from "@/types/auth";

// Función para obtener la lista de usuarios
const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/users");
  return data;
};

// Función para obtener el perfil del usuario autenticado (usando la misma interfaz User)
const getUser = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/profile");
  return data;
};


export function Users() {
  useTitle("Usuarios");
  // Consulta para obtener la lista de usuarios
  const { data: users, isLoading: isLoadingUsers } = useQuery<User[]>("users", getUsers);
  
  // Consulta para obtener los datos del usuario autenticado
  const { data: userAuth, isLoading: isLoadingUserAuth } = useQuery<User>("user", getUser);

  // Controlador de estados de carga combinado
  const isLoading = isLoadingUsers || isLoadingUserAuth;

  // Enriquecimiento de los datos de los usuarios con información adicional del usuario autenticado
  // Asumiendo que necesitas agregar algún dato del usuario autenticado a cada usuario en la lista
  const modifiedData = users?.map(user => ({
    ...user,
    role_auth: userAuth?.role || 0, // Asignamos 0 como valor por defecto si userAuth es undefined
  })) || [];
  

   // Verificar si el usuario autenticado es administrador
  const isAdmin = userAuth?.role === 1;

  return (
    <section className="flex flex-col gap-8">
      <h3 className="text-4xl font-extrabold leading-tight tracking-tight">Usuarios</h3>
      <div className="flex gap-4">
      {isAdmin && <UserActions />}
      </div>
      <div>
      <UserDataTable 
          data={modifiedData} 
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
