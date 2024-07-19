import * as React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./FilterRow";
import CalendaryTable from "./CalendaryTable";
import { ExportToCSV } from "./exportToCSV";
import { DateRange } from 'react-day-picker';
import { useFilteredPurchases } from "./useFilteredPurchases";
import { getStatusCellStyle } from "./CellStyles";
import PaginationControls from "./PaginationControls";

export function HistoryTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedDateRange, setSelectedDateRange] = React.useState<DateRange | undefined>();
  const { filteredData, isLoading, isError } = useFilteredPurchases(selectedDateRange);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const [currentPage, setCurrentPage] = React.useState(0);
  const rowsPerPage = 3;

  const paginatedRows = React.useMemo(() => {
    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return table.getRowModel().rows.slice(startIndex, endIndex);
  }, [currentPage, table.getRowModel().rows]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="w-full">
      <div>
        <CalendaryTable onChange={setSelectedDateRange} />
      </div>

      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por numero de factura"
          className="max-w-sm"
          onChange={(e) =>
            table.getColumn('number_bill')?.setFilterValue(e.target.value)
          }
        />

        <div className="flex items-center space-x-2 ml-auto">
          <ExportToCSV data={filteredData} filename="Historial de compra.csv" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border text-center">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-blue-600 text-white font-bold text-center ">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {paginatedRows.length ? (
              paginatedRows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.id === 'estatus' ? (
                        <div className={`flex items-center justify-center ${getStatusCellStyle(cell.getValue() as string)}`}>
                          {cell.getValue() as React.ReactNode}
                        </div>
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationControls
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalRows={table.getRowModel().rows.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
