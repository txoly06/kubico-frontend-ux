
import React, { useState, useEffect } from 'react';
import { Bell, MessageSquare, Home, FileText, Check, Trash, X, Clock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Notification, NotificationType, NotificationCategory } from '@/types/notification';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

interface NotificationsPanelProps {
  onClose: () => void;
}

// Dados de exemplo para notificações
const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'Novo contrato disponível',
    message: 'Um novo contrato de compra e venda está disponível para sua revisão e assinatura.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
    read: false,
    type: 'info',
    category: 'contracts',
    link: '/contracts'
  },
  {
    id: '2',
    title: 'Mensagem de Maria Silva',
    message: 'Olá! Gostaria de agendar uma visita ao imóvel no próximo sábado. Seria possível?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    read: false,
    type: 'info',
    category: 'messages',
    link: '/messages'
  },
  {
    id: '3',
    title: 'Contrato assinado',
    message: 'O contrato de aluguel para o apartamento em Copacabana foi assinado por todas as partes.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 horas atrás
    read: true,
    type: 'success',
    category: 'contracts',
    link: '/contracts'
  },
  {
    id: '4',
    title: 'Vencimento de contrato',
    message: 'O contrato de locação do imóvel na Rua das Flores vence em 7 dias.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
    read: true,
    type: 'warning',
    category: 'contracts',
    link: '/contracts'
  },
  {
    id: '5',
    title: 'Problema na assinatura',
    message: 'Houve um problema ao processar sua assinatura digital. Por favor, tente novamente.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 dias atrás
    read: false,
    type: 'error',
    category: 'contracts',
    link: '/contracts'
  },
  {
    id: '6',
    title: 'Novo imóvel correspondente',
    message: 'Encontramos um novo imóvel que corresponde aos seus critérios de busca em Ipanema.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 dias atrás
    read: true,
    type: 'info',
    category: 'properties',
    link: '/properties'
  }
];

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [activeCategory, setActiveCategory] = useState<NotificationCategory>('all');
  const [unreadCount, setUnreadCount] = useState(0);

  // Calcular contagem de não lidas no carregamento inicial e quando as notificações mudarem
  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Filtrar notificações com base na categoria ativa
  const filteredNotifications = notifications.filter(notification => 
    activeCategory === 'all' || notification.category === activeCategory
  );

  // Marcar todas as notificações como lidas
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    
    toast({
      title: "Notificações atualizadas",
      description: "Todas as notificações foram marcadas como lidas",
    });
  };

  // Marcar uma notificação como lida
  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    
    setNotifications(updatedNotifications);
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Excluir uma notificação
  const deleteNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    const wasUnread = notification && !notification.read;
    
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    
    if (wasUnread) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    
    toast({
      title: "Notificação excluída",
      description: "A notificação foi removida permanentemente",
    });
  };

  // Excluir todas as notificações
  const deleteAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    
    toast({
      title: "Notificações excluídas",
      description: "Todas as notificações foram removidas",
    });
  };

  // Formatar timestamp relativo (ex: "há 5 minutos", "há 2 horas")
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 0) {
      return `há ${diffDay} ${diffDay === 1 ? 'dia' : 'dias'}`;
    } else if (diffHour > 0) {
      return `há ${diffHour} ${diffHour === 1 ? 'hora' : 'horas'}`;
    } else if (diffMin > 0) {
      return `há ${diffMin} ${diffMin === 1 ? 'minuto' : 'minutos'}`;
    } else {
      return 'agora mesmo';
    }
  };

  // Ícone da categoria
  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case 'messages':
        return <MessageSquare className="h-4 w-4" />;
      case 'properties':
        return <Home className="h-4 w-4" />;
      case 'contracts':
        return <FileText className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  // Estilo de acordo com o tipo da notificação
  const getNotificationTypeStyles = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-100 max-h-[85vh] flex flex-col">
      {/* Cabeçalho */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">Notificações</h2>
          {unreadCount > 0 && (
            <Badge className="ml-2 bg-kubico-blue hover:bg-kubico-blue/90">
              {unreadCount} não lida{unreadCount !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar painel de notificações">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Tabs de categorias */}
      <Tabs defaultValue="all" value={activeCategory} onValueChange={(value) => setActiveCategory(value as NotificationCategory)}>
        <div className="border-b border-gray-100">
          <TabsList className="w-full bg-transparent border-b">
            <TabsTrigger value="all" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-kubico-blue">
              Todas
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-kubico-blue">
              Mensagens
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-kubico-blue">
              Imóveis
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-kubico-blue">
              Contratos
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <NotificationsContent 
            notifications={filteredNotifications} 
            formatRelativeTime={formatRelativeTime}
            getCategoryIcon={getCategoryIcon}
            getNotificationTypeStyles={getNotificationTypeStyles}
            markAsRead={markAsRead}
            deleteNotification={deleteNotification}
          />
        </TabsContent>
        
        <TabsContent value="messages" className="mt-0">
          <NotificationsContent 
            notifications={filteredNotifications} 
            formatRelativeTime={formatRelativeTime}
            getCategoryIcon={getCategoryIcon}
            getNotificationTypeStyles={getNotificationTypeStyles}
            markAsRead={markAsRead}
            deleteNotification={deleteNotification}
          />
        </TabsContent>
        
        <TabsContent value="properties" className="mt-0">
          <NotificationsContent 
            notifications={filteredNotifications} 
            formatRelativeTime={formatRelativeTime}
            getCategoryIcon={getCategoryIcon}
            getNotificationTypeStyles={getNotificationTypeStyles}
            markAsRead={markAsRead}
            deleteNotification={deleteNotification}
          />
        </TabsContent>
        
        <TabsContent value="contracts" className="mt-0">
          <NotificationsContent 
            notifications={filteredNotifications} 
            formatRelativeTime={formatRelativeTime}
            getCategoryIcon={getCategoryIcon}
            getNotificationTypeStyles={getNotificationTypeStyles}
            markAsRead={markAsRead}
            deleteNotification={deleteNotification}
          />
        </TabsContent>
      </Tabs>
      
      {/* Ações de rodapé */}
      <div className="p-3 border-t border-gray-100 mt-auto flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="text-sm"
        >
          <Check className="h-4 w-4 mr-1" />
          Marcar todas como lidas
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={deleteAllNotifications}
          disabled={notifications.length === 0}
          className="text-sm text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash className="h-4 w-4 mr-1" />
          Limpar tudo
        </Button>
      </div>
    </div>
  );
};

// Componente para o conteúdo das notificações
interface NotificationsContentProps {
  notifications: Notification[];
  formatRelativeTime: (date: Date) => string;
  getCategoryIcon: (category: NotificationCategory) => React.ReactNode;
  getNotificationTypeStyles: (type: NotificationType) => string;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
}

const NotificationsContent: React.FC<NotificationsContentProps> = ({
  notifications,
  formatRelativeTime,
  getCategoryIcon,
  getNotificationTypeStyles,
  markAsRead,
  deleteNotification
}) => {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <Bell className="h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium mb-1">Nenhuma notificação</h3>
        <p className="text-gray-500 max-w-xs">
          Você não tem notificações nesta categoria. Novas notificações aparecerão aqui.
        </p>
      </div>
    );
  }
  
  return (
    <ScrollArea className="max-h-[60vh]">
      <div className="divide-y divide-gray-100">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={cn(
              "p-4 transition-colors hover:bg-gray-50 relative",
              !notification.read && "bg-gray-50 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-kubico-blue"
            )}
          >
            <div className="flex gap-3">
              <div className={cn(
                "shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                notification.type === 'success' && "bg-green-100 text-green-500",
                notification.type === 'warning' && "bg-amber-100 text-amber-500",
                notification.type === 'error' && "bg-red-100 text-red-500",
                notification.type === 'info' && "bg-blue-100 text-blue-500"
              )}>
                {getCategoryIcon(notification.category)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={cn(
                    "font-medium text-gray-900",
                    !notification.read && "font-semibold"
                  )}>
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-500 ml-2 shrink-0">
                    {formatRelativeTime(notification.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {notification.message}
                </p>
                
                <div className="flex justify-between items-center">
                  {notification.link && (
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-kubico-blue px-0 h-auto"
                      asChild
                    >
                      <a 
                        href={notification.link} 
                        onClick={() => markAsRead(notification.id)}
                      >
                        Ver detalhes
                      </a>
                    </Button>
                  )}
                  
                  <div className="flex gap-2 ml-auto">
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => markAsRead(notification.id)}
                        aria-label="Marcar como lida"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50" 
                      onClick={() => deleteNotification(notification.id)}
                      aria-label="Excluir notificação"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default NotificationsPanel;
