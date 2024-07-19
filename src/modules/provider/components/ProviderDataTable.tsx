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
import { Provider as BaseProvider } from "@/types/purchase";
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
import Papa from "papaparse";
import { useState } from "react";
import { columns } from "@/modules/provider/components/management/Columns";
import { fuzzyFilter } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface ExtendedProvider extends BaseProvider {
  role_auth: number;
}

interface Props {
  data: ExtendedProvider[];
  isLoading: boolean;
}

const columnLabels: { [key: string]: string } = {
  name: "Razon Social",
  ruc: "N° de R.U.C.",
  person_contact: "Nombre de contacto",
  phone: "N° de contacto",
  email: "Correo",
  address: "Dirección",
};

export const ProviderDataTable = ({ data, isLoading }: Props) => {
  
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const providerTable = useReactTable({
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
      const renamedData = data.map((item) => {
        return {
          id: item.id,
          Nombre: item.name,
          Ruc: item.ruc,
          Contacto: item.person_contact,
          Telefono: item.phone,
          Correo: item.email,
          Dirección: item.address,
        };
      });

      const csvData = Papa.unparse(renamedData, {
        delimiter: ";",
      });
      const BOM = "\uFEFF";
      const csvBlob = new Blob([BOM + csvData], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(csvBlob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "clients.csv");
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
          onChange={(value) => setGlobalFilter(String(value))}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <Button
            onClick={exportToCSV}
            className="bg-green-500 hover:bg-green-600 ml-2"
          >
            Exportar CSV
          </Button>
          <DropdownMenuContent align="end">
            {providerTable
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
              {providerTable.getHeaderGroups().map((headerGroup) => (
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
              {providerTable.getRowModel().rows?.length ? (
                providerTable.getRowModel().rows.map((row) => (
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
          {providerTable.getFilteredSelectedRowModel().rows.length} de{" "}
          {providerTable.getFilteredRowModel().rows.length} fila(s) seleccionada(s)
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => providerTable.previousPage()}
            disabled={!providerTable.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => providerTable.nextPage()}
            disabled={!providerTable.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};
