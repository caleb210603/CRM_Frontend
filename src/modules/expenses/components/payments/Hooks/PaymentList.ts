import api from "@/services/api";
import { Payment } from "@/types/purchase";
import { useEffect, useState } from "react";


export const paymentList = () => {

const [payments, setPayments] = useState<Payment[]>([]);

useEffect(() => {
  const fetchData = async (url) => {
    try {
      const { data } = await api.get(url);
      let allPayments = data.results.map(payment => ({
        ...payment,
        description_obj: payment.purchase_obj.description,
      }));

      if (data.next) {
        const nextPagePayments = await fetchData(data.next);
        allPayments = [...allPayments, ...nextPagePayments];
      }

      return allPayments;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const initializePayments = async () => {
    const paymentsData = await fetchData("/payments");
    setPayments(paymentsData);
  };

  initializePayments();
}, []);

return payments;
};
