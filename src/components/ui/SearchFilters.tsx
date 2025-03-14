
import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchFilters = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    features: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFilters(prev => {
      const features = [...prev.features];
      const index = features.indexOf(feature);
      
      if (index === -1) {
        features.push(feature);
      } else {
        features.splice(index, 1);
      }
      
      return { ...prev, features };
    });
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      priceMin: '',
      priceMax: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      features: []
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300">
      {/* Basic search */}
      <div className="p-4">
        <div className="flex flex-wrap md:flex-nowrap gap-3">
          <div className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por endereço, bairro ou cidade"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-kubico-blue/20 focus:border-kubico-blue"
              />
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              className="flex-shrink-0"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button type="submit" className="bg-kubico-blue hover:bg-kubico-blue/90 flex-shrink-0">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </div>
      </div>
      
      {/* Advanced filters */}
      {showAdvanced && (
        <div className="p-4 pt-0 border-t border-gray-100 animate-fade-in">
          <div className="flex justify-between items-center mb-4 pt-4">
            <h3 className="font-medium">Filtros Avançados</h3>
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm text-kubico-blue hover:text-kubico-blue/80 flex items-center"
            >
              <X className="h-3 w-3 mr-1" />
              Limpar
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Imóvel
              </label>
              <select
                name="type"
                value={filters.type}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-kubico-blue/20 focus:border-kubico-blue"
              >
                <option value="">Todos os tipos</option>
                <option value="apartment">Apartamento</option>
                <option value="house">Casa</option>
                <option value="commercial">Comercial</option>
                <option value="land">Terreno</option>
              </select>
            </div>
            
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Faixa de Preço
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="priceMin"
                  placeholder="Mínimo"
                  value={filters.priceMin}
                  onChange={handleChange}
                  className="w-1/2 bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-kubico-blue/20 focus:border-kubico-blue"
                />
                <input
                  type="text"
                  name="priceMax"
                  placeholder="Máximo"
                  value={filters.priceMax}
                  onChange={handleChange}
                  className="w-1/2 bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-kubico-blue/20 focus:border-kubico-blue"
                />
              </div>
            </div>
            
            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quartos
              </label>
              <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-kubico-blue/20 focus:border-kubico-blue"
              >
                <option value="">Qualquer</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            
            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banheiros
              </label>
              <select
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-kubico-blue/20 focus:border-kubico-blue"
              >
                <option value="">Qualquer</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            
            {/* Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Área (m²)
              </label>
              <input
                type="text"
                name="area"
                placeholder="Área mínima"
                value={filters.area}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-kubico-blue/20 focus:border-kubico-blue"
              />
            </div>
          </div>
          
          {/* Features */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Características
            </label>
            <div className="flex flex-wrap gap-2">
              {['pool', 'garden', 'gym', 'security', 'garage', 'furnished'].map((feature) => {
                const labels: Record<string, string> = {
                  pool: 'Piscina',
                  garden: 'Jardim',
                  gym: 'Academia',
                  security: 'Segurança 24h',
                  garage: 'Garagem',
                  furnished: 'Mobiliado'
                };
                
                const isActive = filters.features.includes(feature);
                
                return (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => handleFeatureToggle(feature)}
                    className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-kubico-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {labels[feature]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
