
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, FileText, Download, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Dados de exemplo dos contratos
const contractsData = [
  {
    id: 'CT001',
    title: 'Contrato de Compra e Venda - Apartamento Copacabana',
    propertyAddress: 'Av. Atlântica, 1500, Copacabana, Rio de Janeiro - RJ',
    type: 'Compra e Venda',
    status: 'Ativo',
    startDate: '2023-05-15',
    endDate: '2024-05-14',
    value: 1850000,
    counterparty: 'João Carlos Oliveira',
    lastUpdated: '2023-05-15'
  },
  {
    id: 'CT002',
    title: 'Contrato de Aluguel - Casa em Condomínio',
    propertyAddress: 'Rua das Palmeiras, 250, Jardim Europa, São Paulo - SP',
    type: 'Aluguel',
    status: 'Pendente',
    startDate: '2023-11-01',
    endDate: '2025-10-31',
    value: 5500,
    counterparty: 'Maria Helena Santos',
    lastUpdated: '2023-10-25'
  },
  {
    id: 'CT003',
    title: 'Contrato de Intermediação - Venda de Terreno',
    propertyAddress: 'Rod. BR-101, Km 35, Zona Rural, Florianópolis - SC',
    type: 'Intermediação',
    status: 'Finalizado',
    startDate: '2023-02-10',
    endDate: '2023-08-10',
    value: 75000,
    counterparty: 'Incorporadora Porto Seguro LTDA',
    lastUpdated: '2023-08-12'
  }
];

const DashboardContracts = () => {
  const [activeTab, setActiveTab] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [contracts, setContracts] = useState(contractsData);
  
  // Função para formatar valores monetários
  const formatCurrency = (value: number, isMonthly = false) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }) + (isMonthly && value < 100000 ? '/mês' : '');
  };
  
  // Função para formatar datas
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  // Filtrar contratos com base na aba selecionada
  const filteredContracts = contracts.filter(contract => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'ativos') return contract.status === 'Ativo';
    if (activeTab === 'pendentes') return contract.status === 'Pendente';
    if (activeTab === 'finalizados') return contract.status === 'Finalizado';
    return true;
  });
  
  // Aplicar busca aos contratos filtrados
  const searchedContracts = searchQuery 
    ? filteredContracts.filter(contract => 
        contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredContracts;
  
  // Renderizar o status do contrato com o estilo apropriado
  const renderStatus = (status: string) => {
    switch (status) {
      case 'Ativo':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            Ativo
          </Badge>
        );
      case 'Pendente':
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            Pendente
          </Badge>
        );
      case 'Finalizado':
        return (
          <Badge variant="outline" className="text-kubico-gray-medium">
            Finalizado
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Barra de ações */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kubico-gray-medium h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Buscar contratos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filtrar</span>
            </Button>
            
            <Button size="sm" className="gap-1 bg-kubico-blue hover:bg-kubico-blue/90">
              <Plus className="h-4 w-4" />
              <span>Novo Contrato</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Tabs para filtrar por status */}
      <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="ativos">Ativos</TabsTrigger>
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
          <TabsTrigger value="finalizados">Finalizados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="todos" className="space-y-4">
          {searchedContracts.length > 0 ? (
            searchedContracts.map((contract) => (
              <ContractCard 
                key={contract.id}
                contract={contract}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                renderStatus={renderStatus}
              />
            ))
          ) : (
            <EmptyState type="todos" />
          )}
        </TabsContent>
        
        <TabsContent value="ativos" className="space-y-4">
          {searchedContracts.length > 0 ? (
            searchedContracts.map((contract) => (
              <ContractCard 
                key={contract.id}
                contract={contract}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                renderStatus={renderStatus}
              />
            ))
          ) : (
            <EmptyState type="ativos" />
          )}
        </TabsContent>
        
        <TabsContent value="pendentes" className="space-y-4">
          {searchedContracts.length > 0 ? (
            searchedContracts.map((contract) => (
              <ContractCard 
                key={contract.id}
                contract={contract}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                renderStatus={renderStatus}
              />
            ))
          ) : (
            <EmptyState type="pendentes" />
          )}
        </TabsContent>
        
        <TabsContent value="finalizados" className="space-y-4">
          {searchedContracts.length > 0 ? (
            searchedContracts.map((contract) => (
              <ContractCard 
                key={contract.id}
                contract={contract}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                renderStatus={renderStatus}
              />
            ))
          ) : (
            <EmptyState type="finalizados" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Componente para exibir um contrato individual
interface ContractCardProps {
  contract: typeof contractsData[0];
  formatCurrency: (value: number, isMonthly?: boolean) => string;
  formatDate: (dateString: string) => string;
  renderStatus: (status: string) => React.ReactNode;
}

const ContractCard: React.FC<ContractCardProps> = ({ 
  contract, 
  formatCurrency, 
  formatDate,
  renderStatus
}) => {
  const isMonthly = contract.type === 'Aluguel';
  
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-kubico-gray-medium font-medium">
              {contract.id}
            </span>
            {renderStatus(contract.status)}
          </div>
          
          <h3 className="font-medium text-lg mb-1">{contract.title}</h3>
          
          <p className="text-kubico-gray-medium text-sm mb-3">
            {contract.propertyAddress}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-kubico-gray-medium">Tipo</p>
              <p className="font-medium">{contract.type}</p>
            </div>
            
            <div>
              <p className="text-kubico-gray-medium">Valor</p>
              <p className="font-medium">{formatCurrency(contract.value, isMonthly)}</p>
            </div>
            
            <div>
              <p className="text-kubico-gray-medium">Vigência</p>
              <p className="font-medium">
                {formatDate(contract.startDate)} - {formatDate(contract.endDate)}
              </p>
            </div>
            
            <div>
              <p className="text-kubico-gray-medium">Contraparte</p>
              <p className="font-medium">{contract.counterparty}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap md:flex-nowrap gap-2">
          <Button variant="outline" size="sm" className="w-full md:w-auto">
            <Eye className="h-4 w-4 mr-2" />
            Visualizar
          </Button>
          
          <Button variant="outline" size="sm" className="w-full md:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Baixar
          </Button>
        </div>
      </div>
    </div>
  );
};

// Componente para quando não há contratos
interface EmptyStateProps {
  type: 'todos' | 'ativos' | 'pendentes' | 'finalizados';
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  const getMessage = () => {
    switch (type) {
      case 'ativos':
        return 'Você não possui contratos ativos no momento.';
      case 'pendentes':
        return 'Você não possui contratos pendentes no momento.';
      case 'finalizados':
        return 'Você não possui contratos finalizados no momento.';
      default:
        return 'Você ainda não cadastrou nenhum contrato na plataforma.';
    }
  };
  
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm text-center">
      <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <FileText className="h-8 w-8 text-kubico-gray-medium" />
      </div>
      <h3 className="text-lg font-medium mb-2">Nenhum contrato encontrado</h3>
      <p className="text-kubico-gray-medium mb-6">
        {getMessage()}
      </p>
      <Button className="bg-kubico-blue hover:bg-kubico-blue/90">
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Contrato
      </Button>
    </div>
  );
};

export default DashboardContracts;
