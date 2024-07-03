import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

import { Purchases } from './Purchases';
import { History } from './History';
import { Payments } from './Payments';
import { useTitle } from '@/hooks/useTitle';

export default function Expenses() {
  useTitle('Gastos')
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTab === null) {
      setSelectedTab('purchases');
      navigate("/expenses/purchases");
    }
  }, [selectedTab, navigate]);

  const handleTabClick = (tabValue: string) => {
    setSelectedTab(tabValue);
    switch (tabValue) {
      case 'purchases':
        navigate("/expenses/purchases");
        break;
      case 'history':
        navigate("/expenses/history");
        break;
      case 'payments':
        navigate("/expenses/payments");
        break;
      default:
        break;
    }
  };

  return (
    <Tabs defaultValue="purchases">
      <TabsList>
        <TabsTrigger value="purchases" onClick={() => handleTabClick('purchases')}>Nueva Compra</TabsTrigger>
        <TabsTrigger value="history" onClick={() => handleTabClick('history')}>Historial de Compras</TabsTrigger>
        <TabsTrigger value="payments" onClick={() => handleTabClick('payments')}>Pagos</TabsTrigger>
      </TabsList>
      <Routes>
        <Route path="/purchases" element={
          <TabsContent value="purchases">
            <Purchases />
          </TabsContent>
        }/>
        <Route path="/history" element={
          <TabsContent value="history">
            <History />
          </TabsContent>
        }/>
        <Route path="/payments" element={
          <TabsContent value="payments">
            <Payments />
          </TabsContent>
        }/>
      </Routes>
    </Tabs>
  );
}