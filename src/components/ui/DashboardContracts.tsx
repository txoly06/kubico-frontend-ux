
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, FileText, Download, Eye, FileSignature, Clock, CheckCircle, History, XCircle, Edit, Trash } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

// Dados de exemplo dos contratos
const contractsData = [
  {
    id: 'CT001',
    title: 'Contrato de Compra e Venda - Apartamento Copacabana',
    propertyAddress: 'Av. Atlântica, 1500, Copacabana, Rio de Janeiro - RJ',
    type: 'Compra e Venda',
    status: 'Ativo',
    workflowStatus: 'signed', // novo: draft, review, pending_signature, signed, rejected, expired
    startDate: '2023-05-15',
    endDate: '2024-05-14',
    value: 1850000,
    counterparty: 'João Carlos Oliveira',
    lastUpdated: '2023-05-15',
    documentUrl: '/docs/sample-contract.pdf',
    signatureDate: '2023-05-15',
    workflowHistory: [
      { date: '2023-05-01', status: 'draft', user: 'Você', action: 'Criou o contrato' },
      { date: '2023-05-05', status: 'review', user: 'Você', action: 'Enviou para revisão' },
      { date: '2023-05-10', status: 'pending_signature', user: 'Ana Jurídico', action: 'Aprovou o contrato' },
      { date: '2023-05-15', status: 'signed', user: 'João Carlos Oliveira', action: 'Assinou o contrato' },
      { date: '2023-05-15', status: 'signed', user: 'Você', action: 'Assinou o contrato' },
    ]
  },
  {
    id: 'CT002',
    title: 'Contrato de Aluguel - Casa em Condomínio',
    propertyAddress: 'Rua das Palmeiras, 250, Jardim Europa, São Paulo - SP',
    type: 'Aluguel',
    status: 'Pendente',
    workflowStatus: 'pending_signature',
    startDate: '2023-11-01',
    endDate: '2025-10-31',
    value: 5500,
    counterparty: 'Maria Helena Santos',
    lastUpdated: '2023-10-25',
    documentUrl: '/docs/sample-rent.pdf',
    workflowHistory: [
      { date: '2023-10-15', status: 'draft', user: 'Você', action: 'Criou o contrato' },
      { date: '2023-10-18', status: 'review', user: 'Você', action: 'Enviou para revisão' },
      { date: '2023-10-22', status: 'pending_signature', user: 'Pedro Jurídico', action: 'Aprovou o contrato' },
    ]
  },
  {
    id: 'CT003',
    title: 'Contrato de Intermediação - Venda de Terreno',
    propertyAddress: 'Rod. BR-101, Km 35, Zona Rural, Florianópolis - SC',
    type: 'Intermediação',
    status: 'Finalizado',
    workflowStatus: 'expired',
    startDate: '2023-02-10',
    endDate: '2023-08-10',
    value: 75000,
    counterparty: 'Incorporadora Porto Seguro LTDA',
    lastUpdated: '2023-08-12',
    documentUrl: '/docs/sample-intermediation.pdf',
    workflowHistory: [
      { date: '2023-02-01', status: 'draft', user: 'Você', action: 'Criou o contrato' },
      { date: '2023-02-03', status: 'review', user: 'Você', action: 'Enviou para revisão' },
      { date: '2023-02-05', status: 'pending_signature', user: 'Carla Jurídico', action: 'Aprovou o contrato' },
      { date: '2023-02-10', status: 'signed', user: 'Incorporadora Porto Seguro', action: 'Assinou o contrato' },
      { date: '2023-02-10', status: 'signed', user: 'Você', action: 'Assinou o contrato' },
      { date: '2023-08-10', status: 'expired', user: 'Sistema', action: 'Contrato expirado' },
    ]
  },
  {
    id: 'CT004',
    title: 'Contrato de Permuta - Lote Comercial',
    propertyAddress: 'Av. Paulista, 1000, Bela Vista, São Paulo - SP',
    type: 'Permuta',
    status: 'Pendente',
    workflowStatus: 'review',
    startDate: '2023-11-20',
    endDate: '2024-11-19',
    value: 3200000,
    counterparty: 'Construtora Horizonte S.A.',
    lastUpdated: '2023-11-15',
    documentUrl: '/docs/draft-exchange.pdf',
    workflowHistory: [
      { date: '2023-11-10', status: 'draft', user: 'Você', action: 'Criou o contrato' },
      { date: '2023-11-15', status: 'review', user: 'Você', action: 'Enviou para revisão' },
    ]
  },
  {
    id: 'CT005',
    title: 'Contrato de Compra e Venda - Cobertura Duplex',
    propertyAddress: 'Rua Oscar Freire, 500, Jardins, São Paulo - SP',
    type: 'Compra e Venda',
    status: 'Pendente',
    workflowStatus: 'rejected',
    startDate: '2023-09-05',
    endDate: '2024-09-04',
    value: 4500000,
    counterparty: 'Roberto Mendes Silva',
    lastUpdated: '2023-09-20',
    documentUrl: '/docs/rejected-contract.pdf',
    workflowHistory: [
      { date: '2023-09-01', status: 'draft', user: 'Você', action: 'Criou o contrato' },
      { date: '2023-09-05', status: 'review', user: 'Você', action: 'Enviou para revisão' },
      { date: '2023-09-10', status: 'pending_signature', user: 'Marcos Jurídico', action: 'Aprovou o contrato' },
      { date: '2023-09-20', status: 'rejected', user: 'Roberto Mendes Silva', action: 'Rejeitou o contrato' },
    ]
  }
];

const DashboardContracts = () => {
  const { toast } = useToast();
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

  // Renderizar o status do workflow com o estilo e ícone apropriado
  const renderWorkflowStatus = (status: string) => {
    switch (status) {
      case 'draft':
        return (
          <div className="flex items-center text-gray-500">
            <Edit className="h-4 w-4 mr-1" />
            <span>Rascunho</span>
          </div>
        );
      case 'review':
        return (
          <div className="flex items-center text-amber-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>Em Revisão</span>
          </div>
        );
      case 'pending_signature':
        return (
          <div className="flex items-center text-blue-500">
            <FileSignature className="h-4 w-4 mr-1" />
            <span>Aguardando Assinatura</span>
          </div>
        );
      case 'signed':
        return (
          <div className="flex items-center text-green-500">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>Assinado</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center text-red-500">
            <XCircle className="h-4 w-4 mr-1" />
            <span>Rejeitado</span>
          </div>
        );
      case 'expired':
        return (
          <div className="flex items-center text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            <span>Expirado</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{status}</span>
          </div>
        );
    }
  };

  // Renderizar o progresso do workflow
  const renderWorkflowProgress = (status: string) => {
    const stages = ['draft', 'review', 'pending_signature', 'signed'];
    const stageIndex = stages.indexOf(status);
    
    // Lidar com casos especiais como 'rejected' ou 'expired'
    if (status === 'rejected' || status === 'expired') {
      return (
        <div>
          <Progress value={100} className={status === 'rejected' ? 'bg-red-100' : 'bg-gray-100'} />
          <div className="flex justify-between text-xs mt-1 text-gray-500">
            <span>Rascunho</span>
            <span>Revisão</span>
            <span>Assinaturas</span>
            <span>Concluído</span>
          </div>
        </div>
      );
    }
    
    // Para estados normais do workflow
    let progressValue = 0;
    if (stageIndex >= 0) {
      progressValue = ((stageIndex + 1) / stages.length) * 100;
    }
    
    return (
      <div>
        <Progress value={progressValue} className="bg-gray-100" />
        <div className="flex justify-between text-xs mt-1 text-gray-500">
          <span className={stageIndex >= 0 ? 'font-medium text-kubico-blue' : ''}>Rascunho</span>
          <span className={stageIndex >= 1 ? 'font-medium text-kubico-blue' : ''}>Revisão</span>
          <span className={stageIndex >= 2 ? 'font-medium text-kubico-blue' : ''}>Assinaturas</span>
          <span className={stageIndex >= 3 ? 'font-medium text-kubico-blue' : ''}>Concluído</span>
        </div>
      </div>
    );
  };

  const handleSignContract = (contractId: string) => {
    setContracts(prevContracts =>
      prevContracts.map(contract =>
        contract.id === contractId && contract.workflowStatus === 'pending_signature'
          ? {
              ...contract,
              workflowStatus: 'signed',
              status: 'Ativo',
              workflowHistory: [
                ...(contract.workflowHistory || []),
                {
                  date: new Date().toISOString().split('T')[0],
                  status: 'signed',
                  user: 'Você',
                  action: 'Assinou o contrato'
                }
              ]
            }
          : contract
      )
    );

    toast({
      title: "Contrato assinado com sucesso!",
      description: "O contrato foi assinado digitalmente e está ativo.",
    });
  };

  const handleDeleteContract = (contractId: string) => {
    setContracts(prevContracts => prevContracts.filter(contract => contract.id !== contractId));
    
    toast({
      title: "Contrato excluído",
      description: "O contrato foi removido permanentemente.",
    });
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
                renderWorkflowStatus={renderWorkflowStatus}
                renderWorkflowProgress={renderWorkflowProgress}
                onSignContract={handleSignContract}
                onDeleteContract={handleDeleteContract}
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
                renderWorkflowStatus={renderWorkflowStatus}
                renderWorkflowProgress={renderWorkflowProgress}
                onSignContract={handleSignContract}
                onDeleteContract={handleDeleteContract}
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
                renderWorkflowStatus={renderWorkflowStatus}
                renderWorkflowProgress={renderWorkflowProgress}
                onSignContract={handleSignContract}
                onDeleteContract={handleDeleteContract}
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
                renderWorkflowStatus={renderWorkflowStatus}
                renderWorkflowProgress={renderWorkflowProgress}
                onSignContract={handleSignContract}
                onDeleteContract={handleDeleteContract}
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
  contract: any;
  formatCurrency: (value: number, isMonthly?: boolean) => string;
  formatDate: (dateString: string) => string;
  renderStatus: (status: string) => React.ReactNode;
  renderWorkflowStatus: (status: string) => React.ReactNode;
  renderWorkflowProgress: (status: string) => React.ReactNode;
  onSignContract: (contractId: string) => void;
  onDeleteContract: (contractId: string) => void;
}

const ContractCard: React.FC<ContractCardProps> = ({ 
  contract, 
  formatCurrency, 
  formatDate,
  renderStatus,
  renderWorkflowStatus,
  renderWorkflowProgress,
  onSignContract,
  onDeleteContract
}) => {
  const isMonthly = contract.type === 'Aluguel';
  
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-4">
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
          </div>
          
          <div className="flex flex-wrap md:flex-nowrap gap-2 shrink-0">
            {/* Botão para visualizar o contrato */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full md:w-auto">
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl h-[80vh]">
                <DialogHeader>
                  <DialogTitle>{contract.title}</DialogTitle>
                  <DialogDescription>
                    Visualização do contrato. ID: {contract.id}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex-grow h-full mt-4">
                  <div className="bg-gray-100 h-full rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="h-12 w-12 text-kubico-gray-medium mx-auto mb-4" />
                      <p className="text-kubico-gray-medium">
                        Preview do documento PDF. Em ambiente de produção,<br /> 
                        este seria o PDF real do contrato.
                      </p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            {/* Botão para baixar o contrato */}
            <Button variant="outline" size="sm" className="w-full md:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Baixar
            </Button>
            
            {/* Botão para assinar o contrato (apenas se estiver aguardando assinatura) */}
            {contract.workflowStatus === 'pending_signature' && (
              <Button 
                className="w-full md:w-auto bg-kubico-blue hover:bg-kubico-blue/90"
                size="sm"
                onClick={() => onSignContract(contract.id)}
              >
                <FileSignature className="h-4 w-4 mr-2" />
                Assinar
              </Button>
            )}
          </div>
        </div>
        
        {/* Status do Workflow e Progresso */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="flex-grow">
              <h4 className="text-sm font-medium mb-2">Status do Processo</h4>
              {renderWorkflowStatus(contract.workflowStatus)}
            </div>
            <div className="w-full lg:w-2/3">
              <h4 className="text-sm font-medium mb-2">Progresso</h4>
              {renderWorkflowProgress(contract.workflowStatus)}
            </div>
          </div>
        </div>
        
        {/* Detalhes do Contrato */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-gray-100 pt-4">
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
        
        {/* Histórico do fluxo de trabalho */}
        <div className="mt-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="link" size="sm" className="text-kubico-gray-medium p-0 h-auto">
                <History className="h-4 w-4 mr-1" />
                Ver histórico
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <h4 className="font-medium mb-2">Histórico do Contrato</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {contract.workflowHistory?.map((event: any, index: number) => (
                  <div 
                    key={index} 
                    className="text-sm border-l-2 pl-3 pb-3 relative"
                    style={{
                      borderColor: 
                        event.status === 'signed' ? 'rgb(34, 197, 94)' : 
                        event.status === 'rejected' ? 'rgb(239, 68, 68)' : 
                        event.status === 'pending_signature' ? 'rgb(59, 130, 246)' : 
                        event.status === 'review' ? 'rgb(245, 158, 11)' : 
                        'rgb(209, 213, 219)'
                    }}
                  >
                    <div className="absolute w-2 h-2 rounded-full -left-[5px] top-1.5"
                      style={{
                        backgroundColor: 
                          event.status === 'signed' ? 'rgb(34, 197, 94)' : 
                          event.status === 'rejected' ? 'rgb(239, 68, 68)' : 
                          event.status === 'pending_signature' ? 'rgb(59, 130, 246)' : 
                          event.status === 'review' ? 'rgb(245, 158, 11)' : 
                          'rgb(209, 213, 219)'
                      }}
                    />
                    <div className="flex justify-between">
                      <strong>{event.action}</strong>
                      <span className="text-kubico-gray-medium">{formatDate(event.date)}</span>
                    </div>
                    <p className="text-kubico-gray-medium">{event.user}</p>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Ações adicionais */}
        <div className="flex justify-end border-t border-gray-100 pt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                <Trash className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Excluir contrato</DialogTitle>
                <DialogDescription>
                  Você tem certeza que deseja excluir este contrato? Esta ação não pode ser desfeita.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline">Cancelar</Button>
                <Button variant="destructive" onClick={() => onDeleteContract(contract.id)}>
                  Excluir
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
