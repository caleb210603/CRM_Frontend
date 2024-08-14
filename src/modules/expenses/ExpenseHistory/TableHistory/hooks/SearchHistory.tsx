import { useQuery } from 'react-query';
import { Purchase } from "@/types/purchase";
import { getPurchase } from "../api/get";

export const usePurchaseHistory = (page?: number, rowsPerPage?: number) => {
  return useQuery<Purchase[], Error>('purchases', getPurchase);
};
