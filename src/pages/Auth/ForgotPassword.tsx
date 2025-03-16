
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      return;
    }
    
    const success = await forgotPassword(email);
    
    if (success) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 bg-gray-50">
        <div className="w-full max-w-md px-4">
          <Card className="w-full">
            <CardHeader className="space-y-1">
              <div className="flex items-center mb-2">
                <Link to="/auth/login" className="text-gray-500 hover:text-kubico-blue">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <span className="ml-2 text-sm text-gray-500">Voltar para o login</span>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Recuperar senha</CardTitle>
              <CardDescription className="text-center">
                Informe seu email para receber instruções de recuperação de senha
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="email"
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-kubico-blue hover:bg-kubico-blue/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar instruções
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Email enviado com sucesso!</h3>
                  <p className="text-gray-600 mb-4">
                    Enviamos um email para <strong>{email}</strong> com instruções para recuperar sua senha.
                  </p>
                  <p className="text-sm text-gray-500">
                    Não recebeu o email? Verifique sua caixa de spam ou{' '}
                    <button 
                      className="text-kubico-blue hover:underline"
                      onClick={() => setIsSubmitted(false)}
                    >
                      tente novamente
                    </button>
                  </p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <div className="text-sm text-gray-600">
                Lembrou sua senha?{' '}
                <Link to="/auth/login" className="text-kubico-blue hover:underline font-medium">
                  Voltar para login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
