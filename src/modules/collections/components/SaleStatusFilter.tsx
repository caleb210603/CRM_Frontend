import React from 'react';

interface SaleStatusFilterProps {
  filterStatus: string;
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SaleStatusFilter: React.FC<SaleStatusFilterProps> = ({ filterStatus, onFilterChange }) => {
  return (
    <select value={filterStatus} onChange={onFilterChange} className="border rounded-md p-2 bg-blue-500  text-white">
      <option value="">Todos</option>
      <option value="0">Pendiente</option>
      <option value="1">En Proceso</option>
      <option value="2">Completado</option>
    </select>
  );
};

export default SaleStatusFilter;
