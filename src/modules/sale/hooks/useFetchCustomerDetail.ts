import { useState, useEffect } from 'react';
import { getSale } from '../services/saleService';

export const useFetchCustomerDetail = (id: string) => {
    const [customer, setCustomer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCustomerDetail = async () => {
            setIsLoading(true);
            try {
                const sale = await getSale(id);
                setCustomer(sale.customer);
            } catch (error) {
                console.error('Error fetching customer detail:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCustomerDetail();
    }, [id]);

    return { customer, isLoading };
}