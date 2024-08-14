import { useEffect, useState } from 'react';
import { Sale } from '@/types/sale';
import api from '@/services/api';

export const searchCollection = () => {
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages] = useState<number>(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response1 = await api.get(`/sales`);
      const response2 = await api.get(`/sales?page=2`);

      const results1 = response1.data.results;
      const results2 = response2.data.results;
      

      // Mapea los resultados para obtener solo los campos específicos que necesitas
      const formatData = (results: Sale[]): Sale[] => {
        return results.map((sale: Sale) => {
          const { saleID, date, total, paymentType, saleStatus, customer } = sale;

          // Verificar que customer no sea undefined y tenga las propiedades esperadas
          const { name = '', lastname = '', email = '', phone = 0 } = customer || {}; 

          return {
            saleID,
            cliente: `${name} ${lastname}`,
            email,
            phone,
            date,
            total,
            paymentType,
            saleStatus,
          };
        });
      };


      const formattedData1 = formatData(results1);
      const formattedData2 = formatData(results2);
      
      // Combina los datos de ambas respuestas
      setSalesData([...formattedData1, ...formattedData2]);

      
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { salesData, loading, currentPage, totalPages, setCurrentPage };
};
