
export const getStatusCellStyle = (status: string): string => {
    switch (status) {
      case 'Completado':
        return 'bg-green-500 text-white rounded-lg h-6';
      case 'Vencido':
        return 'bg-red-500 text-white rounded-lg h-6';
      case 'Pendiente':
        return 'bg-yellow-500 text-white rounded-lg h-6';
      case 'Eliminado':
        return 'bg-gray-500 text-white rounded-lg h-6';
      default:
        return 'bg-gray-500 text-white rounded-lg h-6';
    }
  };
  

