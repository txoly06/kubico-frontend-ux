
import React, { useState, useEffect } from 'react';
import { Check, Trash2, Bell, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import EmptyState from '@/components/ui/EmptyState';
import { useToast } from "@/hooks/use-toast";
import { Notification } from '@/types/notification';
import NotificationItem from './NotificationItem';

// Importar os dados de exemplo de notificações
import { sampleNotifications } from '@/data/notificationsData';

const NotificationsPanel: React.FC = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filtrar notificações com base na aba ativa e na busca
  const filteredNotifications = notifications
    .filter(notification => activeTab === 'all' || notification.category === activeTab)
    .filter(notification => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        notification.title.toLowerCase().includes(query) || 
        notification.message.toLowerCase().includes(query)
      );
    });
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  // Marcar todas como lidas
  const markAllAsRead = () => {
    if (unreadCount === 0) return;
    
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "Notificações atualizadas",
      description: `${unreadCount} notificações foram marcadas como lidas.`
    });
  };
  
  // Limpar todas as notificações
  const clearAllNotifications = () => {
    if (notifications.length === 0) return;
    
    setNotifications([]);
    
    toast({
      title: "Notificações removidas",
      description: "Todas as notificações foram removidas com sucesso."
    });
  };
  
  // Marcar notificação como lida/não lida
  const toggleReadStatus = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: !notification.read } 
          : notification
      )
    );
  };
  
  // Excluir uma notificação
  const deleteNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
    
    toast({
      title: "Notificação removida",
      description: "A notificação foi removida com sucesso."
    });
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card className="p-4">
          <div className="animate-pulse flex justify-between items-center">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="flex space-x-2">
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </Card>
        
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <Card key={i} className="p-4">
              <div className="animate-pulse space-y-3">
                <div className="flex justify-between">
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* Barra de ações */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kubico-gray-medium h-4 w-4" />
            <Input 
              className="pl-10"
              placeholder="Buscar notificações..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 sm:flex-none"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4 mr-1" />
              <span>Marcar como lidas</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 sm:flex-none text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={clearAllNotifications}
              disabled={notifications.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              <span>Limpar tudo</span>
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Tabs para filtrar por tipo */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">
            Todas
            {unreadCount > 0 && (
              <Badge className="ml-1 bg-kubico-blue text-white">{unreadCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
          <TabsTrigger value="properties">Imóveis</TabsTrigger>
          <TabsTrigger value="contracts">Contratos</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-3">
              {filteredNotifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onToggleRead={() => toggleReadStatus(notification.id)}
                  onDelete={() => deleteNotification(notification.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState 
              type="notifications" 
              title="Sem notificações" 
              description={`Você não tem notificações ${activeTab !== 'all' ? 'desta categoria' : ''}.`}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPanel;
