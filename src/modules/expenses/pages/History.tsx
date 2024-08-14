

import { HistoryTable } from "../ExpenseHistory/TableHistory/components/HistoryTable";

export function History() {
  return (
    <>
      <div>
        <br/>
        <h1 className="text-3xl font-extrabold mb-1 mt-3">Historial de Compras</h1>
       <p className='text-sm text-muted-foreground mb-1'>Administra tu historial de manera eficiente.</p>
        <HistoryTable />
      </div>
    </>
  )
}