import { PaymentDataTable } from "../components/payments/PaymentDataTable";
import {  usePayments } from "../components/payments/Hooks/PaymentList";

export function Payments() {

  const { data: payments, error, isLoading } = usePayments();

  if (error) return <div>Error loading payments: {error.message}</div>;


  return (
    <div>
       <h1 className="text-3xl font-extrabold mb-1 mt-3">Pagos</h1>
       <p className='text-sm text-muted-foreground mb-1'>Supervisa y administra todos tus pagos de manera eficiente.</p>
      <PaymentDataTable data={payments || []} isLoading={isLoading} />
    </div>
  );
}