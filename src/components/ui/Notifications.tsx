
import React, { useState, useEffect } from 'react';
import { Bell, X, MessageSquare, Home, FilePlus, Check, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Tipos de notificações
type NotificationType = 'info' | 'success' | 'warning' | 'error';
type NotificationCategory = 'all' | 'messages' | 'properties' | 'contracts';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: NotificationType; // Tipo de notificação (para estilo)
  category: NotificationCategory; // Categoria (para filtragem)
  link?: string; // Link opcional para navegação
}

// Dados de exemplo para as notificações
const sampleNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Nova mensagem',
    message: 'Maria enviou uma mensagem sobre o apartamento em Copacabana.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutos atrás
    read: false,
    type: 'info',
    category: 'messages',
    link: '/messages'
  },
  {
    id: 'n2',
    title: 'Contrato assinado',
    message: 'O contrato CT001 foi assinado por todas as partes.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
    read: false,
    type: 'success',
    category: 'contracts',
    link: '/contracts'
  },
  {
    id: 'n3',
    title: 'Visita agendada',
    message: 'Carlos agendou uma visita para amanhã às 14h no imóvel da Av. Paulista.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    read: true,
    type: 'info',
    category: 'properties',
    link: '/properties/2'
  },
  {
    id: 'n4',
    title: 'Documento pendente',
    message: 'O contrato de aluguel está aguardando sua assinatura.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 horas atrás
    read: true,
    type: 'warning',
    category: 'contracts',
    link: '/contracts'
  },
  {
    id: 'n5',
    title: 'Contrato rejeitado',
    message: 'Roberto rejeitou o contrato de compra e venda da cobertura.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
    read: true,
    type: 'error',
    category: 'contracts',
    link: '/contracts'
  },
  {
    id: 'n6',
    title: 'Imóvel em destaque',
    message: 'Seu imóvel em Moema foi destacado na plataforma.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 dias atrás
    read: true,
    type: 'success',
    category: 'properties',
    link: '/properties/3'
  },
];

// Função para formatar a data relativa
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

// Ícone correspondente ao tipo de notificação
const renderNotificationIcon = (type: NotificationType) => {
  switch (type) {
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

// Ícone correspondente à categoria
const renderCategoryIcon = (category: NotificationCategory) => {
  switch (category) {
    case 'messages':
      return <MessageSquare className="h-4 w-4" />;
    case 'properties':
      return <Home className="h-4 w-4" />;
    case 'contracts':
      return <FilePlus className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

interface NotificationsProps {
  className?: string;
}

const Notifications: React.FC<NotificationsProps> = ({ className }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);
  const [activeTab, setActiveTab] = useState<NotificationCategory>('all');
  const [open, setOpen] = useState(false);
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  // Filtrar notificações com base na aba ativa
  const filteredNotifications = notifications.filter(notification => 
    activeTab === 'all' || notification.category === activeTab
  );
  
  // Marcar notificação como lida
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  // Marcar todas como lidas
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Limpar notificações lidas
  const clearRead = () => {
    setNotifications(prev => prev.filter(notification => !notification.read));
  };
  
  useEffect(() => {
    // Aqui você pode implementar uma lógica para buscar novas notificações 
    // do backend em intervalos regulares
    const interval = setInterval(() => {
      // Em um ambiente real, você faria uma requisição para o backend
      // e atualizaria as notificações
      console.log('Verificando por novas notificações...');
    }, 60000); // Verificar a cada minuto
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={cn("relative border-none", className)}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 px-[0.35rem] min-w-[1.15rem] h-[1.15rem] bg-red-500 hover:bg-red-500" 
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[380px] p-0" 
        align="end"
        side="bottom"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-medium">Notificações</h3>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-xs"
                onClick={markAllAsRead}
              >
                Marcar todas como lidas
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={clearRead}
            >
              Limpar lidas
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as NotificationCategory)}>
          <TabsList className="grid grid-cols-4 p-1 mx-4 my-2">
            <TabsTrigger value="all" className="text-xs">Todas</TabsTrigger>
            <TabsTrigger value="messages" className="text-xs">Mensagens</TabsTrigger>
            <TabsTrigger value="properties" className="text-xs">Imóveis</TabsTrigger>
            <TabsTrigger value="contracts" className="text-xs">Contratos</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="m-0">
            <ScrollArea className="max-h-[300px]">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={cn(
                        "p-4 hover:bg-gray-50 transition-colors",
                        !notification.read && "bg-blue-50/50"
                      )}
                    >
                      <div className="flex">
                        <div className="flex-shrink-0 mr-3">
                          {renderNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium">{notification.title}</h4>
                            <span className="text-xs text-kubico-gray-medium">
                              {formatRelativeTime(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-kubico-gray-dark my-1">
                            {notification.message}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <div className="flex items-center text-xs text-kubico-gray-medium">
                              {renderCategoryIcon(notification.category)}
                              <span className="ml-1">
                                {notification.category === 'messages' ? 'Mensagens' : 
                                  notification.category === 'properties' ? 'Imóveis' : 'Contratos'}
                              </span>
                            </div>
                            {notification.link && (
                              <Link 
                                to={notification.link} 
                                className="text-kubico-blue text-xs flex items-center hover:underline"
                                onClick={() => {
                                  markAsRead(notification.id);
                                  setOpen(false);
                                }}
                              >
                                Ver detalhes
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </Link>
                            )}
                          </div>
                        </div>
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 ml-2 mt-1 flex-shrink-0"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-kubico-gray-medium text-sm">
                    Não há notificações {activeTab !== 'all' ? 'nesta categoria' : ''}.
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <div className="p-2 border-t text-center">
          <Button variant="link" size="sm" className="h-auto px-0 py-0 text-xs text-kubico-gray-medium">
            Configurar notificações
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
