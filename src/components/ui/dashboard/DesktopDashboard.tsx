
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import NavList from './NavList';
import UserProfile from './UserProfile';
import SupportCard from './SupportCard';
import { NavItem } from '@/utils/dashboardNavItems';

interface DesktopDashboardProps {
  navItems: NavItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userData: {
    name: string;
    avatar: string;
    role: string;
  };
  onLogout: () => void;
}

const DesktopDashboard: React.FC<DesktopDashboardProps> = ({
  navItems,
  activeTab,
  setActiveTab,
  userData,
  onLogout
}) => {
  return (
    <aside className="md:w-64 flex-shrink-0">
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm mb-6">
        <UserProfile 
          name={userData.name} 
          avatar={userData.avatar} 
          role={userData.role} 
        />
        
        <NavList 
          items={navItems} 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />
        
        <div className="pt-6 mt-6 border-t border-gray-100">
          <Button
            variant="ghost"
            className="w-full justify-start font-normal text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
      
      <SupportCard />
    </aside>
  );
};

export default DesktopDashboard;
