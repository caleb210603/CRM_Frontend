import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import { Payment  } from "@/types/purchase";
  import { fuzzyFilter } from "@/lib/utils";
  import { columns } from "./management/PaymentColumns"
  import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Input } from "@/components/ui/input";


  interface PaymentDataTableProps {
    data: Payment[];
    isLoading: boolean;
  }

  export function PaymentDataTable({ data, isLoading }: PaymentDataTableProps) {
    /*Estado para filtrar globalmente por buscador*/
    const [globalFilter, setGlobalFilter] = useState('');
    /*Estado para ordenar alfabeticamente*/ 
    const [sorting, setSorting] = useState<SortingState>([]);
    /*Funcion para filtro de estado*/
    const [statusFilter, setStatusFilter] = useState('');


  const filteredData = statusFilter
    ? data.filter(payment => payment.estatus === statusFilter)
    : data;
  /*----------------------------------------------------*/ 

    const table = useReactTable({
      data: filteredData,
    columns: columns,
    autoResetPageIndex: false,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    state: {
      globalFilter,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 7,
      },
    },
  });
    return (
      <div className="w-full">
        {/*Filtro de busqueda global*/}
        <div className="flex ">
             {/*Select para el filtro de estado*/}
             <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 w-32 rounded-md mb-4 mt-4  cursor-pointer bg-blue-600 hover:bg-blue-600 hover:bg-blue-800 text-white text-sm font-semibold py-1 px-3 "
              aria-label="Filtrar por estado"
             >
              <option value="">Todos</option>
              <option value="Completado">Completado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Vencido">Vencido</option>
            </select>
            {/*-----------------------------------------------------*/}
            <div className="p-4">
              <Input
                type="text"
                placeholder="Buscar..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="h-10 w-[200%] px-5 pr-10 text-sm border-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                aria-label="Buscar pagos"
             />
            </div>
           {/*---------------------------------------------------*/}
          </div>
        <div className="rounded-md border">
          {isLoading ? (
            <Skeleton className="w-full h-[25rem]" />
          ) : (
            <Table>
              <TableHeader className="bg-blue-600">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="pl-6 text-center">
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
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="text-center">
                          {flexRender(
                            cell.column.columnDef.cell as React.ReactNode,
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
                      No hay pagos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
          <div className="p-4 flex justify-between">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 border rounded-md"
              aria-label="Página anterior"
            >
              Anterior
            </button>
            <span>
              Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 border rounded-md"
              aria-label="Página siguiente"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    );
  }
  