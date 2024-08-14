import api from "@/services/api";
import { toast } from "@/hooks/useToast";

export const createClient = async (values: any) => {
  try {
    const result = await api.post("/clients/create", values);
    if (result.status >= 400) {
      throw new Error("Error al crear nuevo cliente");
    } else {
      return result.data;
    }
  } catch (error) {
    throw new Error("Error al crear nuevo cliente");
  }
};

export const updateClient = async (clientId: number, values: any) => {
  try {
    const { status } = await api.put(`/clients/update/${clientId}`, values);
    if (status === 200) {
      toast({ title: "Cliente editado" });
    } else {
      toast({ title: "Error al editar cliente", variant: "destructive" });
    }
  } catch (error) {
    toast({ title: "Error al editar cliente", variant: "destructive" });
  }
};

export const fetchClients = async ({
  pageParam = 1,
  search = "",
}: {
  pageParam?: number;
  search?: string | number;
}) => {
  try {
    const response = await api.get(
      `/clients?page=${pageParam}&search=${search}`
    );
    const { data } = response;

    return {
      clients: data.results,
      count: data.count,
      next: data.next,
    };
  } catch (error) {
    throw new Error("Error en la solicitud del servidor");
  }
};
