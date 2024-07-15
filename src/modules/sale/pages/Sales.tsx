import { useTitle } from "@/hooks/useTitle";
import { Button } from "@/components/ui/button";
import { DateRange } from 'react-day-picker';
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useState } from "react";
import { SalesList } from "../components/SalesList";
import { useSales } from '../hooks/useSales';
import { CustomerSearch } from "../components/CustomerSearch";
import { FileTextIcon, HandCoinsIcon } from "lucide-react";

export function Sales() {
  useTitle("Ventas");
  const [search, setSearch] = useState("");
  const { data: sales, isLoading } = useSales( search );
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>();

  const handleDateChange = (dateRange: DateRange | undefined) => {
    setSelectedDateRange(dateRange);
  };

  const handleExport = () => {
    /*Esto manda al usuario al page PDFPreview */
    window.open("/exportar", "_blank");
  };
  return (
    <>
    <h3 className="text-4xl font-extrabold mb-5 leading-tight tracking-tight">Historial de ventas</h3>
    <div className="flex flex-col lg:flex-row justify-between mb-6">
      <div className="w-80">
        <CustomerSearch setSearch={setSearch} />
      </div>
      
      <div className="mt-4 lg:mt-0 lg:ml-2">
        <DatePickerWithRange className="w-80" onChange={handleDateChange}/>
      </div>
      <div className="mt-4 lg:mt-0">
        
        {/* BOTON COBROS  */}
        {/* <button className="flex items-center justify-center w-48 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
          <HandCoinsIcon className="mr-2" /> Cobros
        </button> */}

        <button 
          className="flex items-center justify-center w-48 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
          onClick={() => window.location.href = '/collections'}
        >
          <HandCoinsIcon className="mr-2" /> Cobros
        </button>

      </div>
      <div className="mt-4 lg:mt-0">
        <button onClick={handleExport} className="flex items-center justify-center w-48 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
          Exportar en PDF <FileTextIcon className="ml-2" />
        </button>
      </div>
    </div>
    <SalesList data={sales} isLoading={isLoading} dateRange={selectedDateRange} />
  </>
  );
}