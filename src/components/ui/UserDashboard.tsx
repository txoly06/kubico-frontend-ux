
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  User, 
  Heart, 
  FileText, 
  Bell, 
  Settings, 
  LogOut, 
  Calendar, 
  MessageSquare, 
  FileSpreadsheet, 
  BriefcaseBusiness,
  Menu,
  X,
  Users
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';

export type UserType = 'regular' | 'premium' | 'agent' | 'admin';

// Define a proper interface for navigation items
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  badgeHighlight?: boolean;
}

interface UserDashboardProps {
  userType: UserType;
  userData: {
    name: string;
    email: string;
    avatar: string;
    role: string;
    joinedAt: string;
    properties: number;
    favorites: number;
    contracts: number;
    notifications: number;
  };
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({
  userType,
  userData,
  activeTab,
  setActiveTab
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const getNavItems = () => {
    // Items comuns a todos os tipos de usuário
    const commonItems: NavItem[] = [
      {
        id: 'profile',
        label: 'Meu Perfil',
        icon: <User className="mr-2 h-4 w-4" />
      },
      {
        id: 'favorites',
        label: 'Favoritos',
        icon: <Heart className="mr-2 h-4 w-4" />,
        badge: userData.favorites
      },
      {
        id: 'notifications',
        label: 'Notificações',
        icon: <Bell className="mr-2 h-4 w-4" />,
        badge: userData.notifications,
        badgeHighlight: true
      }
    ];
    
    // Items específicos por tipo de usuário
    const userSpecificItems: Record<UserType, NavItem[]> = {
      'regular': [
        {
          id: 'properties',
          label: 'Meus Imóveis',
          icon: <Home className="mr-2 h-4 w-4" />,
          badge: userData.properties
        },
        {
          id: 'contracts',
          label: 'Contratos',
          icon: <FileText className="mr-2 h-4 w-4" />,
          badge: userData.contracts
        },
        {
          id: 'messages',
          label: 'Mensagens',
          icon: <MessageSquare className="mr-2 h-4 w-4" />
        }
      ],
      'premium': [
        {
          id: 'properties',
          label: 'Meus Imóveis',
          icon: <Home className="mr-2 h-4 w-4" />,
          badge: userData.properties
        },
        {
          id: 'contracts',
          label: 'Contratos',
          icon: <FileText className="mr-2 h-4 w-4" />,
          badge: userData.contracts
        },
        {
          id: 'analytics',
          label: 'Análises',
          icon: <FileSpreadsheet className="mr-2 h-4 w-4" />
        },
        {
          id: 'messages',
          label: 'Mensagens',
          icon: <MessageSquare className="mr-2 h-4 w-4" />
        }
      ],
      'agent': [
        {
          id: 'properties',
          label: 'Portfólio de Imóveis',
          icon: <Home className="mr-2 h-4 w-4" />,
          badge: userData.properties
        },
        {
          id: 'clients',
          label: 'Clientes',
          icon: <Users className="mr-2 h-4 w-4" />
        },
        {
          id: 'calendar',
          label: 'Agenda',
          icon: <Calendar className="mr-2 h-4 w-4" />
        },
        {
          id: 'messages',
          label: 'Mensagens',
          icon: <MessageSquare className="mr-2 h-4 w-4" />
        },
        {
          id: 'contracts',
          label: 'Contratos',
          icon: <FileText className="mr-2 h-4 w-4" />,
          badge: userData.contracts
        },
        {
          id: 'analytics',
          label: 'Performance',
          icon: <FileSpreadsheet className="mr-2 h-4 w-4" />
        }
      ],
      'admin': [
        {
          id: 'properties',
          label: 'Gestão de Imóveis',
          icon: <Home className="mr-2 h-4 w-4" />
        },
        {
          id: 'users',
          label: 'Usuários',
          icon: <Users className="mr-2 h-4 w-4" />
        },
        {
          id: 'business',
          label: 'Empresas',
          icon: <BriefcaseBusiness className="mr-2 h-4 w-4" />
        },
        {
          id: 'contracts',
          label: 'Contratos',
          icon: <FileText className="mr-2 h-4 w-4" />
        },
        {
          id: 'analytics',
          label: 'Relatórios',
          icon: <FileSpreadsheet className="mr-2 h-4 w-4" />
        },
        {
          id: 'settings',
          label: 'Configurações',
          icon: <Settings className="mr-2 h-4 w-4" />
        }
      ]
    };
    
    return [...userSpecificItems[userType], ...commonItems];
  };
  
  const navItems = getNavItems();
  
  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
  };
  
  const renderNavItems = () => (
    <div className="space-y-1">
      {navItems.map((item) => (
        <Button
          key={item.id}
          variant="ghost"
          className={cn(
            "w-full justify-start font-normal",
            activeTab === item.id && "bg-kubico-blue/10 text-kubico-blue font-medium"
          )}
          onClick={() => {
            setActiveTab(item.id);
            if (isMobile) setIsMenuOpen(false);
          }}
        >
          {item.icon}
          {item.label}
          {item.badge !== undefined && (
            <span className={cn(
              "ml-auto text-xs rounded-full px-2 py-0.5",
              item.badgeHighlight 
                ? "bg-kubico-blue/10 text-kubico-blue font-medium" 
                : "bg-gray-100 text-gray-600"
            )}>
              {item.badge}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
  
  // Renderizamos diferentemente se for mobile
  if (isMobile) {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-sm w-[85vw]">
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
              
              {renderNavItems()}
              
              <div className="pt-6 mt-6 border-t border-gray-100">
                <Button
                  variant="ghost"
                  className="w-full justify-start font-normal text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div>
              
              <div className="bg-gradient-to-r from-kubico-blue to-kubico-blue/80 text-white rounded-xl p-6 shadow-sm mt-6">
                <h3 className="font-semibold mb-2">Precisa de ajuda?</h3>
                <p className="text-sm text-white/80 mb-4">Nossa equipe está disponível para atender você e responder qualquer dúvida.</p>
                <Button
                  className="w-full bg-white text-kubico-blue hover:bg-white/90"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/contact');
                  }}
                >
                  Fale Conosco
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  }
  
  // Versão desktop
  return (
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
        
        {renderNavItems()}
        
        <div className="pt-6 mt-6 border-t border-gray-100">
          <Button
            variant="ghost"
            className="w-full justify-start font-normal text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
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
  );
};

export default UserDashboard;
