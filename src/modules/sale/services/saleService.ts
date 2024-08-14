import api from "@/services/api";

export const getSale = async (id: string) => {
    const response = await api.get(`/sales/${id}`);
    return response.data;
}

export const getSaleDetailService = async () => {
    const response = await api.get('/saledetailservice');
    return response.data.results;
}

export const getSaleDetailProduct = async () => {
    const response = await api.get('/saledetailproduct');
    return response.data.results;
}