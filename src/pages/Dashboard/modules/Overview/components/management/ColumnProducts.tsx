import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

interface ProductTotal extends Product {
  totalSales: number;
}

export const columns: ColumnDef<ProductTotal>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="flex items-center gap-3" style={{ minWidth: "400px" }}>
        <div className="w-28 overflow-hidden rounded-lg">
          <img
            src={row.original.image as string}
            alt={row.getValue("name")}
            className="w-28 max-h-20 rounded-lg"
          />
        </div>
        <div className="w-full">
          <h2 className="font-bold">
            {row.getValue("name")} - {row.original.brand}
          </h2>
          <p className="text-sm text-gray-500">
            {row.original.description || "sin descripcion"}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("stock")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ventas
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className=" ">{row.getValue("price")}</div>,
  },
  {
    accessorKey: "totalSales",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ventas
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("totalSales")}</div>,
  },
];
