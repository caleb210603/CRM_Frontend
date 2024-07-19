import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { usePurchaseHistory } from '../hooks/SearchHistory';

export function useFilteredPurchases(selectedDateRange: DateRange | undefined) {
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
  }, 
  [purchasesDataHistory, selectedDateRange]);

  return { filteredData, isLoading, isError };
}
