import api from "@/services/api";
import { PurchaseDetail } from "@/types/purchase";

export const getDetailPurchases = async (): Promise<PurchaseDetail[]> => {
  try {
    const response = await api.get(`/detailpurchases`);
    return response.data.results.map((purchase: any) => ({
      id: purchase.id,
      purchase_id: purchase.purchase_id,
      date_purchase: new Date(purchase.date_purchase),
      item: purchase.item,
      price: parseFloat(purchase.price),
      quantity: purchase.quantity,
      total: parseFloat(purchase.total),
      created_at: new Date(purchase.created_at),
      purchase_obj: {
                id: purchase.purchase_obj.id,
                description: purchase.purchase_obj.description,
      }
    }));
  } catch (error) {
    console.error("Error al obtener los detalles de compra:", error);
    throw error;
  }
};

