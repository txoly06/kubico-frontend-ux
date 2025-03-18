
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyResultsProps {
  onClearFilters: () => void;
}

const EmptyResults: React.FC<EmptyResultsProps> = ({ onClearFilters }) => {
  return (
    <div className="p-12 text-center bg-gray-50 rounded-lg border border-gray-100">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Nenhum imóvel encontrado</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6">
        Não encontramos imóveis com os filtros selecionados. Tente ajustar seus critérios de busca.
      </p>
      <Button onClick={onClearFilters}>
        Limpar Filtros
      </Button>
    </div>
  );
};

export default EmptyResults;
