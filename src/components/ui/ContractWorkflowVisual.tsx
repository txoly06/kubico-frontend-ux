
import React, { useState } from 'react';
import { CheckCircle, XCircle, PenTool, Clock, FileText, Eye, Download, ArrowLeftRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export type ContractWorkflowStage = 'draft' | 'review' | 'pending_signature' | 'signed' | 'rejected' | 'expired';

interface ContractWorkflowVisualProps {
  contractId: string;
  workflowStatus: ContractWorkflowStage;
  workflowHistory: {
    date: string;
    status: ContractWorkflowStage;
    user: string;
    action: string;
  }[];
  documentUrl?: string;
  onStatusChange?: (contractId: string, newStatus: ContractWorkflowStage) => void;
}

const ContractWorkflowVisual: React.FC<ContractWorkflowVisualProps> = ({
  contractId,
  workflowStatus,
  workflowHistory,
  documentUrl,
  onStatusChange
}) => {
  const { toast } = useToast();
  const [signDialogOpen, setSignDialogOpen] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  
  // Estágios do workflow
  const stages: { key: ContractWorkflowStage; label: string; icon: JSX.Element }[] = [
    { 
      key: 'draft', 
      label: 'Rascunho', 
      icon: <FileText className="h-5 w-5 text-gray-500" /> 
    },
    { 
      key: 'review', 
      label: 'Revisão', 
      icon: <Eye className="h-5 w-5 text-amber-500" /> 
    },
    { 
      key: 'pending_signature', 
      label: 'Assinatura', 
      icon: <PenTool className="h-5 w-5 text-blue-500" /> 
    },
    { 
      key: 'signed', 
      label: 'Assinado', 
      icon: <CheckCircle className="h-5 w-5 text-green-500" /> 
    }
  ];
  
  // Índice do estágio atual
  const currentStageIndex = stages.findIndex(stage => stage.key === workflowStatus);
  const progressValue = workflowStatus === 'rejected' || workflowStatus === 'expired'
    ? 100
    : ((currentStageIndex + 1) / stages.length) * 100;
  
  // Status do workflow em português
  const getStatusText = (status: ContractWorkflowStage): string => {
    switch (status) {
      case 'draft': return 'Rascunho';
      case 'review': return 'Em Revisão';
      case 'pending_signature': return 'Aguardando Assinatura';
      case 'signed': return 'Assinado';
      case 'rejected': return 'Rejeitado';
      case 'expired': return 'Expirado';
      default: return 'Desconhecido';
    }
  };
  
  // Ícone do status
  const getStatusIcon = (status: ContractWorkflowStage): JSX.Element => {
    switch (status) {
      case 'draft': return <FileText className="h-5 w-5 text-gray-500" />;
      case 'review': return <Eye className="h-5 w-5 text-amber-500" />;
      case 'pending_signature': return <PenTool className="h-5 w-5 text-blue-500" />;
      case 'signed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'expired': return <Clock className="h-5 w-5 text-gray-400" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Cor da barra de progresso
  const getProgressColor = (status: ContractWorkflowStage): string => {
    switch (status) {
      case 'signed': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'expired': return 'bg-gray-400';
      default: return '';
    }
  };
  
  // Função para assinar o contrato
  const handleSignContract = () => {
    if (!signature) {
      toast({
        title: "Assinatura necessária",
        description: "Por favor, adicione sua assinatura para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    if (onStatusChange) {
      onStatusChange(contractId, 'signed');
    }
    
    setSignDialogOpen(false);
    setSignature(null);
    
    toast({
      title: "Contrato assinado com sucesso!",
      description: "Sua assinatura digital foi registrada.",
    });
  };
  
  // Mock de uma área de assinatura simples
  const SignatureArea = () => {
    return (
      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-2">Escolha como deseja assinar:</p>
        
        <div className="space-y-4">
          <div 
            className={`border rounded-md p-4 cursor-pointer ${signature === 'digital' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            onClick={() => setSignature('digital')}
          >
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full border mr-2 flex items-center justify-center">
                {signature === 'digital' && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
              </div>
              <span>Assinatura Digital Certificada</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-6">
              Assinatura com certificado digital oficial
            </p>
          </div>
          
          <div 
            className={`border rounded-md p-4 cursor-pointer ${signature === 'eletronica' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            onClick={() => setSignature('eletronica')}
          >
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full border mr-2 flex items-center justify-center">
                {signature === 'eletronica' && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
              </div>
              <span>Assinatura Eletrônica</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-6">
              Confirmar por e-mail e senha
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Status do Contrato</span>
          <div className="flex items-center text-sm font-normal bg-gray-100 px-3 py-1 rounded-full">
            {getStatusIcon(workflowStatus)}
            <span className="ml-1">{getStatusText(workflowStatus)}</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Visualização do workflow */}
        <div className="mb-8">
          <Progress 
            value={progressValue} 
            className={`h-2 ${getProgressColor(workflowStatus)}`} 
          />
          
          <div className="flex justify-between mt-3">
            {stages.map((stage, index) => (
              <div 
                key={stage.key} 
                className={`flex flex-col items-center transition-colors relative ${
                  (currentStageIndex >= index || workflowStatus === 'rejected' || workflowStatus === 'expired') 
                    ? 'text-kubico-blue' 
                    : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full mb-1 flex items-center justify-center ${
                    (currentStageIndex >= index || workflowStatus === 'rejected' || workflowStatus === 'expired')
                      ? (workflowStatus === 'rejected' && index === 3) 
                        ? 'bg-red-100 text-red-500'
                        : (workflowStatus === 'expired' && index === 3)
                          ? 'bg-gray-100 text-gray-500'
                          : 'bg-blue-100'
                      : 'bg-gray-100'
                  }`}
                >
                  {(index === 3 && workflowStatus === 'rejected') ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : (index === 3 && workflowStatus === 'expired') ? (
                    <Clock className="h-5 w-5 text-gray-500" />
                  ) : (
                    stage.icon
                  )}
                </div>
                <span className="text-xs">{stage.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Botões de ação baseados no status */}
        <div className="flex flex-wrap gap-2 mb-6">
          {/* Visualizar contrato */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Eye className="h-4 w-4 mr-2" />
                Visualizar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl h-[80vh]">
              <DialogHeader>
                <DialogTitle>Contrato #{contractId}</DialogTitle>
                <DialogDescription>
                  Visualização do documento contratual
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
          
          {/* Baixar contrato */}
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Download className="h-4 w-4 mr-2" />
            Baixar
          </Button>
          
          {/* Botões condicionais baseados no status */}
          {workflowStatus === 'draft' && (
            <Button 
              size="sm" 
              className="flex-1 sm:flex-none bg-amber-500 hover:bg-amber-600"
              onClick={() => onStatusChange && onStatusChange(contractId, 'review')}
            >
              <Eye className="h-4 w-4 mr-2" />
              Enviar para Revisão
            </Button>
          )}
          
          {workflowStatus === 'review' && (
            <Button 
              size="sm" 
              className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600"
              onClick={() => onStatusChange && onStatusChange(contractId, 'pending_signature')}
            >
              <ArrowLeftRight className="h-4 w-4 mr-2" />
              Aprovar para Assinatura
            </Button>
          )}
          
          {workflowStatus === 'pending_signature' && (
            <Dialog open={signDialogOpen} onOpenChange={setSignDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  className="flex-1 sm:flex-none bg-kubico-blue hover:bg-kubico-blue/90"
                >
                  <PenTool className="h-4 w-4 mr-2" />
                  Assinar Contrato
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Assinar Contrato #{contractId}</DialogTitle>
                  <DialogDescription>
                    Escolha a forma de assinatura para concluir o contrato
                  </DialogDescription>
                </DialogHeader>
                
                <SignatureArea />
                
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setSignDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSignContract}>
                    Confirmar Assinatura
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          
          {workflowStatus === 'signed' && (
            <Button 
              size="sm" 
              className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600"
              disabled
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Contrato Concluído
            </Button>
          )}
        </div>
        
        {/* Histórico do workflow */}
        <div>
          <h4 className="text-sm font-medium mb-3">Histórico de Atividades</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {workflowHistory.map((event, index) => (
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
                <div 
                  className="absolute w-2 h-2 rounded-full -left-[5px] top-1.5"
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
                  <span className="text-kubico-gray-medium">
                    {new Date(event.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <p className="text-kubico-gray-medium">{event.user}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractWorkflowVisual;
