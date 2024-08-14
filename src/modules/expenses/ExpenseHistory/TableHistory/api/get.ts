import api from "@/services/api";
import { Purchase } from "@/types/purchase";

export const getPurchase = async (): Promise<Purchase[]> => {
  let allPurchases: Purchase[] = [];
  let nextUrl: string | null = '/purchases';

  try {
    while (nextUrl) {
      const response = await api.get(nextUrl);
      const newPurchases = response.data.results.map((purchase: any) => ({
        id: purchase.id,
        provider_id: purchase.provider_id,
        date_purchase: purchase.date_purchase,
        number_bill: purchase.number_bill,
        total: parseFloat(purchase.total),
        estatus: purchase.estatus,
        created_at: purchase.created_at,
        updated_at: purchase.updated_at,
        description: purchase.description,
        provider_obj: {
          id: purchase.provider_obj.id,
          name: purchase.provider_obj.name,
          ruc: purchase.provider_obj.ruc,
        }
      }));

      allPurchases = [...allPurchases, ...newPurchases];
      nextUrl = response.data.next;
    }

    return allPurchases;
  } catch (error) {
    console.error("Error al obtener los detalles de compra:", error);
    throw error;
  }
};