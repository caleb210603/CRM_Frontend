import { useTitle } from "@/hooks/useTitle";
import { useState } from "react";
import { useClientsFetch } from "../hooks/useClientFetch";
import { ClientActions } from "../components/ClientActions";
import { ClientDataTable } from "../components/ClientDataTable";
import { User } from "@/types/auth";
import api from "@/services/api";
import { useQuery } from "react-query";

export function Clients() {
  useTitle("Clientes");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (newSearchQuery: any) => {
    setSearchQuery(newSearchQuery);
  };

  const getUser = async (): Promise<User> => {
    const { data } = await api.get<User>("/auth/profile");
    return data;
  };

  const { data: userData, isLoading: userLoading } = useQuery("user", getUser);
  
  const { isLoading, isError, clients, fetchNextPage, hasNextPage, count } =
    useClientsFetch(searchQuery);
  const handleNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
/*Esto es para agregar el campo roleAuth a cada cliente y así saber si el usuario que está en la sesión es administrador o no*/
  const modifiedClients = clients?.map(client => ({
    ...client,
    role_auth: userData?.role || 0, // Asignamos 0 como valor por defecto si userData es undefined
  })) || [];

  return (
    <section className="flex flex-col gap-8">
      <h3 className="text-4xl font-extrabold leading-tight tracking-tight">Clientes</h3>
      <div className="flex gap-4">
        <ClientActions />
      </div>
      <div>
        <ClientDataTable
          data={modifiedClients}
          isLoading={isLoading || userLoading}
          setPage={handleNextPage}
          count={count}
          onSearchChange={handleSearchChange}
        />
      </div>
    </section>
  );
}
