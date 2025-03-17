
import React from 'react';
import { Loader2 } from 'lucide-react';

export type LoadingVariant = 'card' | 'table' | 'list' | 'profile' | 'text' | 'form';
export type LoadingSize = 'sm' | 'md' | 'lg';

interface LoadingStateProps {
  variant?: LoadingVariant;
  size?: LoadingSize;
  text?: string;
  rows?: number;
  count?: number; // Added this property for backward compatibility
  fullPage?: boolean;
  transparent?: boolean;
  className?: string; // Added className prop
}

const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'card',
  size = 'md',
  text = 'Carregando...',
  rows = 3,
  count, // Handle the count prop
  fullPage = false,
  transparent = false,
  className = ''
}) => {
  // If count is provided, use it for rows
  const itemCount = count !== undefined ? count : rows;

  // Configuração de tamanho
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };
  
  // Componente spinner simples
  const Spinner = () => (
    <div className="flex flex-col items-center justify-center">
      <Loader2 className={`${sizeClasses[size]} text-kubico-blue animate-spin`} />
      {text && <p className="mt-2 text-kubico-gray-medium">{text}</p>}
    </div>
  );
  
  // Loading de página inteira
  if (fullPage) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center ${!transparent ? 'bg-white' : 'bg-white/50 backdrop-blur-sm'}`}>
        <Spinner />
      </div>
    );
  }
  
  // Apply additional className if provided
  const containerClassName = className ? `${className} space-y-4` : 'space-y-4';
  
  // Skeleton para cards
  if (variant === 'card') {
    return (
      <div className={containerClassName}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <div key={index} className="bg-gray-100 rounded-lg animate-pulse">
            <div className="h-40 bg-gray-200 rounded-t-lg" />
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
              </div>
              <div className="flex justify-between pt-2">
                <div className="h-8 bg-gray-200 rounded w-1/4" />
                <div className="h-8 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // Skeleton para tabelas
  if (variant === 'table') {
    return (
      <div className={`border rounded-lg overflow-hidden ${className}`}>
        <div className="bg-gray-100 p-4 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/4" />
        </div>
        <div className="divide-y">
          {Array.from({ length: itemCount }).map((_, index) => (
            <div key={index} className="p-4 flex items-center space-x-4 animate-pulse">
              <div className="h-10 w-10 bg-gray-200 rounded-full" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="h-6 bg-gray-200 rounded w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Skeleton para listas
  if (variant === 'list') {
    return (
      <div className="space-y-3 animate-pulse">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="flex items-center space-x-3 py-2">
            <div className="h-8 w-8 bg-gray-200 rounded-full" />
            <div className="space-y-1 flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="h-6 w-6 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }
  
  // Skeleton para perfil/avatar
  if (variant === 'profile') {
    return (
      <div className="flex flex-col items-center animate-pulse">
        <div className="h-24 w-24 bg-gray-200 rounded-full mb-4" />
        <div className="h-5 bg-gray-200 rounded w-32 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
        <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
          <div className="h-16 bg-gray-200 rounded flex flex-col items-center justify-center">
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-1" />
            <div className="h-3 bg-gray-300 rounded w-3/4" />
          </div>
          <div className="h-16 bg-gray-200 rounded flex flex-col items-center justify-center">
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-1" />
            <div className="h-3 bg-gray-300 rounded w-3/4" />
          </div>
          <div className="h-16 bg-gray-200 rounded flex flex-col items-center justify-center">
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-1" />
            <div className="h-3 bg-gray-300 rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }
  
  // Skeleton para texto/conteúdo
  if (variant === 'text') {
    return (
      <div className="space-y-2 animate-pulse">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="space-y-1">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-11/12" />
            <div className="h-4 bg-gray-200 rounded w-4/5" />
          </div>
        ))}
      </div>
    );
  }
  
  // Skeleton para formulários
  if (variant === 'form') {
    return (
      <div className="space-y-4 animate-pulse">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="space-y-1">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-1" />
            <div className="h-10 bg-gray-200 rounded w-full" />
          </div>
        ))}
        <div className="h-10 bg-gray-200 rounded w-1/3 mt-6" />
      </div>
    );
  }
  
  // Fallback para spinner simples
  return <Spinner />;
};

export default LoadingState;
