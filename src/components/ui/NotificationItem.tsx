
import React from 'react';
import { Check, Trash2, ExternalLink, MessageSquare, Home, FileText, Info, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Notification } from '@/types/notification';

interface NotificationItemProps {
  notification: Notification;
  onToggleRead: () => void;
  onDelete: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onToggleRead,
  onDelete
}) => {
  // Formatar tempo relativo
  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 60) {
      return 'Agora mesmo';
    } else if (diffMin < 60) {
      return `${diffMin} ${diffMin === 1 ? 'minuto' : 'minutos'} atrás`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hora' : 'horas'} atrás`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'} atrás`;
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };
  
  // Renderizar ícone com base no tipo de notificação
  const renderTypeIcon = () => {
    switch (notification.type) {
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  // Renderizar ícone com base na categoria
  const renderCategoryIcon = () => {
    switch (notification.category) {
      case 'messages':
        return <MessageSquare className="h-4 w-4 text-kubico-gray-medium" />;
      case 'properties':
        return <Home className="h-4 w-4 text-kubico-gray-medium" />;
      case 'contracts':
        return <FileText className="h-4 w-4 text-kubico-gray-medium" />;
      default:
        return <Info className="h-4 w-4 text-kubico-gray-medium" />;
    }
  };
  
  // Texto da categoria
  const categoryText = 
    notification.category === 'messages' ? 'Mensagens' :
    notification.category === 'properties' ? 'Imóveis' :
    notification.category === 'contracts' ? 'Contratos' : 'Geral';
  
  return (
    <Card className={cn(
      "p-4 transition-colors hover:bg-gray-50", 
      !notification.read && "bg-blue-50/50 hover:bg-blue-50/80"
    )}>
      <div className="flex">
        <div className="flex-shrink-0 mt-1 mr-3">
          {renderTypeIcon()}
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium">{notification.title}</h4>
            <span className="text-xs text-kubico-gray-medium">
              {formatRelativeTime(notification.timestamp)}
            </span>
          </div>
          
          <p className="text-sm text-kubico-gray-dark my-1">
            {notification.message}
          </p>
          
          <div className="flex flex-wrap justify-between items-center mt-1">
            <div className="flex items-center text-xs text-kubico-gray-medium">
              {renderCategoryIcon()}
              <span className="ml-1">{categoryText}</span>
            </div>
            
            <div className="flex space-x-2 mt-1 sm:mt-0">
              {notification.link && (
                <Link 
                  to={notification.link} 
                  className="inline-flex items-center text-kubico-blue text-xs hover:underline"
                >
                  Ver detalhes
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              )}
              
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={onToggleRead}
                >
                  {notification.read ? 'Marcar como não lida' : 'Marcar como lida'}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={onDelete}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NotificationItem;
