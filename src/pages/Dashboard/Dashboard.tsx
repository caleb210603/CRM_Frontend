import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Overview } from "@/components/Overview";
import { RecentSales } from "@/modules/analytics/components/RecentSales";
import { useTitle } from "@/hooks/useTitle";
import Notifications from "./modules/Notifications/Notifications";
import { useQuery } from "react-query";
import { User } from "@/types/auth";
import api from "@/services/api";
import Analytics from "./modules/Analytics/Analytics";

// Función para obtener el perfil del usuario autenticado (usando la misma interfaz User)
const getUser = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/profile");
  return data;
};

export default function DashboardPage() {
  useTitle("Panel de control");
  
  const {data: userAuth} = useQuery<User>('user', getUser);

  const isAdmin = ()=> {
    return userAuth?.role == 1;    
  }

  return (
    <div className="flex flex-col">
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
            <TabsTrigger value="overview">
              Resumen
            </TabsTrigger>
            <TabsTrigger value="analytics">
              Analítica
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Informes
            </TabsTrigger>
            { 
              isAdmin() && 
                <TabsTrigger value="notifications">
                  Notificaciones
                </TabsTrigger>
            }
          </TabsList>
          <TabsContent value="overview" className="space-y-4 items-center">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
              <Card className="rounded-lg shadow-lg p-4 transform transition-transform hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Ingresos Totales
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-6 w-6 text-blue-500"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold">S/.45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% respecto al mes pasado
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-lg shadow-lg p-4 transform transition-transform hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-6 w-6 text-green-500"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    +19% respecto al mes pasado
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-lg shadow-lg p-4 transform transition-transform hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Activo Ahora
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-6 w-6 text-red-500"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 desde la última hora
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Resumen</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Ventas Recientes</CardTitle>
                  <CardDescription>
                    Has realizado 265 ventas este mes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>          
          <TabsContent value="notifications">
            <Notifications/>              
          </TabsContent>
          <TabsContent value="analytics">
            <Analytics/>   
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
