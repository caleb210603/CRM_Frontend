import { useTitle } from "@/hooks/useTitle";
import { ItemActions } from "../components/ItemActions";
import { ItemDataTable } from "../components/ItemDataTable";
import { Item } from "@/types/purchase";
import api from "@/services/api";
import { useQuery } from "react-query";
import { User } from "@/types/auth";

interface ApiResponse {
  results: Item[];
}

const getItem = async (): Promise<Item[]> => {
  const response = await api.get<ApiResponse>("/detailpurchases");
  return response.data.results;
};

const getUser = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/profile");
  return data;
};

export const Items = () => {
  useTitle("Artículos");

  const { data: itemsData, isLoading: isLoadingItems } = useQuery<Item[]>(
    "items",
    getItem
  );

  const { data: userAuth, isLoading: isLoadingUserAuth } = useQuery<User>(
    "user",
    getUser
  );

  const isLoading = isLoadingItems || isLoadingUserAuth;

  const modifiedData =
    itemsData?.map((item) => ({
      ...item,

      role_auth: userAuth?.role || 0,
    })) || [];

  const isAdmin = userAuth?.role === 1;

  return (
    <section className="flex flex-col gap-8">
      <h3 className="text-4xl font-extrabold leading-tight tracking-tight">
        Artículos
      </h3>
      <div className="flex gap-4">{isAdmin && <ItemActions />}</div>
      <div>
        <ItemDataTable data={modifiedData} isLoading={isLoading} />
      </div>
    </section>
  );
};
