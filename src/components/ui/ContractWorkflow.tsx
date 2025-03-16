
import React, { useState } from 'react';
import { CheckCircle, Circle, Clock, AlertCircle, File, FileCheck, Signature, SendHorizontal, CalendarCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

interface Step {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending' | 'failed';
  date?: string;
  icon: React.ReactNode;
}

interface ContractWorkflowProps {
  contractId: string;
  contractType: 'sale' | 'rent';
  onAction?: (action: string, stepId: string) => void;
}

const ContractWorkflow: React.FC<ContractWorkflowProps> = ({ 
  contractId, 
  contractType, 
  onAction 
}) => {
  const { toast } = useToast();
  
  // Definir etapas com base no tipo de contrato
  const getSaleWorkflowSteps = (): Step[] => [
    {
      id: 'proposal',
      title: 'Proposta Enviada',
      description: 'Proposta de compra enviada ao vendedor.',
      status: 'completed',
      date: '10/05/2023',
      icon: <SendHorizontal className="h-6 w-6" />
    },
    {
      id: 'proposal-accepted',
      title: 'Proposta Aceita',
      description: 'Vendedor aceitou a proposta de compra.',
      status: 'completed',
      date: '12/05/2023',
      icon: <CheckCircle className="h-6 w-6" />
    },
    {
      id: 'contract-generated',
      title: 'Contrato Gerado',
      description: 'Contrato de compra e venda gerado e aguardando assinaturas.',
      status: 'completed',
      date: '15/05/2023',
      icon: <File className="h-6 w-6" />
    },
    {
      id: 'buyer-sign',
      title: 'Assinatura do Comprador',
      description: 'Aguardando assinatura do comprador.',
      status: 'current',
      icon: <Signature className="h-6 w-6" />
    },
    {
      id: 'seller-sign',
      title: 'Assinatura do Vendedor',
      description: 'Aguardando assinatura do vendedor.',
      status: 'pending',
      icon: <Signature className="h-6 w-6" />
    },
    {
      id: 'payment',
      title: 'Pagamento',
      description: 'Aguardando confirmação do pagamento.',
      status: 'pending',
      icon: <CalendarCheck className="h-6 w-6" />
    },
    {
      id: 'completed',
      title: 'Finalizado',
      description: 'Contrato finalizado e registrado.',
      status: 'pending',
      icon: <FileCheck className="h-6 w-6" />
    }
  ];
  
  const getRentWorkflowSteps = (): Step[] => [
    {
      id: 'proposal',
      title: 'Proposta Enviada',
      description: 'Proposta de aluguel enviada ao proprietário.',
      status: 'completed',
      date: '10/05/2023',
      icon: <SendHorizontal className="h-6 w-6" />
    },
    {
      id: 'proposal-accepted',
      title: 'Proposta Aceita',
      description: 'Proprietário aceitou a proposta de aluguel.',
      status: 'completed',
      date: '12/05/2023',
      icon: <CheckCircle className="h-6 w-6" />
    },
    {
      id: 'document-check',
      title: 'Análise de Documentos',
      description: 'Documentos enviados e em análise.',
      status: 'completed',
      date: '15/05/2023',
      icon: <File className="h-6 w-6" />
    },
    {
      id: 'contract-generated',
      title: 'Contrato Gerado',
      description: 'Contrato de locação gerado e aguardando assinaturas.',
      status: 'completed',
      date: '18/05/2023',
      icon: <File className="h-6 w-6" />
    },
    {
      id: 'tenant-sign',
      title: 'Assinatura do Inquilino',
      description: 'Aguardando assinatura do inquilino.',
      status: 'current',
      icon: <Signature className="h-6 w-6" />
    },
    {
      id: 'owner-sign',
      title: 'Assinatura do Proprietário',
      description: 'Aguardando assinatura do proprietário.',
      status: 'pending',
      icon: <Signature className="h-6 w-6" />
    },
    {
      id: 'deposit',
      title: 'Depósito Caução',
      description: 'Aguardando confirmação do depósito caução.',
      status: 'pending',
      icon: <CalendarCheck className="h-6 w-6" />
    },
    {
      id: 'inspection',
      title: 'Vistoria',
      description: 'Vistoria agendada para entrega das chaves.',
      status: 'pending',
      icon: <CheckCircle className="h-6 w-6" />
    },
    {
      id: 'completed',
      title: 'Finalizado',
      description: 'Contrato ativo e chaves entregues.',
      status: 'pending',
      icon: <FileCheck className="h-6 w-6" />
    }
  ];
  
  const [steps, setSteps] = useState<Step[]>(
    contractType === 'sale' ? getSaleWorkflowSteps() : getRentWorkflowSteps()
  );
  
  const handleStepAction = (action: string, stepId: string) => {
    if (onAction) {
      onAction(action, stepId);
    }
    
    if (action === 'sign') {
      // Atualizar o status da etapa atual para concluída
      const updatedSteps = steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            status: 'completed' as const,
            date: new Date().toLocaleDateString('pt-BR')
          };
        } else if (step.status === 'pending' && steps.findIndex(s => s.id === stepId) + 1 === steps.findIndex(s => s.id === step.id)) {
          // Atualizar a próxima etapa para "current"
          return {
            ...step,
            status: 'current' as const
          };
        }
        return step;
      });
      
      setSteps(updatedSteps);
      
      toast({
        title: "Contrato assinado",
        description: "Sua assinatura foi registrada com sucesso no contrato.",
      });
    }
  };
  
  const getStepStatusIcon = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'current':
        return <Clock className="h-6 w-6 text-amber-500" />;
      case 'failed':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Circle className="h-6 w-6 text-gray-300" />;
    }
  };
  
  const getCurrentStep = () => {
    return steps.find(step => step.status === 'current');
  };
  
  const currentStep = getCurrentStep();
  
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-lg mb-2">Status do Contrato</h3>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="px-2 py-1 text-xs font-normal border-kubico-blue text-kubico-blue">
            ID: {contractId}
          </Badge>
          <Badge variant="outline" className="px-2 py-1 text-xs font-normal border-kubico-green text-kubico-green">
            {contractType === 'sale' ? 'Compra e Venda' : 'Locação'}
          </Badge>
        </div>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 w-[1px] bg-gray-200"></div>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={step.id} className="relative pl-14">
                  <div className={cn(
                    "absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center",
                    step.status === 'completed' ? "bg-green-100" :
                    step.status === 'current' ? "bg-amber-100" :
                    step.status === 'failed' ? "bg-red-100" : "bg-gray-100"
                  )}>
                    {step.status === 'completed' ? 
                      <CheckCircle className="h-6 w-6 text-green-500" /> : 
                      step.status === 'current' ? 
                        step.icon : 
                        step.icon
                    }
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <h4 className={cn(
                        "font-medium",
                        step.status === 'completed' ? "text-green-600" :
                        step.status === 'current' ? "text-amber-600" :
                        step.status === 'failed' ? "text-red-600" : "text-gray-500"
                      )}>
                        {step.title}
                      </h4>
                      
                      {step.date && (
                        <span className="text-sm text-kubico-gray-medium">
                          {step.date}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-kubico-gray-dark mt-1">
                      {step.description}
                    </p>
                    
                    {step.status === 'current' && (
                      <div className="mt-3">
                        <Button 
                          size="sm" 
                          className="bg-kubico-blue hover:bg-kubico-blue/90"
                          onClick={() => handleStepAction('sign', step.id)}
                        >
                          <Signature className="h-4 w-4 mr-2" />
                          Assinar Contrato
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {currentStep && (
        <div className="bg-kubico-blue/5 border border-kubico-blue/20 rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-kubico-blue">Próxima Etapa: {currentStep.title}</h3>
              <p className="text-kubico-gray-dark mt-1">
                {currentStep.description}
              </p>
            </div>
            
            {currentStep.id.includes('sign') && (
              <Button 
                className="bg-kubico-blue hover:bg-kubico-blue/90"
                onClick={() => handleStepAction('sign', currentStep.id)}
              >
                <Signature className="h-4 w-4 mr-2" />
                Assinar Agora
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractWorkflow;
