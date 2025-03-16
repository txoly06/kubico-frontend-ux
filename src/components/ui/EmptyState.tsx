
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Search, 
  FileText, 
  AlertCircle, 
  Heart, 
  MessageSquare, 
  Calendar, 
  Star, 
  Bell,
  Frown,
  Loader
} from 'lucide-react';

type EmptyStateType = 
  | 'properties'
  | 'search'
  | 'favorites'
  | 'messages'
  | 'contracts'
  | 'documents'
  | 'reviews'
  | 'notifications'
  | 'appointments'
  | 'generic'
  | 'error';

interface EmptyStateProps {
  type: EmptyStateType;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaAction?: () => void;
}

/**
 * Componente para exibir estados vazios em diferentes seções da aplicação
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  ctaText,
  ctaAction
}) => {
  // Configurações padrão com base no tipo
  const defaultConfigs = {
    properties: {
      icon: <Home className="h-10 w-10" />,
      title: 'Nenhum imóvel encontrado',
      description: 'Não encontramos imóveis que correspondam aos seus critérios. Tente ajustar seus filtros.',
      ctaText: 'Limpar filtros'
    },
    search: {
      icon: <Search className="h-10 w-10" />,
      title: 'Nenhum resultado encontrado',
      description: 'Não encontramos resultados para sua busca. Tente termos diferentes ou ajuste seus filtros.',
      ctaText: 'Limpar busca'
    },
    favorites: {
      icon: <Heart className="h-10 w-10" />,
      title: 'Nenhum favorito ainda',
      description: 'Você ainda não adicionou nenhum imóvel aos seus favoritos.',
      ctaText: 'Explorar imóveis'
    },
    messages: {
      icon: <MessageSquare className="h-10 w-10" />,
      title: 'Sem mensagens',
      description: 'Você não tem nenhuma mensagem no momento.',
      ctaText: 'Entrar em contato'
    },
    contracts: {
      icon: <FileText className="h-10 w-10" />,
      title: 'Nenhum contrato',
      description: 'Você ainda não possui nenhum contrato registrado.',
      ctaText: 'Ver imóveis'
    },
    documents: {
      icon: <FileText className="h-10 w-10" />,
      title: 'Nenhum documento disponível',
      description: 'Este imóvel ainda não possui documentos disponíveis para visualização.',
      ctaText: 'Solicitar documentos'
    },
    reviews: {
      icon: <Star className="h-10 w-10" />,
      title: 'Sem avaliações',
      description: 'Este imóvel ainda não recebeu avaliações.',
      ctaText: 'Seja o primeiro a avaliar'
    },
    notifications: {
      icon: <Bell className="h-10 w-10" />,
      title: 'Nenhuma notificação',
      description: 'Você não tem notificações no momento.',
      ctaText: 'Configurar notificações'
    },
    appointments: {
      icon: <Calendar className="h-10 w-10" />,
      title: 'Nenhum agendamento',
      description: 'Você ainda não possui agendamentos de visitas.',
      ctaText: 'Agendar visita'
    },
    error: {
      icon: <AlertCircle className="h-10 w-10" />,
      title: 'Ocorreu um erro',
      description: 'Não foi possível carregar os dados. Por favor, tente novamente mais tarde.',
      ctaText: 'Tentar novamente'
    },
    generic: {
      icon: <Frown className="h-10 w-10" />,
      title: 'Nenhum conteúdo disponível',
      description: 'Não há conteúdo disponível para exibição no momento.',
      ctaText: 'Voltar'
    }
  };
  
  // Mesclar configurações padrão com propriedades fornecidas
  const config = defaultConfigs[type];
  const finalTitle = title || config.title;
  const finalDescription = description || config.description;
  const finalCtaText = ctaText || config.ctaText;
  
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6 text-kubico-gray-medium">
        {config.icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{finalTitle}</h3>
      <p className="text-kubico-gray-medium max-w-md mb-6">{finalDescription}</p>
      
      {(ctaText || config.ctaText) && ctaAction && (
        <Button 
          onClick={ctaAction}
          className="bg-kubico-blue hover:bg-kubico-blue/90"
        >
          {finalCtaText}
        </Button>
      )}
    </div>
  );
};

/**
 * Componente para exibir estados de carregamento
 */
export const LoadingState: React.FC<{ text?: string }> = ({ text = 'Carregando...' }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <div className="w-16 h-16 rounded-full bg-kubico-blue/5 flex items-center justify-center mb-6 text-kubico-blue">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
      <p className="text-kubico-gray-medium">{text}</p>
    </div>
  );
};

export default EmptyState;
