import React from 'react';

interface ModalProps {
  isOpenM: boolean;
  closeModalM: () => void;
  children: React.ReactNode;
}

const DeleteModal: React.FC<ModalProps> = ({ isOpenM, closeModalM, children }) => {
  return (
    <div className={`fixed inset-0 z-50 ${isOpenM ? 'flex' : 'hidden'} items-center justify-center`}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={closeModalM}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg relative z-10 w-auto">
        {children}
        <div className="mt-4 flex justify-end">
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
