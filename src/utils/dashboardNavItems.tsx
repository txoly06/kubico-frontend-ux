
import React from 'react';
import { 
  Home, 
  User, 
  Heart, 
  FileText, 
  Bell, 
  Settings, 
  Calendar, 
  MessageSquare, 
  FileSpreadsheet, 
  BriefcaseBusiness,
  Users
} from 'lucide-react';
import { UserType } from '@/components/ui/UserDashboard';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  badgeHighlight?: boolean;
}

export const getNavItems = (userType: UserType, userData: {
  properties: number;
  favorites: number;
  contracts: number;
  notifications: number;
}): NavItem[] => {
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
