import { useMutation, useQueryClient } from "react-query";
import { updatePromotion } from "../services/promotionService";



export const usePromotionEdit = () => {
  const queryClient = useQueryClient();

  const editPromotion = (
    promotionId: number,
    { name, description, discount, start_date, ending_date }: { name: string; description: string; discount: number; start_date:string; ending_date: string }
  ) => {
    return useMutation(
      () => updatePromotion(promotionId, { name, description, discount, start_date, ending_date }),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("promocion");
        },
      }
    );
  };

  return { editPromotion };
};