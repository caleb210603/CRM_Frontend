import { useState } from "react";
import { Purchase } from "src/types/purchase";
import { Button } from "@/components/ui/button";
import { FilterArrow } from "./FilterArrow";
import { ColumnDef } from "@tanstack/react-table";
import TableModal from "../TableModal/TableModal";

export const columns: ColumnDef<Purchase>[] = [
  {
    id: "actions",
    header: () => (
      <div className="flex justify-center space-x-2">
        <h1>*</h1>
      </div>
    ),
    cell: ({ row }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedId, setSelectedId] = useState<number | null>(null);

      const handleOpenModal = (id: number) => {
        setSelectedId(id);
        setIsModalOpen(true);
      };

      return (
        <div className="flex justify-center space-x-1">
          <Button
            variant="destructive"
            className="rounded w-8 h-8"
          >
            x
          </Button>


          <Button
            variant="default"
            className="rounded w-8 h-8"
            onClick={() => handleOpenModal(row.original.id)}
          >
            *
          </Button>

          <TableModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} purchaseId={selectedId} />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <FilterArrow column={column} title="ID" />,
  },
  {
    accessorKey: "description",
    header: () => <span>Descripción</span>,
  },
  {
    accessorKey: "date_purchase",
    header: () => <span>Fecha_Compra</span>,
  },
  {
    accessorKey: "number_bill",
    header: () => <span>Número_Factura</span>,
  },
  {
    accessorKey: "total",
    header: () => <span>Total</span>,
  },
  {
    accessorKey: "estatus",
    header: ({ column }) => <FilterArrow column={column} title="Estado" />,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("estatus")}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: () => <span>Creado en</span>,
  },
  {
    accessorKey: "updated_at",
    header: () => <span>Actualizado en</span>,
  },
  {
    accessorKey: 'provider_obj.id',
    header: () => <span>Provedor</span>,
  },
  {
    accessorKey: 'provider_obj.name',
    header: () => <span>Nombre</span>,
  },
  {
    accessorKey: 'provider_obj.ruc',
    header: () => <span>RUC</span>,
  },
];
