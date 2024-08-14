import { Promotion } from "@/types/promotion";
import api from "./api";

 export const getPromotions = async ():Promise<Promotion[]>=> {
    const { data } = await api.get("/promotions");
    return data;
  };

  // api.ts
