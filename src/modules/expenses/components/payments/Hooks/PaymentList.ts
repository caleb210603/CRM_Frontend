import api from "@/services/api";
import { Payment } from "@/types/purchase";
import { useEffect, useState } from "react";


export const paymentList = () => {

const [payments, setPayments] = useState<Payment[]>([]);


useEffect(() => {
  const fetchData = async (url) => {
    try {
      const { data } = await api.get(url);
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      let allPayments = data.results.map((payment: Payment) => {
        // Verifica si el pago está completado
        if (payment.cancelled_total === payment.total) {
          payment.estatus = "Completado";
        }else{
          if (new Date(payment.date_limit) <= new Date(formattedDate)) {
            
           payment.estatus = "Vencido" 

          }
        }
        return {
          ...payment,
          description_obj: payment.purchase_obj.description,
        };
      });


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
