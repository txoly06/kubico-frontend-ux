
import React, { useState } from 'react';
import { 
  Edit, 
  FileText, 
  FileSignature, 
  Check, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Download, 
  Trash
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  icon: React.ReactNode;
  date?: string;
  participants?: Participant[];
}

interface Participant {
  id: string;
  name: string;
  role: string;
  status: 'waiting' | 'completed' | 'rejected' | 'expired';
  date?: string;
}

interface ContractWorkflowProps {
  contractId: string;
  onSign?: () => void;
  onReject?: () => void;
  onDownload?: () => void;
}

const ContractWorkflow: React.FC<ContractWorkflowProps> = ({
  contractId,
  onSign,
  onReject,
  onDownload
}) => {
  const { toast } = useToast();
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  
  // Estados iniciais do workflow
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    {
      id: 'draft',
      name: 'Elaboração do Contrato',
      description: 'Elaboração e personalização dos termos do contrato de acordo com as necessidades específicas.',
      status: 'completed',
      icon: <Edit className="h-5 w-5" />,
      date: '15/05/2023',
      participants: [
        {
          id: 'u1',
          name: 'Marcelo Santos',
          role: 'Corretor',
          status: 'completed',
          date: '15/05/2023'
        }
      ]
    },
    {
      id: 'review',
      name: 'Revisão Jurídica',
      description: 'Análise dos termos do contrato pelo departamento jurídico para validação legal.',
      status: 'completed',
      icon: <FileText className="h-5 w-5" />,
      date: '20/05/2023',
      participants: [
        {
          id: 'u2',
          name: 'Ana Jurídico',
          role: 'Advogada',
          status: 'completed',
          date: '20/05/2023'
        }
      ]
    },
    {
      id: 'signature',
      name: 'Assinaturas',
      description: 'Coleta de assinaturas de todas as partes envolvidas no contrato.',
      status: 'active',
      icon: <FileSignature className="h-5 w-5" />,
      participants: [
        {
          id: 'u3',
          name: 'João Carlos Oliveira',
          role: 'Comprador',
          status: 'completed',
          date: '22/05/2023'
        },
        {
          id: 'u4',
          name: 'Você',
          role: 'Vendedor',
          status: 'waiting'
        }
      ]
    },
    {
      id: 'completion',
      name: 'Conclusão',
      description: 'Finalização do processo e distribuição do contrato assinado.',
      status: 'pending',
      icon: <CheckCircle className="h-5 w-5" />
    }
  ]);
  
  // Calcular o progresso geral do workflow
  const calculateProgress = () => {
    const totalSteps = workflowSteps.length;
    const completedSteps = workflowSteps.filter(step => step.status === 'completed').length;
    const activeStep = workflowSteps.find(step => step.status === 'active');
    
    // Se há um passo ativo, contamos como 0.5 para o progresso
    const progress = ((completedSteps + (activeStep ? 0.5 : 0)) / totalSteps) * 100;
    return Math.round(progress);
  };
  
  // Alternar a expansão de um passo
  const toggleStepExpansion = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };
  
  // Assinar o contrato
  const handleSign = () => {
    // Atualizar o status do participante atual
    setWorkflowSteps(prevSteps =>
      prevSteps.map(step => {
        if (step.id === 'signature') {
          return {
            ...step,
            participants: step.participants?.map(participant => {
              if (participant.name === 'Você') {
                return {
                  ...participant,
                  status: 'completed',
                  date: new Date().toLocaleDateString('pt-BR')
                };
              }
              return participant;
            }),
            status: 'completed',
            date: new Date().toLocaleDateString('pt-BR')
          };
        }
        
        // Avançar para o próximo passo
        if (step.id === 'completion') {
          return {
            ...step,
            status: 'active'
          };
        }
        
        return step;
      })
    );
    
    toast({
      title: "Contrato assinado com sucesso!",
      description: "O contrato foi assinado digitalmente e está em processamento final.",
    });
    
    // Chamar o callback, se fornecido
    if (onSign) onSign();
  };
  
  // Renderizar o status do passo com o estilo apropriado
  const renderStepStatus = (status: 'pending' | 'active' | 'completed' | 'failed') => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center text-green-500">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>Concluído</span>
          </div>
        );
      case 'active':
        return (
          <div className="flex items-center text-blue-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>Em andamento</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center text-red-500">
            <X className="h-4 w-4 mr-1" />
            <span>Falhou</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            <span>Pendente</span>
          </div>
        );
    }
  };
  
  // Renderizar o status do participante
  const renderParticipantStatus = (status: 'waiting' | 'completed' | 'rejected' | 'expired') => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center text-green-500">
            <Check className="h-4 w-4 mr-1" />
            <span>Assinado</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center text-red-500">
            <X className="h-4 w-4 mr-1" />
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
          <div className="flex items-center text-amber-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>Aguardando</span>
          </div>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Status do Contrato</h3>
            <p className="text-sm text-kubico-gray-medium">Acompanhe o progresso de todas as etapas do contrato</p>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-kubico-blue">{calculateProgress()}%</div>
            <p className="text-xs text-kubico-gray-medium">concluído</p>
          </div>
        </div>
        
        <Progress value={calculateProgress()} className="h-2 mb-6" />
        
        <div className="space-y-4">
          {workflowSteps.map((step, index) => (
            <div 
              key={step.id}
              className={cn(
                "border rounded-lg transition-all",
                step.status === 'completed' ? "border-green-100 bg-green-50" :
                step.status === 'active' ? "border-blue-100 bg-blue-50" :
                step.status === 'failed' ? "border-red-100 bg-red-50" :
                "border-gray-100 bg-gray-50"
              )}
            >
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleStepExpansion(step.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mr-3",
                      step.status === 'completed' ? "bg-green-100 text-green-500" :
                      step.status === 'active' ? "bg-blue-100 text-blue-500" :
                      step.status === 'failed' ? "bg-red-100 text-red-500" :
                      "bg-gray-100 text-gray-400"
                    )}>
                      {step.icon}
                    </div>
                    
                    <div>
                      <h4 className="font-medium">{step.name}</h4>
                      {step.date && (
                        <p className="text-xs text-kubico-gray-medium">{step.date}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {renderStepStatus(step.status)}
                    <div className="ml-3">
                      {expandedStep === step.id ? (
                        <ChevronDown className="h-5 w-5 text-kubico-gray-medium" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-kubico-gray-medium" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {expandedStep === step.id && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                  <p className="text-sm text-kubico-gray-dark mb-4">{step.description}</p>
                  
                  {step.participants && step.participants.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium mb-2">Participantes</h5>
                      <div className="space-y-2">
                        {step.participants.map((participant) => (
                          <div key={participant.id} className="flex items-center justify-between p-2 bg-white rounded border border-gray-100">
                            <div>
                              <p className="font-medium text-sm">{participant.name}</p>
                              <p className="text-xs text-kubico-gray-medium">{participant.role}</p>
                            </div>
                            
                            <div className="flex items-center">
                              {renderParticipantStatus(participant.status)}
                              {participant.date && (
                                <span className="text-xs text-kubico-gray-medium ml-2">{participant.date}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Seta de conexão entre passos */}
              {index < workflowSteps.length - 1 && (
                <div className="flex justify-center my-2">
                  <ArrowRight className="h-5 w-5 text-kubico-gray-medium" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Ações disponíveis para o contrato */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Ações Disponíveis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className={`flex items-center justify-center ${
              workflowSteps.find(step => step.id === 'signature')?.status === 'active'
                ? 'bg-kubico-blue hover:bg-kubico-blue/90'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200'
            }`}
            disabled={workflowSteps.find(step => step.id === 'signature')?.status !== 'active'}
            onClick={handleSign}
          >
            <FileSignature className="h-5 w-5 mr-2" />
            Assinar Contrato
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center"
            onClick={onDownload}
          >
            <Download className="h-5 w-5 mr-2" />
            Baixar Contrato
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
            onClick={onReject}
          >
            <Trash className="h-5 w-5 mr-2" />
            Rejeitar Contrato
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContractWorkflow;
