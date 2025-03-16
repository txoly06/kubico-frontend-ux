
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Acesso Negado</h1>
          
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Você não tem permissão para acessar esta página. Entre em contato com o administrador se acredita que isso é um erro.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para a página inicial
              </Link>
            </Button>
            
            <Button asChild>
              <Link to="/auth/login" className="bg-kubico-blue hover:bg-kubico-blue/90">
                Fazer login com outra conta
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Unauthorized;
