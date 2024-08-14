import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/services/api";
import { Service } from "@/types/service";
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
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { columns } from "./management/ColumnServices";
import { fuzzyFilter } from "@/lib/utils";
import { useFetchSaleDetail } from "../hooks/userFetchSaleDetail";

const getServices = async (): Promise<Service[]> => {
  const response = await api.get("/services");
  return response.data.data;
};

export const SoldServices = ({ setIsActive }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState<number>(7);

  const { data: servicesData, isLoading: isLoadingProducts } = useQuery<
    Service[]
  >("services", getServices);

  const {
    servicesSales,
    isLoading: isLoadingSales,
    error,
  } = useFetchSaleDetail();

  const services = useMemo(() => {
    if (!servicesData || !servicesSales) return [];

    return servicesData.map((service) => {
      const salesRecord = servicesSales.find((sale) => sale.id === service.id);
      return {
        ...service,
        totalSales: salesRecord ? salesRecord.quantity : 0,
      };
    });
  }, [servicesData, servicesSales]);

  console.log(services);

  const table = useReactTable({
    data: services,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const handleSetActive = (active) => () => {
    setIsActive(active);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center p-4">
        <Tabs defaultValue="services" className="">
          <TabsList>
            <TabsTrigger value="products" onClick={handleSetActive(true)}>
              Productos vendidos
            </TabsTrigger>
            <TabsTrigger value="services">Servicio vendidos</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="border rounded px-4 py-1 w-72">
                {`Ultimos ${selectedDateRange} dias`}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedDateRange(7)}>
                Ultimos 7 dias
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDateRange(30)}>
                Ultimos 30 dias
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDateRange(90)}>
                Ultimos 90 dias
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="p-4">
        {isLoadingProducts ? (
          <Skeleton className="w-full h-[25rem]" />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="pl-0">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={`service_${row.id}`}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={`service_${cell.id}`}>
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
};
