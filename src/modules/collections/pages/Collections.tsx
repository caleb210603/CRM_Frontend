
import React from 'react';
import { CollectionTable } from '../components/CollectionTable';

const Collections: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold mb-2 ">Gestión de Cobros</h1>
      <p className='text-sm text-muted-foreground mb-3'>Supervisa y administra todas las transacciones de manera eficiente.</p>
      <CollectionTable />
    </div>
  );
};

export default Collections;
