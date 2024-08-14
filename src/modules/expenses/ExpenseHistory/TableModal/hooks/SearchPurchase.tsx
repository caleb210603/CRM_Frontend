// import { useEffect, useState } from 'react';
// import { PurchaseDetail } from '@/types/purchase';
// import { getDetailPurchases } from '../api/get';

// export const useSearchPurchase = () => {
//   const [purchasesData, setPurchasesData] = useState<PurchaseDetail[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const data = await getDetailPurchases();
//       setPurchasesData(data);
//     } catch (error) {
//       console.error("Error al obtener datos:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return { purchasesData, loading };
// };


// Codigo agregado para traer los demas count del endpoint

import { useEffect, useState } from 'react';
import { PurchaseDetail } from '@/types/purchase';
import { getDetailPurchases } from '../api/get';

export const useSearchPurchase = () => {
  const [purchasesData, setPurchasesData] = useState<PurchaseDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getDetailPurchases();
      setPurchasesData(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { purchasesData, loading };
};