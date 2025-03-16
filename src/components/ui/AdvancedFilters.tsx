
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ChevronDown, 
  ChevronUp, 
  HomeIcon, 
  Building, 
  BedDouble, 
  Bath,
  Car,
  SquareAsterisk, 
  MapPin,
  Filter, 
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FiltersState {
  propertyTypes: string[];
  priceRange: [number, number];
  bedrooms: number[];
  bathrooms: number[];
  parkingSpaces: number[];
  areaRange: [number, number];
  features: string[];
  neighborhoods: string[];
}

const initialFilters: FiltersState = {
  propertyTypes: [],
  priceRange: [300000, 3000000],
  bedrooms: [],
  bathrooms: [],
  parkingSpaces: [],
  areaRange: [30, 500],
  features: [],
  neighborhoods: []
};

interface AdvancedFiltersProps {
  onApplyFilters: (filters: FiltersState) => void;
  onClearFilters: () => void;
  activeFilterCount?: number;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  onApplyFilters,
  onClearFilters,
  activeFilterCount = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FiltersState>(initialFilters);

  const propertyTypeOptions = [
    { id: 'apartment', label: 'Apartamento', icon: <Building className="h-4 w-4 mr-2" /> },
    { id: 'house', label: 'Casa', icon: <HomeIcon className="h-4 w-4 mr-2" /> },
    { id: 'commercial', label: 'Comercial', icon: <SquareAsterisk className="h-4 w-4 mr-2" /> },
    { id: 'land', label: 'Terreno', icon: <MapPin className="h-4 w-4 mr-2" /> },
  ];

  const featureOptions = [
    { id: 'pool', label: 'Piscina' },
    { id: 'gym', label: 'Academia' },
    { id: 'balcony', label: 'Varanda' },
    { id: 'furnished', label: 'Mobiliado' },
    { id: 'security', label: 'Segurança 24h' },
    { id: 'pet_friendly', label: 'Pet Friendly' },
    { id: 'garden', label: 'Jardim' },
    { id: 'barbecue', label: 'Churrasqueira' }
  ];

  const neighborhoodOptions = [
    { id: 'jardins', label: 'Jardins' },
    { id: 'vila_mariana', label: 'Vila Mariana' },
    { id: 'pinheiros', label: 'Pinheiros' },
    { id: 'moema', label: 'Moema' },
    { id: 'itaim', label: 'Itaim Bibi' },
    { id: 'brooklin', label: 'Brooklin' },
    { id: 'vila_madalena', label: 'Vila Madalena' },
    { id: 'perdizes', label: 'Perdizes' }
  ];

  const togglePropertyType = (type: string) => {
    setFilters(prev => {
      const types = prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type];
      return { ...prev, propertyTypes: types };
    });
  };

  const toggleFeature = (feature: string) => {
    setFilters(prev => {
      const features = prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature];
      return { ...prev, features };
    });
  };

  const toggleNeighborhood = (neighborhood: string) => {
    setFilters(prev => {
      const neighborhoods = prev.neighborhoods.includes(neighborhood)
        ? prev.neighborhoods.filter(n => n !== neighborhood)
        : [...prev.neighborhoods, neighborhood];
      return { ...prev, neighborhoods };
    });
  };

  const toggleOption = (option: number, array: number[], setter: (values: number[]) => void) => {
    const newArray = array.includes(option)
      ? array.filter(item => item !== option)
      : [...array, option];
    setter(newArray);
  };

  const handleRoomToggle = (value: number) => {
    setFilters(prev => {
      const bedrooms = prev.bedrooms.includes(value)
        ? prev.bedrooms.filter(b => b !== value)
        : [...prev.bedrooms, value];
      return { ...prev, bedrooms };
    });
  };

  const handleBathroomToggle = (value: number) => {
    setFilters(prev => {
      const bathrooms = prev.bathrooms.includes(value)
        ? prev.bathrooms.filter(b => b !== value)
        : [...prev.bathrooms, value];
      return { ...prev, bathrooms };
    });
  };

  const handleParkingToggle = (value: number) => {
    setFilters(prev => {
      const parkingSpaces = prev.parkingSpaces.includes(value)
        ? prev.parkingSpaces.filter(p => p !== value)
        : [...prev.parkingSpaces, value];
      return { ...prev, parkingSpaces };
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [values[0], values[1]] as [number, number]
    }));
  };

  const handleAreaRangeChange = (values: number[]) => {
    setFilters(prev => ({
      ...prev,
      areaRange: [values[0], values[1]] as [number, number]
    }));
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    setIsExpanded(false);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    onClearFilters();
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-lg border border-gray-100 mb-8 overflow-hidden">
      {/* Filter toggle header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Filter className="h-5 w-5 mr-2 text-kubico-blue" />
          <h3 className="font-medium">Filtros Avançados</h3>
          {activeFilterCount > 0 && (
            <Badge variant="outline" className="ml-2 bg-kubico-blue/10 text-kubico-blue border-kubico-blue/20">
              {activeFilterCount} filtros ativos
            </Badge>
          )}
        </div>
        <div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>

      {/* Expanded filters */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Property Type */}
            <div className="md:col-span-6">
              <h4 className="font-medium mb-3 text-sm">Tipo de Imóvel</h4>
              <div className="flex flex-wrap gap-2">
                {propertyTypeOptions.map((option) => (
                  <Button
                    key={option.id}
                    type="button"
                    variant={filters.propertyTypes.includes(option.id) ? "default" : "outline"}
                    className={`flex items-center ${
                      filters.propertyTypes.includes(option.id)
                        ? "bg-kubico-blue hover:bg-kubico-blue/90"
                        : "border-gray-200"
                    }`}
                    onClick={() => togglePropertyType(option.id)}
                  >
                    {option.icon}
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="md:col-span-6">
              <h4 className="font-medium mb-3 text-sm">Faixa de Preço</h4>
              <div className="px-3">
                <Slider
                  defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                  min={300000}
                  max={3000000}
                  step={50000}
                  onValueChange={handlePriceRangeChange}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>{formatCurrency(filters.priceRange[0])}</span>
                  <span>{formatCurrency(filters.priceRange[1])}</span>
                </div>
              </div>
            </div>

            {/* Bedrooms */}
            <div className="md:col-span-4">
              <h4 className="font-medium mb-3 text-sm flex items-center">
                <BedDouble className="h-4 w-4 mr-2" />
                Quartos
              </h4>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={`bedroom-${num}`}
                    type="button"
                    variant={filters.bedrooms.includes(num) ? "default" : "outline"}
                    className={`min-w-10 ${
                      filters.bedrooms.includes(num)
                        ? "bg-kubico-blue hover:bg-kubico-blue/90"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleRoomToggle(num)}
                  >
                    {num === 5 ? "5+" : num}
                  </Button>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div className="md:col-span-4">
              <h4 className="font-medium mb-3 text-sm flex items-center">
                <Bath className="h-4 w-4 mr-2" />
                Banheiros
              </h4>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={`bathroom-${num}`}
                    type="button"
                    variant={filters.bathrooms.includes(num) ? "default" : "outline"}
                    className={`min-w-10 ${
                      filters.bathrooms.includes(num)
                        ? "bg-kubico-blue hover:bg-kubico-blue/90"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleBathroomToggle(num)}
                  >
                    {num === 5 ? "5+" : num}
                  </Button>
                ))}
              </div>
            </div>

            {/* Parking */}
            <div className="md:col-span-4">
              <h4 className="font-medium mb-3 text-sm flex items-center">
                <Car className="h-4 w-4 mr-2" />
                Vagas
              </h4>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={`parking-${num}`}
                    type="button"
                    variant={filters.parkingSpaces.includes(num) ? "default" : "outline"}
                    className={`min-w-10 ${
                      filters.parkingSpaces.includes(num)
                        ? "bg-kubico-blue hover:bg-kubico-blue/90"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleParkingToggle(num)}
                  >
                    {num === 5 ? "5+" : num}
                  </Button>
                ))}
              </div>
            </div>

            {/* Area Range */}
            <div className="md:col-span-6">
              <h4 className="font-medium mb-3 text-sm">Área (m²)</h4>
              <div className="px-3">
                <Slider
                  defaultValue={[filters.areaRange[0], filters.areaRange[1]]}
                  min={30}
                  max={500}
                  step={10}
                  onValueChange={handleAreaRangeChange}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>{filters.areaRange[0]} m²</span>
                  <span>{filters.areaRange[1]} m²</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="md:col-span-6">
              <h4 className="font-medium mb-3 text-sm">Características</h4>
              <div className="grid grid-cols-2 gap-2">
                {featureOptions.map((feature) => (
                  <div key={feature.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`feature-${feature.id}`}
                      checked={filters.features.includes(feature.id)}
                      onCheckedChange={() => toggleFeature(feature.id)}
                    />
                    <label
                      htmlFor={`feature-${feature.id}`}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {feature.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Neighborhoods */}
            <div className="md:col-span-12">
              <h4 className="font-medium mb-3 text-sm">Bairros</h4>
              <div className="flex flex-wrap gap-2">
                {neighborhoodOptions.map((neighborhood) => (
                  <Button
                    key={neighborhood.id}
                    type="button"
                    variant={filters.neighborhoods.includes(neighborhood.id) ? "default" : "outline"}
                    size="sm"
                    className={`${
                      filters.neighborhoods.includes(neighborhood.id)
                        ? "bg-kubico-blue hover:bg-kubico-blue/90"
                        : "border-gray-200"
                    }`}
                    onClick={() => toggleNeighborhood(neighborhood.id)}
                  >
                    {neighborhood.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              className="border-gray-200"
            >
              <X className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
            <Button
              type="button"
              onClick={applyFilters}
              className="bg-kubico-blue hover:bg-kubico-blue/90"
            >
              <Filter className="h-4 w-4 mr-2" />
              Aplicar Filtros
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;
