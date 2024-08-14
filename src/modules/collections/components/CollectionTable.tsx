import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { getPaymentType } from '@/enums/paymentType';
import { tableHeaders } from './columns/salesColumns';
import { TableCellWithBadge } from './TableCellWithBadge';
import SaleStatusFilter from './SaleStatusFilter';
import { useCollectionTable } from './useCollectionTable';

export function CollectionTable() {
  const {
    salesData,
    loading,
    currentPage,
    filterStatus,
    paginatedData, 
    handleFilterChange,
    handlePrevClick,
    handleNextClick,
  } = useCollectionTable();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <SaleStatusFilter filterStatus={filterStatus} onFilterChange={handleFilterChange} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableHead key={header} className="text-center">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="text-center">
            {paginatedData.length ? (
              paginatedData.map((sale) => (
                <TableRow key={sale.saleID}>
                  <TableCell>{sale.saleID}</TableCell>
                  <TableCell>{sale.cliente}</TableCell>
                  <TableCell>{sale.email}</TableCell>
                  <TableCell>{sale.phone}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>{sale.total}</TableCell>
                  <TableCell>{getPaymentType(sale.paymentType)}</TableCell>
                  <TableCellWithBadge saleStatus={sale.saleStatus} />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableHeaders.length}>No hay resultados</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextClick}
          disabled={currentPage * 7 >= salesData.length} 
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
