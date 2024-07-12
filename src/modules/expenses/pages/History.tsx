

import { HistoryTable } from "../ExpenseHistory/TableHistory/HistoryTable";
import TableModal from "../ExpenseHistory/TableModal/TableModal";

export function History() {
  return (
    <>
      <div>
        <br/>
        <p className="text-2xl font-bold ">Historial de Compras</p>
        {/* <TableHistory /> */}
        <HistoryTable />
        <TableModal/>
      </div>
    </>
  )
}