
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { getNavItems } from '@/utils/dashboardNavItems';
import MobileDashboard from './dashboard/MobileDashboard';
import DesktopDashboard from './dashboard/DesktopDashboard';

export type UserType = 'regular' | 'premium' | 'agent' | 'admin';

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
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = getNavItems(userType, userData);
  
  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
  };
  
  // Render different UI for mobile and desktop
  if (isMobile) {
    return (
      <MobileDashboard
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userData={userData}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onLogout={handleLogout}
      />
    );
  }
  
  // Desktop UI
  return (
    <DesktopDashboard
      navItems={navItems}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      userData={userData}
      onLogout={handleLogout}
    />
  );
};

export default UserDashboard;
