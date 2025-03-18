
import React from 'react';
import { Button } from '@/components/ui/button';

const Pagination: React.FC = () => {
  return (
    <div className="mt-10 flex justify-center">
      <nav className="flex items-center space-x-2" aria-label="Paginação">
        <Button variant="outline" className="h-10 px-4 text-kubico-gray-dark border-gray-200" disabled aria-label="Página anterior" aria-disabled="true">
          Anterior
        </Button>
        <Button className="h-10 w-10 bg-kubico-blue hover:bg-kubico-blue/90" aria-label="Página 1" aria-current="page">1</Button>
        <Button variant="outline" className="h-10 w-10 text-kubico-gray-dark border-gray-200" aria-label="Página 2">2</Button>
        <Button variant="outline" className="h-10 w-10 text-kubico-gray-dark border-gray-200" aria-label="Página 3">3</Button>
        <span className="text-kubico-gray-dark">...</span>
        <Button variant="outline" className="h-10 w-10 text-kubico-gray-dark border-gray-200" aria-label="Página 12">12</Button>
        <Button variant="outline" className="h-10 px-4 text-kubico-gray-dark border-gray-200" aria-label="Próxima página">
          Próxima
        </Button>
      </nav>
    </div>
  );
};

export default Pagination;
