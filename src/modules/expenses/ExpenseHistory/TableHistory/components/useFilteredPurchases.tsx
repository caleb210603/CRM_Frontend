import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { usePurchaseHistory } from '../hooks/SearchHistory';

export function useFilteredPurchases(selectedDateRange: DateRange | undefined, page: number, rowsPerPage: number) {
  const { data: purchasesDataHistory, isLoading, isError } = usePurchaseHistory();

  const filteredData = React.useMemo(() => {
    if (!selectedDateRange || !purchasesDataHistory) {
      return purchasesDataHistory || [];
    }
    
    const { from, to } = selectedDateRange;
    return purchasesDataHistory.filter((purchase: any) => {
      const purchaseDate = new Date(purchase.date_purchase);
      return purchaseDate >= (from ?? new Date(0)) && (!to || purchaseDate <= to);
    });
  }, [purchasesDataHistory, selectedDateRange]);

  const paginatedData = React.useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return { 
    filteredData: paginatedData, 
    isLoading, 
    isError, 
    totalPages,
    totalItems: filteredData.length
  };
}