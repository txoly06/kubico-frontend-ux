import React, { useState, Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, ListFilter } from 'lucide-react';
import LoadingState from '@/components/ui/LoadingState';
import ContractWorkflowVisual from '@/components/ui/ContractWorkflowVisual';
import { ContractWorkflowStage } from '@/components/ui/ContractWorkflowVisual';

// Usando lazy loading para o componente pesado
const DashboardContracts = React.lazy(() => import('@/components/ui/DashboardContracts'));

// Dados de exemplo para detalhes do contrato
const contractExample = {
  id: 'CT002',
  title: 'Contrato de Aluguel - Casa em Condomínio',
  propertyAddress: 'Rua das Palmeiras, 250, Jardim Europa, São Paulo - SP',
  type: 'Aluguel',
  status: 'Pendente',
  workflowStatus: 'pending_signature' as ContractWorkflowStage,
  startDate: '2023-11-01',
  endDate: '2025-10-31',
  value: 5500,
  counterparty: 'Maria Helena Santos',
  lastUpdated: '2023-10-25',
  documentUrl: '/docs/sample-rent.pdf',
  workflowHistory: [
    { date: '2023-10-15', status: 'draft' as ContractWorkflowStage, user: 'Você', action: 'Criou o contrato' },
    { date: '2023-10-18', status: 'review' as ContractWorkflowStage, user: 'Você', action: 'Enviou para revisão' },
    { date: '2023-10-22', status: 'pending_signature' as ContractWorkflowStage, user: 'Pedro Jurídico', action: 'Aprovou o contrato' },
  ]
};

const Contracts = () => {
  const [activeView, setActiveView] = useState<'lista' | 'workflow'>('lista');
  const [selectedContract, setSelectedContract] = useState(contractExample);
  
  // Mudar o status do contrato no workflow
  const handleContractStatusChange = (contractId: string, newStatus: ContractWorkflowStage) => {
    setSelectedContract(prev => {
      const now = new Date().toISOString().split('T')[0];
      
      // Atualizar o status
      const updatedContract = {
        ...prev,
        workflowStatus: newStatus,
        status: newStatus === 'signed' ? 'Ativo' : 
                newStatus === 'rejected' ? 'Cancelado' : 
                newStatus === 'expired' ? 'Finalizado' : 'Pendente',
        
        // Adicionar novo evento ao histórico
        workflowHistory: [
          ...prev.workflowHistory,
          { 
            date: now, 
            status: newStatus, 
            user: 'Você', 
            action: newStatus === 'signed' ? 'Assinou o contrato' :
                    newStatus === 'review' ? 'Enviou para revisão' :
                    newStatus === 'pending_signature' ? 'Aprovou para assinatura' :
                    newStatus === 'rejected' ? 'Rejeitou o contrato' :
                    newStatus === 'expired' ? 'Marcou contrato como expirado' :
                    'Atualizou o status do contrato'
          }
        ]
      };
      
      return updatedContract;
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-10 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Gestão de Contratos</h1>
                <p className="text-kubico-gray-medium">
                  Visualize e gerencie todos os seus contratos de compra, venda e aluguel.
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" className="flex items-center gap-1">
                  <ListFilter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filtrar</span>
                </Button>
                
                <Button className="bg-kubico-blue hover:bg-kubico-blue/90 flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Novo Contrato</span>
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="todos" className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <TabsList className="sm:w-auto">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="ativos">Ativos</TabsTrigger>
                <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
                <TabsTrigger value="finalizados">Finalizados</TabsTrigger>
              </TabsList>
              
              <div className="flex rounded-lg overflow-hidden border border-gray-200">
                <Button 
                  variant={activeView === 'lista' ? 'default' : 'outline'}
                  className={`rounded-none ${activeView === 'lista' ? 'bg-kubico-blue' : ''}`}
                  onClick={() => setActiveView('lista')}
                >
                  Lista de Contratos
                </Button>
                <Button 
                  variant={activeView === 'workflow' ? 'default' : 'outline'}
                  className={`rounded-none ${activeView === 'workflow' ? 'bg-kubico-blue' : ''}`}
                  onClick={() => setActiveView('workflow')}
                >
                  Workflow Visual
                </Button>
              </div>
            </div>
            
            {activeView === 'lista' ? (
              <Suspense fallback={<LoadingState variant="card" rows={3} className="mt-4" />}>
                <DashboardContracts />
              </Suspense>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {/* Preview do contrato */}
                  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-6">
                    <h2 className="text-xl font-bold mb-3">{selectedContract.title}</h2>
                    <div className="text-sm text-kubico-gray-medium mb-4">
                      <p><strong>ID:</strong> {selectedContract.id}</p>
                      <p><strong>Endereço:</strong> {selectedContract.propertyAddress}</p>
                      <p><strong>Tipo:</strong> {selectedContract.type}</p>
                      <p><strong>Valor:</strong> {selectedContract.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                      <p><strong>Vigência:</strong> {new Date(selectedContract.startDate).toLocaleDateString('pt-BR')} a {new Date(selectedContract.endDate).toLocaleDateString('pt-BR')}</p>
                      <p><strong>Contraparte:</strong> {selectedContract.counterparty}</p>
                    </div>
                    
                    <div className="bg-gray-100 h-[400px] rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <svg className="h-16 w-16 text-kubico-gray-medium mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-kubico-gray-medium">
                          Preview do documento contratual. Em ambiente de produção,<br /> 
                          este seria o PDF real do contrato.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  {/* Componente de workflow visual */}
                  <ContractWorkflowVisual 
                    contractId={selectedContract.id}
                    workflowStatus={selectedContract.workflowStatus}
                    workflowHistory={selectedContract.workflowHistory}
                    documentUrl={selectedContract.documentUrl}
                    onStatusChange={handleContractStatusChange}
                  />
                </div>
              </div>
            )}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contracts;
