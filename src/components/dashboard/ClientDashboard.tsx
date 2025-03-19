import React from 'react';
import { UserType } from '@/components/ui/UserDashboard';

interface ClientDashboardProps {
  activeTab: string;
  userType: UserType; // Added this prop to fix the TypeScript error
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
        <p className="text-kubico-gray-dark mb-2">Nenhuma mensagem recente</p>
        <p className="text-sm text-kubico-gray-medium">
          Suas conversas aparecerão aqui quando você iniciar um contato com corretores ou outros usuários.
        </p>
      </div>
    </div>
  );
};

export default ClientDashboard;
