
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { LogOut } from 'lucide-react';
import NavList from './NavList';
import UserProfile from './UserProfile';
import SupportCard from './SupportCard';
import { NavItem } from '@/utils/dashboardNavItems';
import { useNavigate } from 'react-router-dom';

interface MobileDashboardProps {
  navItems: NavItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userData: {
    name: string;
    avatar: string;
    role: string;
  };
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  onLogout: () => void;
}

const MobileDashboard: React.FC<MobileDashboardProps> = ({
  navItems,
  activeTab,
  setActiveTab,
  userData,
  isMenuOpen,
  setIsMenuOpen,
  onLogout
}) => {
  const navigate = useNavigate();
  
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
            <UserProfile 
              name={userData.name} 
              avatar={userData.avatar} 
              role={userData.role} 
            />
            
            <NavList 
              items={navItems} 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
              closeMobileMenu={() => setIsMenuOpen(false)}
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
};

export default MobileDashboard;
