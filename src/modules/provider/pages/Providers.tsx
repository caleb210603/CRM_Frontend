import { useTitle } from "@/hooks/useTitle";
import api from "@/services/api";
import { useQuery } from "react-query";
import { User } from "@/types/auth";
import { Provider } from "@/types/purchase";
import { ProviderActions } from "../components/ProviderActions";
import { ProviderDataTable } from "../components/ProviderDataTable";

interface ApiResponse {
  results: Provider[];
}

const getProviders = async (): Promise<Provider[]> => {
  const response = await api.get<ApiResponse>("/providers");
  return response.data.results;
};

const getUser = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/profile");
  return data;
};

export function Providers() {
  useTitle("Proveedores");

  const { data: providers, isLoading: isLoadingUsers } = useQuery<Provider[]>(
    "providers",
    getProviders
  );

  const { data: userAuth, isLoading: isLoadingUserAuth } = useQuery<User>(
    "user",
    getUser
  );

  const isLoading = isLoadingUsers || isLoadingUserAuth;

  const modifiedData =
    providers?.map((provider) => ({
      ...provider,
      ruc: provider.ruc.toString(),
      role_auth: userAuth?.role || 0,
    })) || [];

  const isAdmin = userAuth?.role === 1;

  return (
    <section className="flex flex-col gap-8">
      <h3 className="text-4xl font-extrabold leading-tight tracking-tight">
        Proveedores
      </h3>
      <div className="flex gap-4">{isAdmin && <ProviderActions />}</div>
      <div>
        <ProviderDataTable data={modifiedData} isLoading={isLoading} />
      </div>
    </section>
  );
}
