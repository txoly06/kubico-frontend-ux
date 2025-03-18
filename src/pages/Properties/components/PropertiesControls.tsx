
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, LayoutList, MapPin, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertiesControlsProps {
  propertiesCount: number;
  sortOption: string;
  setSortOption: (option: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const PropertiesControls: React.FC<PropertiesControlsProps> = ({
  propertiesCount,
  sortOption,
  setSortOption,
  viewMode,
  setViewMode
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-between items-center mb-6">
      <div className="mb-4 md:mb-0">
        <p className="text-kubico-gray-dark">
          <span className="font-medium text-gray-900">{propertiesCount}</span> imóveis encontrados
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        {/* Sort options */}
        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-10 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-kubico-blue/20 focus:border-kubico-blue"
            aria-label="Ordenar imóveis por"
            id="sortOptions"
          >
            <option value="relevance">Relevância</option>
            <option value="price-asc">Menor Preço</option>
            <option value="price-desc">Maior Preço</option>
            <option value="newest">Mais Recentes</option>
            <option value="bedrooms">Mais Quartos</option>
            <option value="area">Maior Área</option>
          </select>
          <ArrowUpDown className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
        </div>
        
        {/* View toggle */}
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          <button
            className={`p-2 ${viewMode === 'grid' ? 'bg-kubico-blue text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setViewMode('grid')}
            aria-label="Ver em grade"
            aria-pressed={viewMode === 'grid'}
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          <button
            className={`p-2 ${viewMode === 'list' ? 'bg-kubico-blue text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setViewMode('list')}
            aria-label="Ver em lista"
            aria-pressed={viewMode === 'list'}
          >
            <LayoutList className="h-5 w-5" />
          </button>
        </div>
        
        {/* Map view button */}
        <Button 
          variant="outline" 
          className="hidden md:flex items-center"
          onClick={() => navigate('/properties/map')}
          aria-label="Ver imóveis no mapa"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Ver no Mapa
        </Button>
      </div>
    </div>
  );
};

export default PropertiesControls;
