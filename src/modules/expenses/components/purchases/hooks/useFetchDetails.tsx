import { useState, useEffect } from 'react';
import api from '@/services/api';
import { PurchaseDetail } from '@/types/purchase';

export function useFetchDetails() {
  const [details, setDetails] = useState<PurchaseDetail[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get('/detailpurchases');
        setDetails(response.data.results);
      } catch (error) {
        console.error("Error fetching purchase details:", error);
        setError("Failed to fetch purchase details");
      }
    };

    fetchDetails();
  }, []);

  return { details, error };
}