// categoriaService.ts
import api from "@/services/api";

export const createPromotion = async (values: any) => {
  try {
    const response = await api.post("/promotions/create", values);

    if (response.status === 201) {
      return true;
    } else {
      console.error(
        "Error al crear la promocion. Estado de respuesta:",
        response.status
      );
      return false;
    }
  } catch (error: any) {
    console.error("Error general:", error);

    if (error.response && error.response.status === 400) {
      console.log(
        "La promocion ya existe. Estado de respuesta:",
        error.response.status
      );

      throw new Error("La promocion ya existe. Por favor, elige otro nombre.");
    } else if (error.response) {
      console.error("Error en la respuesta del servidor:", error.response.data);
      throw new Error("Error en la respuesta del servidor");
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
      throw new Error("No se recibió respuesta del servidor");
    } else {
      console.error(
        "Error durante la configuración de la solicitud:",
        error.message
      );
      throw new Error("Error durante la configuración de la solicitud");
    }
  }
};

export const updatePromotion = async (
  promotionId: number,
  {
    name,
    description,
    discount,
    start_date,
    ending_date,
  }: { name: string; description: string; discount: number; start_date:string; ending_date:string}
) => {
  try {
    const response = await api.put(`/promotions/update/${promotionId}`, {
      name,
      description,
      discount,
      start_date,
      ending_date,
    });

    if (response.status === 200) {
      return true;
    } else {
      console.error(
        "Error al actualizar la promocion. Estado de respuesta:",
        response.status
      );
      return false;
    }
  } catch (error: any) {
    console.error("Error general:", error);
    throw new Error("Error al actualizar la promocion");
  }
};
