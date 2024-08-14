export const getSaleStatus = (saleStatus: number): string => {
  switch (saleStatus) {
    case 0:
      return "Pendiente";
    case 1:
      return "En Proceso";
    case 2:
      return "Completado";
    default:
      return "Desconocido";
  }
};
