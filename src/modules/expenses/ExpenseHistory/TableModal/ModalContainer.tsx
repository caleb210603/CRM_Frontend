import React from 'react';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const ModalContainer: React.FC<ModalProps> = ({ isOpen, closeModal, children }) => {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'flex' : 'hidden'} items-center justify-center`}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg relative z-10 w-full max-w-3xl">
        {children}
        <div className="mt-4 flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={closeModal}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
