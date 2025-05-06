
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface NotificationsPanelProps {
  onClose: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ onClose }) => {
  return (
    <Card className="border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Notificações</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="font-medium text-blue-800">Seu imóvel foi aprovado</p>
            <p className="text-sm text-blue-600 mt-1">O imóvel na Rua das Flores foi aprovado pela administração.</p>
            <p className="text-xs text-blue-500 mt-2">Há 2 horas</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="font-medium">Novo agendamento de visita</p>
            <p className="text-sm text-gray-600 mt-1">Uma visita foi agendada para o imóvel na Av. Paulista.</p>
            <p className="text-xs text-gray-500 mt-2">Ontem</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="font-medium">Nova mensagem</p>
            <p className="text-sm text-gray-600 mt-1">Você recebeu uma nova mensagem de João Silva.</p>
            <p className="text-xs text-gray-500 mt-2">2 dias atrás</p>
          </div>
        </div>
        
        <Button className="w-full mt-6" variant="outline">
          Ver todas as notificações
        </Button>
      </div>
    </Card>
  );
};

export default NotificationsPanel;
