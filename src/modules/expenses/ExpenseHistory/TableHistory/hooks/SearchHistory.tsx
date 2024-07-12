import { useEffect, useState } from "react";
import { Purchase } from "@/types/purchase";
import { getPurchase } from "../api/get";

export const usePurchaseHistory = () => {
  const [purchasesDataHistory, setPurchasesDataHistory] = useState<Purchase[]>([]);
  const [loadingPurchase, setLoadingPurchase] = useState<boolean>(true);

  const fetchDataPurchase = async () => {
    try {
      setLoadingPurchase(true);
      const data = await getPurchase();
      setPurchasesDataHistory(data);
    } catch (error) {
      console.log("Error al obtener datos:", error);
    } finally {
      setLoadingPurchase(false);
    }
  };

  useEffect(() => {
    fetchDataPurchase();
  }, []);

  return { purchasesDataHistory, loadingPurchase };
};
