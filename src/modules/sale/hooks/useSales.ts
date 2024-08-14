import { useQuery } from "react-query";
import api from "@/services/api";

const getAllSales = async (search: string, url = "/sales") => {
  const { data } = await api.get(url);
  let sales = data.results;

  if (search) {
    sales = sales.filter((sale: { customer: { name: string; }; }) => sale.customer.name.toLowerCase().includes(search.toLowerCase()));
  }

  if (data.next) {
    const nextPageSales = await getAllSales(search, data.next);
    sales = [...sales, ...nextPageSales];
  }

  return sales;
};

export const useSales = (search: string) => {
  return useQuery(["sales", search], () => getAllSales(search, "/sales"));
};