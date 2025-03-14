
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardContracts from '@/components/ui/DashboardContracts';

const Contracts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-10 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Gestão de Contratos</h1>
            <p className="text-kubico-gray-medium">
              Visualize e gerencie todos os seus contratos de compra, venda e aluguel.
            </p>
          </div>
          
          <DashboardContracts />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contracts;
