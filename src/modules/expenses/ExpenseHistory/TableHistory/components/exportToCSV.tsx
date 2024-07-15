
import React from "react";
import { Purchase } from "@/types/purchase";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";

interface ExportToCSVProps {
  data: Purchase[];
  filename: string;
}

const exportToCSV = (data: Purchase[], filename: string) => {
  try {
    const renamedData = data.map(purchase => ({
      ID: purchase.id,
      Descripcion: purchase.description || '',
      Fecha_Compra: purchase.date_purchase,
      Número_Factura: purchase.number_bill,
      "Creado en": purchase.created_at || '',
      "Actualizado en": purchase.updated_at || '',
      "Proveedor ID": purchase.provider_obj?.id || '',
      Ruc: purchase.provider_obj?.ruc || '',
      Total: purchase.total,
      Estado: purchase.estatus,
    }));

    const csvData = Papa.unparse(renamedData, {
      delimiter: ";", 
    });

    const BOM = "\uFEFF"; 
    const csvBlob = new Blob([BOM + csvData], { type: 'text/csv;charset=utf-8;' }); // Crear el blob de datos CSV
    const url = URL.createObjectURL(csvBlob); // Crear una URL para el blob
    const link = document.createElement('a'); // Crear un elemento <a> para descargar el archivo
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.click(); // Simular clic en el enlace para iniciar la descarga

  } catch (error) {
    console.error("Error exporting CSV: ", error);
  }
};

export const ExportToCSV: React.FC<ExportToCSVProps> = ({ data, filename }) => {
  const handleExport = () => {
    exportToCSV(data, filename);
  };

  return (
    <Button variant="green" onClick={handleExport}>
      Export CSV
    </Button>
  );
};
