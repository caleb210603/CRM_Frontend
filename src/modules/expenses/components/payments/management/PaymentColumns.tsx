import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "@/types/purchase";
import { FaSort, FaSortUp, FaSortDown} from 'react-icons/fa';
import CancelledTotal from "../CancelledTotal";
import DeletePayments from "../DeletePayment";


const createColumn = (accessorKey: keyof Payment, label: string, sortable: boolean = false): ColumnDef<Payment> => {
  return {
    accessorKey,
    header: ({ column }) => (
      <div className="flex items-center justify-center text-white hover:text-white hover:text-black font-semibold">
        <span>{label}</span>
        {sortable && (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="ml-2"
          >
            {column.getIsSorted() === 'desc' ? (
              <FaSortDown />
            ) : column.getIsSorted() === 'asc' ? (
              <FaSortUp />
            ) : (
              <FaSort />
            )}
          </button>
        )}
      </div>
    ),
    cell: ({ cell }) => (
      <div className={`flex items-center justify-center ${
        accessorKey === 'estatus' 
        ? cell.getValue() === 'Completado' 
          ? 'bg-green-500 text-white rounded-lg h-6 '
          : cell.getValue() === 'Vencido'
          ? 'bg-red-500 text-white rounded-lg h-6'
          : 'bg-yellow-500 text-white rounded-lg h-6'
        : ''}`}>
        {accessorKey === 'date_payment' || accessorKey === 'date_limit'
          ? new Date(cell.getValue() as Date).toLocaleDateString()
          : cell.getValue() as React.ReactNode}
      </div>
    ),
  };
};

const createActionsColumn = (): ColumnDef<Payment> => {
  return {
    accessorKey: "actions",
    header: () => (
      <div className="flex items-center justify-center text-white hover:text-white hover:text-black font-semibold">
        <span>Acciones</span>
      </div>
    ),
    cell: ({ row }) => {

      return (
      <div className="flex items-center justify-center"> 
       {/*Funcion para abonar al total cancelado*/ }    
       <CancelledTotal
        paymentdata={row.original}
       />  
      {/*Funcion para Eliminar pago seleccionado*/ }    
       <DeletePayments
       id={row.original.id}
       />
      </div>
    )
  }
};
}

export const columns: ColumnDef<Payment>[] = [
  createColumn("id", "ID",true),
  createColumn( "description_obj", "Descripción"),
  createColumn("date_payment", "Fecha", true),
  createColumn("date_limit", "Fecha Límite"),
  createColumn("payment_method", "Método de Pago"),
  createColumn("total", "Total", true), // Hacemos esta columna sortable
  createColumn("cancelled_total", "Total Cancelado"),
  createColumn("estatus", "Estado"),
  createActionsColumn(), // Añadimos la columna de acciones al final
];