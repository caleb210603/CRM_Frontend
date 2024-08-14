import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

import { useTitle } from "@/hooks/useTitle";

import Notifications from "./modules/Notifications/Notifications";
import { useQuery } from "react-query";
import { User } from "@/types/auth";
import api from "@/services/api";
import Analytics from "./modules/Analytics/Analytics";
import { Overview } from "./modules/Overview/Overview";

export default function DashboardPage() {
  useTitle("Panel de control");

  // Función para obtener el perfil del usuario autenticado (usando la misma interfaz User)
  const getUser = async (): Promise<User> => {
    const { data } = await api.get<User>("/auth/profile");
    return data;
  };

  useTitle("Panel de control");

  const { data: userAuth } = useQuery<User>("user", getUser);

  const isAdmin = () => {
    return userAuth?.role == 1;
  };

  return (
    <div className="flex flex-col mb-5">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
            Panel de control
          </h2>
          <div className="flex items-center space-x-2">
            <DatePickerWithRange />
            <Button>Descargar</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="analytics">Analítica</TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Informes
            </TabsTrigger>
            {isAdmin() && (
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="overview" className="space-y-4 items-center">
            <Overview />
          </TabsContent>
          <TabsContent value="notifications">
            <Notifications />
          </TabsContent>
          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
