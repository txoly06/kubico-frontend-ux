
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Search, 
  FileText, 
  MessageSquare, 
  Home, 
  Heart, 
  AlertTriangle, 
  FileQuestion,
  LucideIcon 
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Tipos de empty states
export type EmptyStateType = 
  | 'search' 
  | 'properties' 
  | 'contracts' 
  | 'messages' 
  | 'favorites' 
  | 'documents' 
  | 'generic'
  | 'error'
  | 'no-results';

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
  compact?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'generic',
  title,
  description,
  icon,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
  compact = false
}) => {
  // Configurações padrão baseadas no tipo
  const getDefaultProps = () => {
    switch (type) {
      case 'search':
        return {
          icon: <Search className="h-8 w-8 text-kubico-gray-medium" />,
          title: title || 'Nenhum resultado encontrado',
          description: description || 'Tente ajustar seus filtros ou critérios de busca para encontrar o que procura.',
          actionLabel: actionLabel || 'Limpar Filtros',
          showAction: true
        };
      
      case 'properties':
        return {
          icon: <Home className="h-8 w-8 text-kubico-gray-medium" />,
          title: title || 'Nenhum imóvel encontrado',
          description: description || 'Você ainda não cadastrou nenhum imóvel na plataforma.',
          actionLabel: actionLabel || 'Adicionar Imóvel',
          showAction: true
        };
      
      case 'contracts':
        return {
          icon: <FileText className="h-8 w-8 text-kubico-gray-medium" />,
          title: title || 'Nenhum contrato encontrado',
          description: description || 'Você ainda não tem contratos cadastrados.',
          actionLabel: actionLabel || 'Adicionar Contrato',
          showAction: true
        };
      
      case 'messages':
        return {
          icon: <MessageSquare className="h-8 w-8 text-kubico-gray-medium" />,
          title: title || 'Nenhuma mensagem',
          description: description || 'Você não possui mensagens no momento.',
          actionLabel: actionLabel || null,
          showAction: false
        };
      
      case 'favorites':
        return {
          icon: <Heart className="h-8 w-8 text-kubico-gray-medium" />,
          title: title || 'Nenhum favorito',
          description: description || 'Você ainda não adicionou imóveis aos seus favoritos.',
          actionLabel: actionLabel || 'Explorar Imóveis',
          showAction: true
        };
      
      case 'documents':
        return {
          icon: <FileQuestion className="h-8 w-8 text-kubico-gray-medium" />,
          title: title || 'Nenhum documento',
          description: description || 'Não há documentos disponíveis para este item.',
          actionLabel: actionLabel || null,
          showAction: false
        };
      
      case 'error':
        return {
          icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
          title: title || 'Algo deu errado',
          description: description || 'Ocorreu um erro ao carregar os dados. Tente novamente mais tarde.',
          actionLabel: actionLabel || 'Tentar novamente',
          showAction: true
        };
      
      case 'no-results':
        return {
          icon: <Search className="h-8 w-8 text-kubico-gray-medium" />,
          title: title || 'Sem resultados',
          description: description || 'Não encontramos resultados para sua busca.',
          actionLabel: actionLabel || 'Voltar',
          showAction: true
        };
      
      case 'generic':
      default:
        return {
          icon: icon || <FileQuestion className="h-8 w-8 text-kubico-gray-medium" />,
          title: title || 'Nenhum dado encontrado',
          description: description || 'Não há dados disponíveis para exibir.',
          actionLabel: actionLabel || null,
          showAction: !!actionLabel
        };
    }
  };

  const { 
    icon: defaultIcon, 
    title: defaultTitle, 
    description: defaultDescription, 
    actionLabel: defaultActionLabel,
    showAction
  } = getDefaultProps();

  // Usar valores padrão se não forem fornecidos
  const displayIcon = icon || defaultIcon;
  const displayTitle = title || defaultTitle;
  const displayDescription = description || defaultDescription;
  const displayActionLabel = actionLabel || defaultActionLabel;

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center text-center bg-white border border-gray-100 rounded-xl shadow-sm",
        compact ? "p-4" : "p-8",
        className
      )}
    >
      <div className={cn(
        "mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4",
        compact ? "w-12 h-12" : "w-16 h-16"
      )}>
        {displayIcon}
      </div>
      
      <h3 className={cn(
        "font-medium mb-2",
        compact ? "text-base" : "text-lg"
      )}>
        {displayTitle}
      </h3>
      
      <p className={cn(
        "text-kubico-gray-medium mb-6 max-w-md", 
        compact ? "text-sm" : ""
      )}>
        {displayDescription}
      </p>
      
      {showAction && onAction && displayActionLabel && (
        <div className="flex flex-wrap gap-3 justify-center">
          <Button 
            onClick={onAction}
            className="bg-kubico-blue hover:bg-kubico-blue/90"
          >
            {type === 'properties' && <Plus className="h-4 w-4 mr-2" />}
            {displayActionLabel}
          </Button>
          
          {secondaryActionLabel && onSecondaryAction && (
            <Button 
              variant="outline" 
              onClick={onSecondaryAction}
            >
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
