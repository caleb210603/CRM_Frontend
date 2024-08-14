import React from "react";
import { TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getSaleStatus } from "@/enums/SaleStatus";
import { TableCellWithBadgeProps } from '../../../types/sale';


export const TableCellWithBadge: React.FC<TableCellWithBadgeProps> = ({ saleStatus }) => {
  let badgeClass = "";
  switch (saleStatus) {
    case 0: // Pendiente
      badgeClass = "border-yellow-500 text-yellow-500";
      break;
    case 1: // En Proceso
      badgeClass = "border-blue-500 text-blue-500";
      break;
    case 2: // Completado
      badgeClass = "border-green-500 text-green-500";
      break;
    default:
      badgeClass = "border-gray-500 text-gray-500";
      break;
  }

  return (
    <TableCell>
      <Badge variant="outline" className={`${badgeClass} capitalize`}>
        {getSaleStatus(saleStatus)}
      </Badge>
    </TableCell>
  );
};