import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import { useFetchSaleDetail } from "../hooks/useFetchSaleDetail";
import { useFetchCustomerDetail } from "../hooks/useFetchCustomerDetail";
import CustomerDetail from "../components/CustomerDetail";
import { Button } from "@/components/ui/button";
import Detail from "../components/Detail";
import { SaleDetail as SaleDetailType } from "@/types/sale";
import {  Box, ChevronLeft, FileTextIcon, Tag } from "lucide-react";
import { getPaymentTypeWhitIcon } from "@/enums/paymentType";

interface SaleDetailParams extends Record<string, string | undefined> {
  saleID: string;
}

export function SaleDetail() {
  const { saleID } = useParams<SaleDetailParams>();
  const navigate = useNavigate();
  useTitle(`Venta #${saleID}`); 
  const { sales, isLoading, error } = useFetchSaleDetail(saleID ?? "");
  const { customer, isLoading: isCustomerLoading } = useFetchCustomerDetail(
    saleID ?? ""
  );

  const handleExportPDF = () => {
    // Abrir una nueva pestaña con el componente PDFSaleDetail
    window.open(`/PDFSaleDetail/${saleID}`, "_blank");
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los detalles de la venta: {error.message}</div>;
  }

  if (!sales || sales.length === 0) {
    return <div>No se encontraron detalles para esta venta.
    <Button
      variant="outline"
      className="w-48 mr-2 flex items-center justify-center px-4 py-2 border-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out shadow-md"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft className="h-4 w-4 mr-2" />
      <span>Volver</span>
    </Button>
    </div>;
  }
  return (
    <>
  <h3 className="text-4xl font-extrabold leading-tight tracking-tight">
    Detalle de venta
  </h3>
  <p className="mb-4 text-sm text-muted-foreground">
    Explora los detalles precisos de cada transacción realizada.
  </p>
  <div className="flex justify-end mb-4">
    <Button
      variant="outline"
      className="w-48 mr-2 flex items-center justify-center px-4 py-2 border-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out shadow-md"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft className="h-4 w-4 mr-2" />
      <span>Volver</span>
    </Button>
    <button
      onClick={handleExportPDF}
      className="flex items-center justify-center w-48 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
    >
      Exportar
      <FileTextIcon className="ml-2" />
    </button>
  </div>
  <div className="flex flex-col lg:flex-row justify-items-start space-x-36">
    <div className="order-1 lg:order-1 w-full lg:w-1/3">
      <CustomerDetail customer={customer} isLoading={isCustomerLoading} />
    </div>
  </div>
  <div className="mb-4 text-left">
    <p className="text-lg font-bold">
      Total:<span className="text-xl font-semibold text-blue-600"> S/ {sales[0].sales.total}</span>
    </p>
    <p className="flex text-lg font-semibold">
      Tipo de pago: <span className="text-xl font-bold text-blue-600">{getPaymentTypeWhitIcon(sales[0].sales.paymentType)}</span>
    </p>
  </div>
  <div className="flex justify-center space-x-4 mb-4 rounded-xl border-2 p-3 w-60 ml-auto bg-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
    <div className="flex items-center text-sm">
      <Tag className="inline-block w-4 text-white" />
      <span className="ml-2">Producto</span>
    </div>
    <div className="flex items-center text-sm">
      <Box className="inline-block w-4 text-white" />
      <span className="ml-2">Servicio</span>
    </div>
  </div>
  {sales &&
    sales.map((sale: SaleDetailType, index: number) => (
      <React.Fragment key={index}>
        {sale.serviceData && (
          <Detail sale={sale} isLoading={isLoading} type="service" />
        )}
        {sale.productData && (
          <Detail sale={sale} isLoading={isLoading} type="product" />
        )}
      </React.Fragment>
    ))}
</>

  );
}
