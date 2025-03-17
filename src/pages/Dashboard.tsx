
import React, { useState } from 'react';
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

// Import usando lazy loading para otimização
const NotificationsPanel = lazy(() => import('@/components/ui/NotificationsPanel'));

// Dados de exemplo do usuário
const userData = {
  name: 'Ana Silva',
  email: 'ana.silva@email.com',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  role: 'Cliente',
  joinedAt: '2022-06-15',
  properties: 2,
  favorites: 5,
  contracts: 1,
  notifications: 3
};

// Componente para o header do painel
const DashboardHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-6">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
    <p className="text-kubico-gray-medium">{subtitle}</p>
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [userType, setUserType] = useState<UserType>('premium');
  
  // Função para alternar entre tipos de usuário (apenas para demonstração)
  const toggleUserType = () => {
    const types: UserType[] = ['regular', 'premium', 'agent', 'admin'];
    const currentIndex = types.indexOf(userType);
    const nextIndex = (currentIndex + 1) % types.length;
    setUserType(types[nextIndex]);
  };
  
  // Renderização condicional do conteúdo com base na tab ativa
  const renderContent = () => {
    switch (activeTab) {
      case 'properties':
        return <DashboardPropertiesList />;
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
          <Suspense fallback={<LoadingState type="card" count={3} />}>
            <NotificationsPanel />
          </Suspense>
        );
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
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleUserType}
              className="bg-kubico-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-kubico-blue/90 transition-colors"
            >
              Modo: {userType === 'regular' ? 'Usuário Regular' : 
                     userType === 'premium' ? 'Usuário Premium' : 
                     userType === 'agent' ? 'Corretor' : 'Administrador'}
            </button>
          </div>
          
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
