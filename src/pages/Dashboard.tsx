import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardPropertiesList from '@/components/ui/DashboardPropertiesList';
import DashboardFavorites from '@/components/ui/DashboardFavorites';
import DashboardProfile from '@/components/ui/DashboardProfile';
import DashboardContracts from '@/components/ui/DashboardContracts';
import DashboardAnalytics from '@/components/ui/DashboardAnalytics';
import UserDashboard, { UserType } from '@/components/ui/UserDashboard';
import { Suspense, lazy } from 'react';
import LoadingState from '@/components/ui/LoadingState';
import { useAuth } from '@/contexts/AuthContext';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import AgentDashboard from '@/components/dashboard/AgentDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

// Import usando lazy loading para otimização
const NotificationsPanel = lazy(() => import('@/components/ui/NotificationsPanel'));

// Componente para o header do painel
const DashboardHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-6">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
    <p className="text-kubico-gray-medium">{subtitle}</p>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('properties');
  // Mapear o papel do usuário para o tipo de usuário no componente
  const userType: UserType = user?.role === 'admin' 
    ? 'admin' 
    : user?.role === 'agent' 
      ? 'agent' 
      : user?.role === 'client' && user?.id === '1' 
        ? 'premium' 
        : 'regular';
  
  // Dados de exemplo do usuário
  const userData = {
    name: user?.name || 'Usuário',
    email: user?.email || 'usuario@exemplo.com',
    avatar: user?.avatar || 'https://randomuser.me/api/portraits/women/44.jpg',
    role: user?.role === 'client' ? 'Cliente' : user?.role === 'agent' ? 'Corretor' : 'Administrador',
    joinedAt: '2022-06-15',
    properties: 2,
    favorites: 5,
    contracts: 1,
    notifications: 3
  };
  
  // Função simulada para fechar o painel de notificações
  const handleCloseNotifications = () => {
    // Em um cenário real, isso poderia mudar o estado para esconder o painel
    setActiveTab('properties');
  };
  
  // Renderização condicional do conteúdo com base na tab ativa
  const renderContent = () => {
    switch (activeTab) {
      case 'properties':
        return <DashboardPropertiesList userType={userType} />;
      case 'favorites':
        return <DashboardFavorites />;
      case 'contracts':
        return <DashboardContracts />;
      case 'profile':
        return <DashboardProfile />;
      case 'analytics':
        return <DashboardAnalytics userType={userType} />;
      case 'notifications':
        return (
          <Suspense fallback={<LoadingState variant="card" rows={3} />}>
            <NotificationsPanel onClose={handleCloseNotifications} />
          </Suspense>
        );
      case 'clients':
        return userType === 'agent' || userType === 'admin' 
          ? <AgentDashboard activeTab={activeTab} /> 
          : null;
      case 'users':
        return userType === 'admin' 
          ? <AdminDashboard activeTab={activeTab} /> 
          : null;
      case 'business':
        return userType === 'admin' 
          ? <AdminDashboard activeTab={activeTab} /> 
          : null;
      case 'calendar':
        return userType === 'agent' 
          ? <AgentDashboard activeTab={activeTab} /> 
          : null;
      case 'messages':
        return <ClientDashboard activeTab={activeTab} userType={userType} />; // Now correctly typed
      case 'settings':
        return userType === 'admin' 
          ? <AdminDashboard activeTab={activeTab} /> 
          : null;
      default:
        return (
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Funcionalidade em desenvolvimento</h3>
            <p className="text-kubico-gray-medium mb-4">Esta seção está sendo implementada e estará disponível em breve.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-8 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar do Dashboard */}
            <UserDashboard 
              userType={userType} 
              userData={userData} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />
            
            {/* Conteúdo principal do Dashboard */}
            <div className="flex-grow">
              {/* Título e subtítulo dinâmicos com base na aba ativa */}
              {activeTab === 'properties' && (
                <DashboardHeader 
                  title={userType === 'admin' ? "Gestão de Imóveis" : "Meus Imóveis"} 
                  subtitle={userType === 'admin' ? "Gerencie os imóveis cadastrados na plataforma" : "Gerencie seus imóveis cadastrados na plataforma"}
                />
              )}
              {activeTab === 'favorites' && (
                <DashboardHeader 
                  title="Imóveis Favoritos" 
                  subtitle="Visualize e gerencie os imóveis que você salvou"
                />
              )}
              {activeTab === 'contracts' && (
                <DashboardHeader 
                  title="Meus Contratos" 
                  subtitle="Gerencie os contratos de compra, venda e aluguel"
                />
              )}
              {activeTab === 'profile' && (
                <DashboardHeader 
                  title="Meu Perfil" 
                  subtitle="Visualize e atualize suas informações pessoais"
                />
              )}
              {activeTab === 'analytics' && (
                <DashboardHeader 
                  title={userType === 'admin' ? "Relatórios" : "Análises"} 
                  subtitle={userType === 'admin' ? "Relatórios e métricas gerais da plataforma" : "Estatísticas e desempenho dos seus anúncios"}
                />
              )}
              {activeTab === 'notifications' && (
                <DashboardHeader 
                  title="Notificações" 
                  subtitle="Veja todas as suas notificações e alertas"
                />
              )}
              {activeTab === 'clients' && (
                <DashboardHeader 
                  title="Meus Clientes" 
                  subtitle="Gerencie seus clientes e leads"
                />
              )}
              {activeTab === 'users' && (
                <DashboardHeader 
                  title="Usuários" 
                  subtitle="Gerencie os usuários da plataforma"
                />
              )}
              {activeTab === 'business' && (
                <DashboardHeader 
                  title="Imobiliárias" 
                  subtitle="Gerencie as imobiliárias parceiras"
                />
              )}
              {activeTab === 'calendar' && (
                <DashboardHeader 
                  title="Agenda" 
                  subtitle="Gerencie suas visitas e compromissos"
                />
              )}
              {activeTab === 'messages' && (
                <DashboardHeader 
                  title="Mensagens" 
                  subtitle="Conversas com clientes e corretores"
                />
              )}
              {activeTab === 'settings' && (
                <DashboardHeader 
                  title="Configurações" 
                  subtitle="Configure os parâmetros da plataforma"
                />
              )}
              
              {/* Renderização dinâmica do conteúdo com base na aba ativa */}
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
