import { PaymentDataTable } from "../components/payments/PaymentDataTable";
import { paymentList } from "../components/payments/Hooks/PaymentList";

export function Payments() {


  return (
    <div>
       <h1 className="text-3xl font-extrabold mb-1 mt-3">Pagos</h1>
       <p className='text-sm text-muted-foreground mb-1'>Supervisa y administra todos tus pagos de manera eficiente.</p>
      <PaymentDataTable data={paymentList()} isLoading={false} />
    </div>
  );
}