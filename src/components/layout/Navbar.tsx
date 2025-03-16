import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LogIn, Menu, X, User, Home, Building, MessageSquare, FileText, ChevronDown, Heart, BarChart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Notifications from '@/components/ui/Notifications';

const mainNavItems = [
  { label: 'Início', path: '/', icon: <Home className="w-4 h-4 mr-2" /> },
  { label: 'Comprar', path: '/properties?type=sale', icon: <Building className="w-4 h-4 mr-2" /> },
  { label: 'Alugar', path: '/properties?type=rent', icon: <Building className="w-4 h-4 mr-2" /> },
  { label: 'Avaliação de Imóveis', path: '/property-valuation', icon: <BarChart className="w-4 h-4 mr-2" /> },
  { label: 'Contato', path: '/contact', icon: <MessageSquare className="w-4 h-4 mr-2" /> },
];

const dashboardNavItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Meus Imóveis', path: '/properties/my' },
  { label: 'Contratos', path: '/contracts' },
  { label: 'Mensagens', path: '/messages' },
  { label: 'Favoritos', path: '/dashboard?tab=favorites' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navClasses = cn(
    "fixed top-0 w-full z-50 transition-all duration-300",
    {
      "bg-white shadow-sm": isScrolled || pathname !== '/',
      "bg-transparent": !isScrolled && pathname === '/',
    }
  );

  const getLinkClasses = (path: string) => {
    const isActive = pathname === path || pathname.startsWith(`${path}/`);
    
    return cn(
      "text-sm font-medium relative transition-colors",
      {
        "text-kubico-blue": isActive,
        "text-gray-700 hover:text-kubico-blue": !isActive && (isScrolled || pathname !== '/'),
        "text-white hover:text-white/80": !isActive && !isScrolled && pathname === '/',
      }
    );
  };

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <h1 className={cn(
              "text-xl font-semibold transition-colors",
              {
                "text-kubico-blue": isScrolled || pathname !== '/',
                "text-white": !isScrolled && pathname === '/',
              }
            )}>
              Kubico
            </h1>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {mainNavItems.map((item) => (
              <Link key={item.path} to={item.path} className={getLinkClasses(item.path)}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {user && (
              <Notifications className="mr-1" />
            )}
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-kubico-blue text-white">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name || 'Usuário'}</p>
                      <p className="w-[200px] truncate text-sm text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <BarChart className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard?tab=profile" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Meu Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/properties/my" className="cursor-pointer">
                      <Building className="w-4 h-4 mr-2" />
                      Meus Imóveis
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/contracts" className="cursor-pointer">
                      <FileText className="w-4 h-4 mr-2" />
                      Contratos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/messages" className="cursor-pointer">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Mensagens
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard?tab=favorites" className="cursor-pointer">
                      <Heart className="w-4 h-4 mr-2" />
                      Favoritos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="text-red-600 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4 mr-2 rotate-180" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center">
                <Link to="/auth/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "mr-2",
                      {
                        "text-gray-700 border-gray-300": isScrolled || pathname !== '/',
                        "text-white border-white/20 hover:bg-white/10 hover:text-white": 
                          !isScrolled && pathname === '/',
                      }
                    )}
                  >
                    Entrar
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button
                    size="sm"
                    className={cn(
                      {
                        "bg-kubico-blue hover:bg-kubico-blue/90": isScrolled || pathname !== '/',
                        "bg-white text-kubico-blue hover:bg-white/90": 
                          !isScrolled && pathname === '/',
                      }
                    )}
                  >
                    Cadastrar
                  </Button>
                </Link>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "lg:hidden ml-2",
                {
                  "text-gray-700": isScrolled || pathname !== '/',
                  "text-white": !isScrolled && pathname === '/',
                }
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-md">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col divide-y divide-gray-100">
              {mainNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center py-3 text-gray-700 hover:text-kubico-blue"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              
              {user && (
                <>
                  <div className="py-2">
                    <p className="text-sm font-medium text-gray-500 mb-2 pt-2">
                      Dashboard
                    </p>
                    {dashboardNavItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block py-2 pl-4 text-gray-700 hover:text-kubico-blue"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <Button
                    onClick={logout}
                    variant="ghost"
                    className="mt-2 py-3 justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogIn className="h-4 w-4 mr-2 rotate-180" />
                    Sair
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
