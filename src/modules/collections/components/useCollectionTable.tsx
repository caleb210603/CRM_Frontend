import { SetStateAction, useState } from 'react';
import { searchCollection } from '../hooks/Searchcollection';

export const useCollectionTable = () => {
  const { salesData, loading, currentPage, setCurrentPage } = searchCollection();
  const [filterStatus, setFilterStatus] = useState('');
  const itemsPerPage = 7;

  const handleFilterChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setFilterStatus(event.target.value);
  };

  const filteredData = filterStatus
    ? salesData.filter((sale) => sale.saleStatus.toString() === filterStatus)
    : salesData;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage * itemsPerPage < filteredData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return {
    salesData,
    loading,
    currentPage,
    filterStatus,
    paginatedData,
    handleFilterChange,
    handlePrevClick,
    handleNextClick,
  };
};
