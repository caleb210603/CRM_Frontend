import React from "react";
import {
  Card,
  CardContent,
  //CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
//import { Overview } from "@/components/Overview";
//import { RecentSales } from "@/pages/Dashboard/modules/Overview/components/RecentSales";
import { SoldProducts } from "@/pages/Dashboard/modules/Overview/components/SoldProducts";
import { useState } from "react";
import { SoldServices } from "@/pages/Dashboard/modules/Overview/components/SoldServices";
import { useSales } from "@/pages/Dashboard/modules/Overview/hooks/useSales";

export const Overview = () => {
  const { isLoading, sales, totalSales } = useSales();

  const [isActive, setisActive] = useState<boolean>(true);

  return (
    <>
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
            <div className="text-2xl font-bold">S/.{totalSales}</div>
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
            <CardTitle className="text-sm font-medium">Activo Ahora</CardTitle>
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
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
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
      </div> */}
      <Card className="rounded-lg shadow-lg p-4 transform transition-transform hover:scale-[1.01]">
        <CardHeader>
          <CardTitle>Resumen de ventas</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          {isActive ? (
            <SoldProducts setIsActive={setisActive} />
          ) : (
            <SoldServices setIsActive={setisActive} />
          )}
        </CardContent>
      </Card>
    </>
  );
};
