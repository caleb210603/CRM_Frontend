import { CreditCardIcon, LandmarkIcon, WalletIcon } from "lucide-react";

export const getPaymentType = (paymentType: number): string => {
    switch (paymentType) {
      case 0:
        return "Tarjeta de Crédito";
      case 1:
        return "Tarjeta de Débito";
      case 2:
        return "Efectivo";
      case 3:
        return "Trasferencia Bancaria";
      case 4:
        return "Otro";
      default:
        return "Desconocido";
    }
  };

  export const getPaymentTypeWhitIcon = (paymentType: number): JSX.Element => {
    switch (paymentType) {
      case 0:
        return (
          <div className="flex">
            Tarjeta de Crédito
            <CreditCardIcon className="text-xl font-bold text-blue-600 ml-2 mt-1" />
          </div>
        );
      case 1:
        return (
          <div className="flex">
            Tarjeta de Débito
            <CreditCardIcon className="text-xl font-bold text-blue-600 ml-2 mt-1" />
          </div>
        );
      case 2:
        return (
          <div className="flex">
             Efectivo
            <WalletIcon className="text-xl font-bold text-blue-600 ml-2 mt-1" />
          </div>
        );
      case 3:
        return (
          <div className="flex">
            Trasferencia Bancaria
            <LandmarkIcon className="text-xl font-bold text-blue-600 ml-2 mt-1" />
          </div>
        );
      case 4:
        return (
          <div>
            Otro
          </div>
        );
      default:
        return (
          <>
            Desconocido
          </>
        );
    }
  };
