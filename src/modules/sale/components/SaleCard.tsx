import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sale } from "@/types/sale";
import { ChevronRight, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/lib/utils";
import { getPaymentType } from "@/enums/paymentType";

interface SaleCardProps {
  sale: Sale;
}

export function SaleCard({ sale }: SaleCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/sales/${sale.saleID}`);
  };

  const formattedDate = formatDate(sale.date);

  return (
    <Card
    className={cn(
      "flex rounded-xl overflow-hidden group hover:shadow-2xl bg-background relative"
    )}
  >
    <button 
      className="w-48 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-2xl flex items-center justify-center transition duration-300 ease-in-out"
      onClick={handleClick}
    >
      <span className="mr-3">Ver detalle</span>
      <ChevronRight className="transition-transform transform group-hover:translate-x-1" />
    </button>
    <div className="bg-background rounded-tr-lg rounded-br-lg shadow-lg p-6 flex-grow relative">
      <div className="flex justify-between items-center mb-4">
      <div>
            <h3 className="text-xl font-bold">Venta {sale.saleID}</h3>
            <p className="text-sm">{sale.customer.name} {sale.customer.lastname}</p>
          </div>
        <div>
          <span className="text-2xl font-bold text-green-600">
            S/ {sale.total}
          </span>
        </div>
      </div>
      <div className="-bottom-2 left-4 flex items-center space-x-2 mt-12 text-gray-400">
        <CalendarDays />
        <p className="text-base">{formattedDate}</p>
      </div>
    </div>
  </Card>
  );
}