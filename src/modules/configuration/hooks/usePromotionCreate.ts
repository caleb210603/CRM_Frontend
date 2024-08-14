import { useMutation, useQueryClient } from "react-query";
import { createPromotion } from "../services/promotionService";

export const usePromotionCreate = () => {
    const queryClient = useQueryClient();
  
    const createPromotionMutation = () => {
      return useMutation(
        createPromotion,
        {
          onSuccess: () => {
            queryClient.invalidateQueries("promocion");
          },
          onError: (error: any) => {
            // Aquí puedes manejar errores específicos de la creación si es necesario
            console.error("Error en la creación de la promocion:", error);
          },
        }
      );
    };
  
    return { createPromotionMutation };
  };