
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, User, Heart, FileText, Bell, Settings, LogOut, Calendar, Search, Plus, Filter, Grid3X3, List } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardPropertiesList from '@/components/ui/DashboardPropertiesList';
import DashboardFavorites from '@/components/ui/DashboardFavorites';
import DashboardProfile from '@/components/ui/DashboardProfile';
import DashboardContracts from '@/components/ui/DashboardContracts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties');
  
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
      default:
        return <DashboardPropertiesList />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-8 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar do Dashboard */}
            <aside className="md:w-64 flex-shrink-0">
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm mb-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{userData.name}</h2>
                    <p className="text-sm text-kubico-gray-medium">{userData.role}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start font-normal",
                      activeTab === 'properties' && "bg-kubico-blue/10 text-kubico-blue font-medium"
                    )}
                    onClick={() => setActiveTab('properties')}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Meus Imóveis
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start font-normal",
                      activeTab === 'favorites' && "bg-kubico-blue/10 text-kubico-blue font-medium"
                    )}
                    onClick={() => setActiveTab('favorites')}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Favoritos
                    <span className="ml-auto bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-0.5">
                      {userData.favorites}
                    </span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start font-normal",
                      activeTab === 'contracts' && "bg-kubico-blue/10 text-kubico-blue font-medium"
                    )}
                    onClick={() => setActiveTab('contracts')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Contratos
                    <span className="ml-auto bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-0.5">
                      {userData.contracts}
                    </span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start font-normal",
                      activeTab === 'notifications' && "bg-kubico-blue/10 text-kubico-blue font-medium"
                    )}
                    onClick={() => setActiveTab('notifications')}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notificações
                    <span className="ml-auto bg-kubico-blue/10 text-kubico-blue text-xs font-medium rounded-full px-2 py-0.5">
                      {userData.notifications}
                    </span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start font-normal",
                      activeTab === 'profile' && "bg-kubico-blue/10 text-kubico-blue font-medium"
                    )}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Meu Perfil
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start font-normal",
                      activeTab === 'settings' && "bg-kubico-blue/10 text-kubico-blue font-medium"
                    )}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                  </Button>
                </div>
                
                <div className="pt-6 mt-6 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => navigate('/')}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-kubico-blue to-kubico-blue/80 text-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-2">Precisa de ajuda?</h3>
                <p className="text-sm text-white/80 mb-4">Nossa equipe está disponível para atender você e responder qualquer dúvida.</p>
                <Button
                  className="w-full bg-white text-kubico-blue hover:bg-white/90"
                  onClick={() => navigate('/contact')}
                >
                  Fale Conosco
                </Button>
              </div>
            </aside>
            
            {/* Conteúdo principal do Dashboard */}
            <div className="flex-grow">
              {/* Título e subtítulo dinâmicos com base na aba ativa */}
              {activeTab === 'properties' && (
                <DashboardHeader 
                  title="Meus Imóveis" 
                  subtitle="Gerencie seus imóveis cadastrados na plataforma"
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
