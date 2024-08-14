import { DebouncedInput } from "@/components/DebounceInput";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fuzzyFilter } from "@/lib/utils";
import { columns } from "@/modules/client/components/management/Columns";
import { ClientDetail } from "@/types/auth";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Papa from "papaparse";
import { Dir } from "fs";
import { DocumentType, getDocumentType } from "@/enums/documentType";
import { Gender, getGender } from "@/enums/gender";

interface Props {
  data: ClientDetail[];
  isLoading: boolean;
  setPage: () => void;
  count: number;
  onSearchChange: (newSearchQuery: string) => void;
}

export function ClientDataTable({
  data,
  isLoading,
  setPage,
  count,
  onSearchChange,
}: Props) {
  console.log("datos: ", data)
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const itemsPerPage = 5;

  const clientColumnLabels: { [key: string]: string } = {
    lastname: "Apellidos",
    name: "Nombre",
    address: "Dirección",
    cellNumber: "Celular",
    active: "estado",
    image: "image",
  };

  const clientTable = useReactTable({
    data,
    columns,
    autoResetPageIndex: false,
    pageCount: Math.ceil(count / itemsPerPage),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onSortingChange: setSorting,

    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: itemsPerPage,
      },
    },
  });
  
  /*Conversión a Excel*/
  const exportToCSV = () => {
    try {
      const renamedData = data.map(item => {
        const documentType = getDocumentType(item.document_type);
        const gender = getGender(item.gender);

        return {
          id: item.id,
          Nombre: item.name,
          Apellido: item.lastname,
          Documento: documentType,
          Número: item.document_number,
          FechaDeNacimiento: item.birthdate,
          Correo: item.email,
          Género: gender,
          Teléfono: item.phone,
          Dirección: item.address,
          CodigoPostal: item.postal_code,
          Provincia: item.province,
          Distrito: item.district,
          País: item.country,
        };
      });

      const csvData = Papa.unparse(renamedData, {
        delimiter: ";"
      });
      const BOM = "\uFEFF"; 
      const csvBlob = new Blob([BOM + csvData], { type: 'text/csv;charset=utf-8;' }); 
      const url = URL.createObjectURL(csvBlob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'clients.csv');
      link.click();
    } catch (error) {
      console.error("Error exporting CSV: ", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <DebouncedInput
          placeholder="Filtrar por palabra clave"
          value={globalFilter}
          onChange={(value) => onSearchChange(String(value))}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <Button onClick={exportToCSV} className="bg-green-500 hover:bg-green-600 ml-2">Exportar CSV</Button>
          <DropdownMenuContent align="end">
            {clientTable
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {clientColumnLabels[column.id] || column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        {isLoading ? (
          <Skeleton className="w-full h-[25rem]" />
        ) : (
          <Table>
            <TableHeader>
              {clientTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="pl-0">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {clientTable.getRowModel().rows?.length ? (
                clientTable.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Sin resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {clientTable.getFilteredSelectedRowModel().rows.length} de{" "}
          {clientTable.getFilteredRowModel().rows.length} fila(s)
          seleccionada(s)
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              clientTable.previousPage();
            }}
            disabled={!clientTable.getCanPreviousPage()}
          >
            Anterior
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPage();

              setTimeout(() => {
                clientTable.nextPage();
              }, 100);
            }}
            disabled={!clientTable.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}