
import React from 'react';
import { Button } from '@/components/ui/button';
import { InboxIcon, Search, Clock, AlertCircle, FileX, MessageSquare, Home, FileText, Calendar, Users, Settings, PlusCircle, Info } from 'lucide-react';

export type EmptyStateType = 
  | 'search' 
  | 'notifications' 
  | 'messages' 
  | 'properties' 
  | 'contracts' 
  | 'calendar' 
  | 'users' 
  | 'settings' 
  | 'error'
  | 'loading'
  | 'custom';

interface EmptyStateProps {
  type: EmptyStateType;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  compact?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  icon,
  action,
  secondaryAction,
  compact = false
}) => {
  // Configurações padrão com base no tipo
  const getDefaultConfig = (): { title: string; description: string; icon: React.ReactNode } => {
    switch(type) {
      case 'search':
        return {
          title: 'Nenhum resultado encontrado',
          description: 'Tente ajustar seus critérios de busca para encontrar o que está procurando.',
          icon: <Search className="h-8 w-8 text-gray-400" />
        };
      case 'notifications':
        return {
          title: 'Nenhuma notificação',
          description: 'Você não tem notificações no momento. Novas notificações aparecerão aqui.',
          icon: <InboxIcon className="h-8 w-8 text-gray-400" />
        };
      case 'messages':
        return {
          title: 'Nenhuma mensagem',
          description: 'Você não tem mensagens no momento. Quando receber novas mensagens, elas aparecerão aqui.',
          icon: <MessageSquare className="h-8 w-8 text-gray-400" />
        };
      case 'properties':
        return {
          title: 'Nenhum imóvel encontrado',
          description: 'Não encontramos imóveis que correspondam aos seus critérios.',
          icon: <Home className="h-8 w-8 text-gray-400" />
        };
      case 'contracts':
        return {
          title: 'Nenhum contrato disponível',
          description: 'Você não tem contratos no momento. Quando novos contratos forem criados, eles aparecerão aqui.',
          icon: <FileText className="h-8 w-8 text-gray-400" />
        };
      case 'calendar':
        return {
          title: 'Agenda vazia',
          description: 'Você não tem compromissos agendados no momento.',
          icon: <Calendar className="h-8 w-8 text-gray-400" />
        };
      case 'users':
        return {
          title: 'Nenhum usuário encontrado',
          description: 'Não encontramos usuários que correspondam aos seus critérios de busca.',
          icon: <Users className="h-8 w-8 text-gray-400" />
        };
      case 'settings':
        return {
          title: 'Configurações não disponíveis',
          description: 'As configurações para este recurso não estão disponíveis no momento.',
          icon: <Settings className="h-8 w-8 text-gray-400" />
        };
      case 'error':
        return {
          title: 'Ocorreu um erro',
          description: 'Não foi possível carregar o conteúdo. Por favor, tente novamente mais tarde.',
          icon: <AlertCircle className="h-8 w-8 text-red-500" />
        };
      case 'loading':
        return {
          title: 'Carregando conteúdo',
          description: 'Por favor, aguarde enquanto carregamos as informações.',
          icon: <Clock className="h-8 w-8 text-gray-400" />
        };
      case 'custom':
      default:
        return {
          title: title || 'Nenhum conteúdo',
          description: description || 'Não há conteúdo para exibir no momento.',
          icon: icon || <Info className="h-8 w-8 text-gray-400" />
        };
    }
  };
  
  const defaultConfig = getDefaultConfig();
  
  return (
    <div 
      className={cn(
        "w-full text-center bg-gray-50 rounded-lg border border-gray-100",
        compact ? "p-6" : "p-12"
      )}
    >
      <div className={cn(
        "mx-auto mb-4 flex items-center justify-center",
        compact ? "w-12 h-12" : "w-16 h-16"
      )}>
        <div className="bg-gray-100 rounded-full flex items-center justify-center w-full h-full">
          {icon || defaultConfig.icon}
        </div>
      </div>
      
      <h3 className={cn(
        "font-semibold mb-2",
        compact ? "text-base" : "text-xl"
      )}>
        {title || defaultConfig.title}
      </h3>
      
      <p className={cn(
        "text-gray-500 mx-auto mb-6",
        compact ? "text-sm max-w-xs" : "max-w-md"
      )}>
        {description || defaultConfig.description}
      </p>
      
      {(action || secondaryAction) && (
        <div className="flex flex-wrap justify-center gap-2">
          {action && (
            <Button onClick={action.onClick}>
              {type !== 'custom' && type !== 'loading' && type !== 'error' && <PlusCircle className="h-4 w-4 mr-2" />}
              {action.label}
            </Button>
          )}
          
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

// Utilitário para concatenação condicional de classes (simplificado)
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default EmptyState;
