import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'agent' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (password: string, confirmPassword: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithFacebook: () => Promise<boolean>;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Verificar se usuário está autenticado ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('kubico_user');
        const token = localStorage.getItem('kubico_token');
        
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Em uma aplicação real, aqui seria feita uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulando credenciais válidas
      if (email === 'usuario@exemplo.com' && password === 'senha123') {
        const userData: User = {
          id: '1',
          name: 'Ana Silva',
          email: email,
          role: 'client'
        };
        
        setUser(userData);
        localStorage.setItem('kubico_token', 'token_simulado');
        localStorage.setItem('kubico_user', JSON.stringify(userData));
        
        toast.success('Login realizado com sucesso!');
        return true;
      } else {
        toast.error('Credenciais inválidas');
        return false;
      }
    } catch (error) {
      toast.error('Erro ao realizar login');
      console.error('Erro de login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulação de registro
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Cadastro realizado com sucesso!');
      return true;
    } catch (error) {
      toast.error('Erro ao realizar cadastro');
      console.error('Erro de cadastro:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('kubico_token');
    localStorage.removeItem('kubico_user');
    setUser(null);
    toast.info('Sessão encerrada');
    navigate('/');
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulação de envio de email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Email de recuperação enviado com sucesso!');
      return true;
    } catch (error) {
      toast.error('Erro ao enviar email de recuperação');
      console.error('Erro de recuperação de senha:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (password: string, confirmPassword: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulação de reset de senha
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Senha redefinida com sucesso!');
      return true;
    } catch (error) {
      toast.error('Erro ao redefinir senha');
      console.error('Erro ao redefinir senha:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulação da autenticação com Google
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData: User = {
        id: 'g123',
        name: 'João Silva',
        email: 'joao.silva@gmail.com',
        role: 'client',
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLKjOiAc...'
      };
      
      setUser(userData);
      localStorage.setItem('kubico_token', 'token_google_simulado');
      localStorage.setItem('kubico_user', JSON.stringify(userData));
      
      toast.success('Login com Google realizado com sucesso!');
      return true;
    } catch (error) {
      toast.error('Erro ao realizar login com Google');
      console.error('Erro de login com Google:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithFacebook = async (): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulação da autenticação com Facebook
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData: User = {
        id: 'f456',
        name: 'Ana Santos',
        email: 'ana.santos@facebook.com',
        role: 'client',
        avatar: 'https://platform-lookaside.fbsbx.com/platform/profilepic...'
      };
      
      setUser(userData);
      localStorage.setItem('kubico_token', 'token_facebook_simulado');
      localStorage.setItem('kubico_user', JSON.stringify(userData));
      
      toast.success('Login com Facebook realizado com sucesso!');
      return true;
    } catch (error) {
      toast.error('Erro ao realizar login com Facebook');
      console.error('Erro de login com Facebook:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    loginWithGoogle,
    loginWithFacebook
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};
