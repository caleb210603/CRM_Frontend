import { useState, useEffect } from 'react';
import api from '@/services/api';
import { Provider } from '@/types/purchase';

export function useFetchProviders() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await api.get('/providers');
        // console.log("Response data:", response.data);
        setProviders(response.data.results || []);
      } catch (error) {
        console.error("Error fetching providers:", error);
        setError("Failed to fetch providers");
      }
    };

    fetchProviders();
  }, []);

  return { providers, error };
}
