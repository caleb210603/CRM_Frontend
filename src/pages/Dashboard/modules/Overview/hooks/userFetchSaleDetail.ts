import { useEffect, useState } from "react";
import {
  getSale,
  getSaleDetailService,
  getSaleDetailProduct,
} from "../services/saleService";
import { SaleDetail, SaleDetailProduct, SaleDetailService } from "@/types/sale";

export const useFetchSaleDetail = () => {
  const [productsSales, setProductsSales] = useState<
    SaleDetailProduct[] | null
  >(null);
  const [servicesSales, setServicesSales] = useState<
    SaleDetailService[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSaleDetail = async () => {
      setIsLoading(true);
      try {
        const [serviceData, productData] = await Promise.all([
          getSaleDetailService(),
          getSaleDetailProduct(),
        ]);

        const serviceTotalSells = serviceData.reduce((acc, item) => {
          let service = acc.find((s) => s.id === item.service.id);
          if (service) {
            service.quantity += item.quantity;
          } else {
            acc.push({
              id: item.service.id,
              quantity: item.quantity,
            });
          }

          return acc;
        }, []);

        const productTotalSells = productData.reduce((acc, item) => {
          let product = acc.find((p) => p.id === item.product.id);
          if (product) {
            product.quantity += item.quantity;
          } else {
            acc.push({
              id: item.product.id,
              quantity: item.quantity,
            });
          }

          return acc;
        }, []);

        setProductsSales(productTotalSells);
        setServicesSales(serviceTotalSells);
      } catch (error) {
        setError(error as Error);
        console.error("Error fetching sale detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaleDetail();
  }, []);

  return { servicesSales, productsSales, isLoading, error };
};
