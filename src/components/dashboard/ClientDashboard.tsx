
import React from 'react';
import { UserType } from '@/components/ui/UserDashboard';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClientDashboardProps {
  activeTab: string;
  userType: UserType;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ activeTab, userType }) => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h3 className="text-lg font-medium mb-4">Mensagens</h3>
      <p className="text-kubico-gray-medium mb-4">
        {userType === 'agent' 
          ? 'Gerencie suas conversas com clientes e outros corretores.' 
          : 'Visualize e responda mensagens de corretores e outros usuários.'}
      </p>
      
      <div className="p-6 bg-gray-50 rounded-lg text-center">
        <div className="flex justify-center mb-4">
          <MessageSquare className="h-12 w-12 text-kubico-gray-medium opacity-50" />
        </div>
        <p className="text-kubico-gray-dark mb-2">Nenhuma mensagem recente</p>
        <p className="text-sm text-kubico-gray-medium mb-4">
          Suas conversas aparecerão aqui quando você iniciar um contato com corretores ou outros usuários.
        </p>
        <Button variant="outline" className="mt-2">
          Iniciar uma conversa
        </Button>
      </div>
    </div>
  );
};

export default ClientDashboard;
