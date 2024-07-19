import api from "@/services/api";
import { setCategories, startLoadingCategories } from ".";
import { AppDispatch } from "..";

export const getCategories = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingCategories());

    try {
      const { data } = await api.get("/categories");
      dispatch(setCategories(data));
    } catch (error) {
      console.log(error);
    }
  };
};

