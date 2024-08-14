import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import React, { useState } from "react";
import { columns } from "@/modules/user/components/management/Columns";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { User } from "@/types/auth";
import { DebouncedInput } from "@/components/DebounceInput";
import { fuzzyFilter } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import Papa from "papaparse";
import { getDocumentType } from "@/enums/documentType";
import { getRole } from "@/enums/role";
import { Head } from "react-day-picker";

interface Props {
  data: User[];
  isLoading: boolean;
}

const columnLabels: { [key: string]: string } = {
  lastname: "Apellidos",
  name: "Nombres",
  document_number: "Nº de Dni",
  role: "Rol",
  estado: "Estado",
  perfil: "Perfil",
  image: "image"
};



export function UserDataTable({ data, isLoading }: Props) {
  /*Sacamos el rol del usuario que ha iniciado sesión*/
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");



  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
        pageSize: 5,
      },
    },
  });

  const exportToCSV = () => {
    try {
      const renamedData = data.map(item => {
        const documentType = getDocumentType(item.document_type);
        const role = getRole(item.role);
        return {
          id: item.id,
          NombreDeUsuario: item.username,
          Correo: item.email,
          Nombre: item.name,
          Apellido: item.lastname,
          Documento: documentType,
          Número: item.document_number,
          Teléfono: item.phone,
          Dirección: item.address,
          Rol: role,
          Estado: item.is_active? "Activo" : "Inactivo",
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
      link.setAttribute('download', 'users.csv');
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
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
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
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                // Define los nombres de las columnas que no deben cambiar su estado de check
                const nonToggleableColumns = ["name", "lastname"];

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    // Verifica si la columna actual está en la lista de columnas no cambiables
                    checked={
                      nonToggleableColumns.includes(column.id) || column.getIsVisible()
                    }
                    // Si es una columna no cambiable, no permitas cambios de check
                    onCheckedChange={
                      nonToggleableColumns.includes(column.id)
                        ? () => { }
                        : (value) => column.toggleVisibility(!!value)
                    }
                  >
                    {columnLabels[column.id] || column.id}
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
              {table.getHeaderGroups().map((headerGroup) => (
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
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
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
                    No hay resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s)
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
