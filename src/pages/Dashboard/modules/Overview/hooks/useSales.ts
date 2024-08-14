import { useQuery } from "react-query";
import api from "@/services/api";
import { Sale } from "@/types/sale";

const getAllSales = async (): Promise<Sale[]> => {
  const { data } = await api.get("/sales");
  const sales = data.results;

  return sales;
};

export const useSales = () => {
  const { data: sales, isLoading } = useQuery<Sale[]>("sales", () =>
    getAllSales()
  );

  const calculateTotalSum = (sales: Sale[]): number => {
    return sales.reduce((sum, sale) => sum + parseFloat(sale.total), 0);
  };

  const totalSales = sales ? calculateTotalSum(sales) : 0;

  const data = {
    isLoading,
    sales,
    totalSales,
  };

  return data;
};
