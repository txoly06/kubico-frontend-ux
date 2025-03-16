
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Tipos de skeleton loaders
export type SkeletonType = 
  | 'card' 
  | 'list-item' 
  | 'text' 
  | 'avatar' 
  | 'image' 
  | 'table-row' 
  | 'form' 
  | 'chart'
  | 'property';

interface LoadingStateProps {
  type?: SkeletonType;
  count?: number;
  className?: string;
  fullPage?: boolean;
  text?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  type = 'text',
  count = 1,
  className,
  fullPage = false,
  text = 'Carregando...'
}) => {
  // Full page loader
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <Loader2 className="h-12 w-12 text-kubico-blue animate-spin mb-4" />
        <p className="text-kubico-gray-dark font-medium">{text}</p>
      </div>
    );
  }

  // Renderiza um array de skeletons com base no count
  const renderSkeletons = () => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <div key={index} className={cn("animate-pulse", className)}>
          {renderSkeletonByType(type)}
        </div>
      ));
  };

  // Renderiza um tipo específico de skeleton
  const renderSkeletonByType = (type: SkeletonType) => {
    switch (type) {
      case 'card':
        return (
          <div className="rounded-xl overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded-md w-full"></div>
              <div className="flex justify-between">
                <div className="h-8 bg-gray-200 rounded-md w-24"></div>
                <div className="h-8 bg-gray-200 rounded-md w-24"></div>
              </div>
            </div>
          </div>
        );
      
      case 'list-item':
        return (
          <div className="flex p-4 border rounded-lg">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="ml-4 flex-grow space-y-2">
              <div className="h-5 bg-gray-200 rounded-md w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
            </div>
            <div className="w-16 h-8 bg-gray-200 rounded-md flex-shrink-0"></div>
          </div>
        );
      
      case 'text':
        return (
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded-md w-4/6"></div>
          </div>
        );
      
      case 'avatar':
        return <div className="w-12 h-12 bg-gray-200 rounded-full"></div>;
      
      case 'image':
        return <div className="w-full h-64 bg-gray-200 rounded-lg"></div>;
      
      case 'table-row':
        return (
          <div className="flex border-b py-3">
            <div className="w-1/4 pr-2">
              <div className="h-5 bg-gray-200 rounded-md"></div>
            </div>
            <div className="w-1/4 px-2">
              <div className="h-5 bg-gray-200 rounded-md"></div>
            </div>
            <div className="w-1/4 px-2">
              <div className="h-5 bg-gray-200 rounded-md"></div>
            </div>
            <div className="w-1/4 pl-2">
              <div className="h-5 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        );
      
      case 'form':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-24"></div>
              <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-32"></div>
              <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-40"></div>
              <div className="h-24 bg-gray-200 rounded-md w-full"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded-md w-32 mt-4"></div>
          </div>
        );
      
      case 'chart':
        return (
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded-md w-1/3"></div>
            <div className="h-60 bg-gray-200 rounded-md w-full"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded-md w-16"></div>
              <div className="h-4 bg-gray-200 rounded-md w-16"></div>
              <div className="h-4 bg-gray-200 rounded-md w-16"></div>
              <div className="h-4 bg-gray-200 rounded-md w-16"></div>
            </div>
          </div>
        );

      case 'property':
        return (
          <div className="rounded-xl overflow-hidden bg-white">
            <div className="h-56 bg-gray-200"></div>
            <div className="p-5 space-y-4">
              <div className="h-7 bg-gray-200 rounded-md w-3/4"></div>
              <div className="h-5 bg-gray-200 rounded-md w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded-md w-1/3"></div>
              <div className="flex space-x-4">
                <div className="h-8 bg-gray-200 rounded-md w-16"></div>
                <div className="h-8 bg-gray-200 rounded-md w-16"></div>
                <div className="h-8 bg-gray-200 rounded-md w-16"></div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="h-10 bg-gray-200 rounded-md w-32"></div>
                <div className="h-10 bg-gray-200 rounded-md w-32"></div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div className="h-4 bg-gray-200 rounded-md w-full"></div>;
    }
  };

  // Se nenhum tipo específico, apenas mostrar o spinner
  if (type === 'text' && count === 1 && !className) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <Loader2 className="h-8 w-8 text-kubico-blue animate-spin mb-2" />
        <p className="text-kubico-gray-medium text-sm">{text}</p>
      </div>
    );
  }

  return <>{renderSkeletons()}</>;
};

export default LoadingState;
