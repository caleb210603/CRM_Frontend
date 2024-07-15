import React from 'react';
import { Table } from "@/components/ui/table";
import DeleteModal from './DeleteModal';

interface DeleteModalProps {
  isOpenM: boolean;
  closeModalM: () => void;
  purchaseId: number | null;
}

const AlertDelete: React.FC<DeleteModalProps> = ({ isOpenM, closeModalM }) => {

  return (
    <DeleteModal isOpenM={isOpenM} closeModalM={closeModalM}>
      <div className="mb-4 text-left text-gray-800">
      </div>
      <Table>
        <div className="mb-4">
          <h1 className="text-black text-lg font-bold">¿Estás seguro que quieres eliminar?</h1>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">Eliminar</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300" onClick={closeModalM}>Cancelar</button>
        </div>
      </Table>
    </DeleteModal>
  );
};

export default AlertDelete;

