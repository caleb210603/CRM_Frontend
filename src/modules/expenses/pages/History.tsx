

import { HistoryTable } from "../ExpenseHistory/TableHistory/components/HistoryTable";

export function History() {
  return (
    <>
      <div>
        <br/>
        <p className="text-2xl font-bold ">Historial de Compras</p>
        <HistoryTable />
      </div>
    </>
  )
}