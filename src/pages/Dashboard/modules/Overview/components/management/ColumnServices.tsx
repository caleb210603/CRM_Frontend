import { Service } from "@/types/service";
import { ColumnDef } from "@tanstack/react-table";

interface ServiceTotal extends Service {
  totalSales: number;
}

export const columns: ColumnDef<ServiceTotal>[] = [
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
          <h2 className="font-bold">{row.getValue("name")} </h2>
          <p className="text-sm text-gray-500">
            {row.original.description || "sin descripcion"}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "rate",
    header: "Tarifa",
    cell: ({ row }) => <div className="">{row.getValue("rate")}</div>,
  },

  {
    accessorKey: "totalSales",
    header: "Total",
    cell: ({ row }) => <div className="">{row.getValue("totalSales")}</div>,
  },
];
