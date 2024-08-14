import { useState } from "react";
import AlertDelete from "./AlertDelete";
import { FilterArrow } from "./FilterArrow";
import { Purchase } from "src/types/purchase";
import { ColumnDef } from "@tanstack/react-table";
import TableModal from "../../TableModal/components/TableModal";
import { FaTimes } from "react-icons/fa";
import { FaList } from "react-icons/fa6";

export const columns: ColumnDef<Purchase>[] = [
  {
    id: "actions",
    header: () => (
      <div className="flex justify-center space-x-2">
        <h1>*</h1>
      </div>
    ),
    cell: ({ row }) => {
      const [modalType, setModalType] = useState<'table' | 'alertDelete' | null>(null);
      const [selectedId, setSelectedId] = useState<number | null>(null);
      const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);

      const openModal = (type: 'table' | 'alertDelete', purchase: Purchase) => {
        setSelectedId(purchase.id);
        setSelectedPurchase(purchase);
        setModalType(type);
      };

      const closeModal = () => {
        setModalType(null);
        setSelectedId(null);
        setSelectedPurchase(null);
      };

      return (
        <div className="flex justify-center space-x-1">
         
          {/* Buttons from Delete and opne Modal  */}
          <button  
          className="bg-red-600 text-white rounded p-2 ml-2"
          onClick={() => openModal('alertDelete', row.original)}
          >
          <FaTimes/>
         </button>


         <button  
          className="bg-blue-600 text-white rounded p-2 ml-2"
          onClick={() => openModal('table', row.original)}
          >
          <FaList/>
         </button>


          {modalType === 'table' && (
            <TableModal
              isOpen={true} // Ajusta según sea necesario, deberías controlarlo con el estado
              closeModal={closeModal}
              purchaseId={selectedId}
            />
          )}

          {modalType === 'alertDelete' && (
            <AlertDelete
              isOpenM={true} // Ajusta según sea necesario, deberías controlarlo con el estado
              closeModalM={closeModal}
              purchaseId={selectedId}
              purchaseData={selectedPurchase}
            />
          )}
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
    cell: (info) => {
      const value = info.getValue();
      return typeof value === "number" ? value.toFixed(2) : "0.00";
    },
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
