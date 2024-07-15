import React from 'react';
import { FaCircleExclamation } from 'react-icons/fa6';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useSearchPurchase } from '../hooks/SearchPurchase';
import ModalContainer from './ModalContainer';

interface TableModalProps {
  isOpen: boolean;
  closeModal: () => void;
  purchaseId: number | null;
}

const TableModal: React.FC<TableModalProps> = ({ isOpen, closeModal, purchaseId }) => {
  const { purchasesData, loading } = useSearchPurchase();

  const selectedPurchase = purchasesData.find(purchase => purchase.id === purchaseId);

  return (
    <ModalContainer isOpen={isOpen} closeModal={closeModal}>
      <div className="mb-4 text-left text-gray-800">
        <div className="flex items-center mb-2">
          <FaCircleExclamation className="mr-2" size={18} color="#198FFF" />
          <h2 className="text-lg font-semibold mb-1">VENTA</h2>
        </div>

        {selectedPurchase ? (
          <div className="grid grid-cols-2 gap-2">
            <p className="text-sm"><strong>FECHA:</strong> 19/05/03</p>
            <p className="text-sm"><strong>CLIENTE:</strong> Arnold Campos</p>
            <p className="text-sm"><strong>MODO DE PAGO:</strong> Trajeta de Credito</p>
            <p className="text-sm"><strong>FACTURA: XXXX</strong> </p>
          </div>
        ) : (
          <p className="text-sm">No se encontraron detalles para esta compra.</p>
        )}
      </div>

      <Table className='rounded-lg border border-gray-200'>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableCell className="text-gray-700 text-center py-2 font-medium border-r border-gray-200">ID</TableCell>
            <TableCell className="text-gray-700 text-left py-2 font-medium border-r border-gray-200">FECHA - COMPRA</TableCell>
            <TableCell className="text-gray-700 text-center py-2 font-medium border-r border-gray-200">ARTICULO</TableCell>
            <TableCell className="text-gray-700 text-center py-2 font-medium border-r border-gray-200">PRECIO</TableCell>
            <TableCell className="text-gray-700 text-center py-2 font-medium border-r border-gray-200">CANTIDAD</TableCell>
            <TableCell className="text-gray-700 text-center py-2 border-r border-gray-200">TOTAL</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">Cargando...</TableCell>
            </TableRow>
          ) : selectedPurchase ? (
            <TableRow key={selectedPurchase.id} className="border-b border-gray-200">
              <TableCell className="text-center text-gray-700 py-2 border-r border-gray-200">{selectedPurchase.id}</TableCell>
              <TableCell className="text-left text-gray-700 py-2 border-r border-gray-200">
                {new Date(selectedPurchase.date_purchase).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center text-gray-700 py-2 border-r border-gray-200">{selectedPurchase.item}</TableCell>
              <TableCell className="text-center text-gray-700 py-2 border-r border-gray-200">{selectedPurchase.price.toFixed(2)}</TableCell>
              <TableCell className="text-center text-gray-700 py-2 border-r border-gray-200">{selectedPurchase.quantity}</TableCell>
              <TableCell className="text-center text-gray-700 py-2 border-r border-gray-200">{selectedPurchase.total.toFixed(2)}</TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-gray-700">No hay datos disponibles</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ModalContainer>
  );
};

export default TableModal;