
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center transition-opacity duration-300 hover:opacity-80"
          >
            <span className="font-display font-bold text-2xl bg-gradient-to-r from-kubico-blue to-kubico-green bg-clip-text text-transparent">
              Kubico
            </span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/properties" 
              className="relative px-3 py-2 text-sm font-medium text-kubico-gray-dark hover:text-kubico-blue transition-colors duration-200"
            >
              Imóveis
            </Link>
            <div className="relative group">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-kubico-gray-dark hover:text-kubico-blue transition-colors duration-200">
                Serviços <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform scale-95 group-hover:scale-100">
                <div className="py-1">
                  <Link to="/valuation" className="block px-4 py-2 text-sm text-kubico-gray-dark hover:bg-gray-50">
                    Avaliação de Imóveis
                  </Link>
                  <Link to="/contracts" className="block px-4 py-2 text-sm text-kubico-gray-dark hover:bg-gray-50">
                    Gestão de Contratos
                  </Link>
                  <Link to="/messages" className="block px-4 py-2 text-sm text-kubico-gray-dark hover:bg-gray-50">
                    Mensagens
                  </Link>
                </div>
              </div>
            </div>
            <Link 
              to="/about" 
              className="px-3 py-2 text-sm font-medium text-kubico-gray-dark hover:text-kubico-blue transition-colors duration-200"
            >
              Sobre
            </Link>
            <Link 
              to="/contact" 
              className="px-3 py-2 text-sm font-medium text-kubico-gray-dark hover:text-kubico-blue transition-colors duration-200"
            >
              Contato
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="font-medium">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="font-medium bg-kubico-blue hover:bg-kubico-blue/90">
                Cadastre-se
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-kubico-gray-dark hover:text-kubico-blue focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
        <nav className="relative h-full w-64 max-w-sm ml-auto bg-white shadow-xl flex flex-col">
          <div className="p-5 border-b">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-2xl bg-gradient-to-r from-kubico-blue to-kubico-green bg-clip-text text-transparent">
                Kubico
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-kubico-gray-dark hover:text-kubico-blue focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="px-2 py-4 space-y-1">
              <Link
                to="/properties"
                className="block px-3 py-2 rounded-md text-base font-medium text-kubico-gray-dark hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Imóveis
              </Link>
              <Link
                to="/valuation"
                className="block px-3 py-2 rounded-md text-base font-medium text-kubico-gray-dark hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Avaliação de Imóveis
              </Link>
              <Link
                to="/contracts"
                className="block px-3 py-2 rounded-md text-base font-medium text-kubico-gray-dark hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gestão de Contratos
              </Link>
              <Link
                to="/messages"
                className="block px-3 py-2 rounded-md text-base font-medium text-kubico-gray-dark hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Mensagens
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-kubico-gray-dark hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-kubico-gray-dark hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contato
              </Link>
            </div>
          </div>
          <div className="p-4 border-t space-y-4">
            <Link
              to="/login"
              className="w-full block px-4 py-2 text-center rounded-md text-kubico-gray-dark border border-gray-300 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="w-full block px-4 py-2 text-center rounded-md text-white bg-kubico-blue hover:bg-kubico-blue/90"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cadastre-se
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
