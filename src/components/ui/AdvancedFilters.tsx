
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Search, Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Tipos de propriedades
interface AdvancedFiltersProps {
  onApplyFilters: (filters: any) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
}

// Opções de filtros
const propertyTypes = [
  { id: 'apartment', label: 'Apartamento' },
  { id: 'house', label: 'Casa' },
  { id: 'commercial', label: 'Comercial' },
  { id: 'land', label: 'Terreno' },
  { id: 'rural', label: 'Rural' },
];

const bedroomOptions = [1, 2, 3, 4, 5];
const bathroomOptions = [1, 2, 3, 4, 5];
const parkingOptions = [1, 2, 3, 4];

const amenityOptions = [
  { id: 'pool', label: 'Piscina' },
  { id: 'gym', label: 'Academia' },
  { id: 'garden', label: 'Jardim' },
  { id: 'barbecue', label: 'Churrasqueira' },
  { id: 'security', label: 'Segurança 24h' },
  { id: 'elevator', label: 'Elevador' },
  { id: 'garage', label: 'Garagem' },
  { id: 'balcony', label: 'Varanda' },
];

const neighborhoodOptions = [
  { id: 'jardins', label: 'Jardins' },
  { id: 'vila-mariana', label: 'Vila Mariana' },
  { id: 'moema', label: 'Moema' },
  { id: 'itaim', label: 'Itaim' },
  { id: 'pinheiros', label: 'Pinheiros' },
  { id: 'brooklin', label: 'Brooklin' },
  { id: 'morumbi', label: 'Morumbi' },
  { id: 'centro', label: 'Centro' },
];

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  onApplyFilters,
  onClearFilters,
  activeFilterCount
}) => {
  // Estado inicial dos filtros
  const [filters, setFilters] = useState({
    propertyTypes: [],
    priceRange: [300000, 3000000],
    bedrooms: [],
    bathrooms: [],
    parkingSpaces: [],
    areaRange: [30, 500],
    features: [],
    neighborhoods: [],
    furnished: null
  });
  
  // Funções para modificar os filtros
  const handlePropertyTypeChange = (type: string) => {
    setFilters(prev => {
      const types = prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type];
      return { ...prev, propertyTypes: types };
    });
  };
  
  const handleBedroomChange = (count: number) => {
    setFilters(prev => {
      const bedrooms = prev.bedrooms.includes(count)
        ? prev.bedrooms.filter(b => b !== count)
        : [...prev.bedrooms, count];
      return { ...prev, bedrooms };
    });
  };
  
  const handleBathroomChange = (count: number) => {
    setFilters(prev => {
      const bathrooms = prev.bathrooms.includes(count)
        ? prev.bathrooms.filter(b => b !== count)
        : [...prev.bathrooms, count];
      return { ...prev, bathrooms };
    });
  };
  
  const handleParkingChange = (count: number) => {
    setFilters(prev => {
      const parkingSpaces = prev.parkingSpaces.includes(count)
        ? prev.parkingSpaces.filter(p => p !== count)
        : [...prev.parkingSpaces, count];
      return { ...prev, parkingSpaces };
    });
  };
  
  const handleFeatureChange = (feature: string) => {
    setFilters(prev => {
      const features = prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature];
      return { ...prev, features };
    });
  };
  
  const handleNeighborhoodChange = (neighborhood: string) => {
    setFilters(prev => {
      const neighborhoods = prev.neighborhoods.includes(neighborhood)
        ? prev.neighborhoods.filter(n => n !== neighborhood)
        : [...prev.neighborhoods, neighborhood];
      return { ...prev, neighborhoods };
    });
  };
  
  const handleFurnishedChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      furnished: value === "null" ? null : value === "true"
    }));
  };
  
  // Funções para aplicar e limpar filtros
  const applyFilters = () => {
    onApplyFilters(filters);
  };
  
  const clearFilters = () => {
    setFilters({
      propertyTypes: [],
      priceRange: [300000, 3000000],
      bedrooms: [],
      bathrooms: [],
      parkingSpaces: [],
      areaRange: [30, 500],
      features: [],
      neighborhoods: [],
      furnished: null
    });
    onClearFilters();
  };
  
  // Formatação de valores monetários
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };
  
  return (
    <div className="mb-8">
      {/* Versão para desktop */}
      <div className="hidden md:block">
        <Accordion type="single" collapsible className="w-full bg-white border border-gray-100 rounded-xl shadow-sm">
          <AccordionItem value="filters" className="border-b-0">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>Filtros Avançados</span>
                {activeFilterCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-kubico-blue/10 text-kubico-blue text-xs font-medium rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Tipo de Imóvel */}
                <div>
                  <h3 className="font-medium mb-2">Tipo de Imóvel</h3>
                  <div className="space-y-1">
                    {propertyTypes.map((type) => (
                      <div key={type.id} className="flex items-center">
                        <Checkbox 
                          id={`type-${type.id}`}
                          checked={filters.propertyTypes.includes(type.id)}
                          onCheckedChange={() => handlePropertyTypeChange(type.id)}
                          className="mr-2"
                        />
                        <Label htmlFor={`type-${type.id}`} className="cursor-pointer">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Faixa de Preço */}
                <div>
                  <h3 className="font-medium mb-2">Faixa de Preço</h3>
                  <div className="mt-4 px-2">
                    <Slider
                      value={filters.priceRange}
                      min={300000}
                      max={3000000}
                      step={50000}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                      className="mb-6"
                    />
                    <div className="flex justify-between text-sm">
                      <span>{formatCurrency(filters.priceRange[0])}</span>
                      <span>{formatCurrency(filters.priceRange[1])}</span>
                    </div>
                  </div>
                </div>
                
                {/* Quartos e Banheiros */}
                <div>
                  <h3 className="font-medium mb-2">Quartos</h3>
                  <div className="flex flex-wrap gap-2">
                    {bedroomOptions.map((count) => (
                      <Button 
                        key={count}
                        variant={filters.bedrooms.includes(count) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleBedroomChange(count)}
                        className={`w-10 p-0 ${filters.bedrooms.includes(count) ? 'bg-kubico-blue hover:bg-kubico-blue/90' : ''}`}
                      >
                        {count === 5 ? '5+' : count}
                      </Button>
                    ))}
                  </div>
                  
                  <h3 className="font-medium mt-4 mb-2">Banheiros</h3>
                  <div className="flex flex-wrap gap-2">
                    {bathroomOptions.map((count) => (
                      <Button 
                        key={count}
                        variant={filters.bathrooms.includes(count) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleBathroomChange(count)}
                        className={`w-10 p-0 ${filters.bathrooms.includes(count) ? 'bg-kubico-blue hover:bg-kubico-blue/90' : ''}`}
                      >
                        {count === 5 ? '5+' : count}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Área e Vagas */}
                <div>
                  <h3 className="font-medium mb-2">Área (m²)</h3>
                  <div className="mt-4 px-2">
                    <Slider
                      value={filters.areaRange}
                      min={30}
                      max={500}
                      step={10}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, areaRange: value }))}
                      className="mb-6"
                    />
                    <div className="flex justify-between text-sm">
                      <span>{filters.areaRange[0]} m²</span>
                      <span>{filters.areaRange[1]} m²</span>
                    </div>
                  </div>
                  
                  <h3 className="font-medium mt-4 mb-2">Vagas de Garagem</h3>
                  <div className="flex flex-wrap gap-2">
                    {parkingOptions.map((count) => (
                      <Button 
                        key={count}
                        variant={filters.parkingSpaces.includes(count) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleParkingChange(count)}
                        className={`w-10 p-0 ${filters.parkingSpaces.includes(count) ? 'bg-kubico-blue hover:bg-kubico-blue/90' : ''}`}
                      >
                        {count === 4 ? '4+' : count}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Características */}
                <div>
                  <h3 className="font-medium mb-2">Características e Comodidades</h3>
                  <div className="grid grid-cols-2 gap-y-1">
                    {amenityOptions.map((amenity) => (
                      <div key={amenity.id} className="flex items-center">
                        <Checkbox 
                          id={`feature-${amenity.id}`}
                          checked={filters.features.includes(amenity.id)}
                          onCheckedChange={() => handleFeatureChange(amenity.id)}
                          className="mr-2"
                        />
                        <Label htmlFor={`feature-${amenity.id}`} className="cursor-pointer">
                          {amenity.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Bairros */}
                <div>
                  <h3 className="font-medium mb-2">Bairros</h3>
                  <div className="grid grid-cols-2 gap-y-1">
                    {neighborhoodOptions.map((neighborhood) => (
                      <div key={neighborhood.id} className="flex items-center">
                        <Checkbox 
                          id={`neighborhood-${neighborhood.id}`}
                          checked={filters.neighborhoods.includes(neighborhood.id)}
                          onCheckedChange={() => handleNeighborhoodChange(neighborhood.id)}
                          className="mr-2"
                        />
                        <Label htmlFor={`neighborhood-${neighborhood.id}`} className="cursor-pointer">
                          {neighborhood.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Mobiliado */}
              <div className="mt-6">
                <h3 className="font-medium mb-2">Mobiliado</h3>
                <RadioGroup 
                  value={filters.furnished === null ? "null" : filters.furnished.toString()}
                  onValueChange={handleFurnishedChange}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="null" id="furnished-any" />
                    <Label htmlFor="furnished-any">Tanto faz</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="furnished-yes" />
                    <Label htmlFor="furnished-yes">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="furnished-no" />
                    <Label htmlFor="furnished-no">Não</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Botões de ação */}
              <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mr-2"
                >
                  Limpar Filtros
                </Button>
                <Button
                  onClick={applyFilters}
                  className="bg-kubico-blue hover:bg-kubico-blue/90"
                >
                  Aplicar Filtros
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      {/* Versão para mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full flex items-center justify-between">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>Filtros Avançados</span>
              </div>
              {activeFilterCount > 0 && (
                <span className="px-2 py-0.5 bg-kubico-blue/10 text-kubico-blue text-xs font-medium rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh]">
            <SheetHeader>
              <SheetTitle>Filtros Avançados</SheetTitle>
              <SheetDescription>
                Refine sua busca usando os filtros abaixo
              </SheetDescription>
            </SheetHeader>
            <div className="overflow-y-auto h-[calc(85vh-10rem)] py-4">
              {/* Tipo de Imóvel */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Tipo de Imóvel</h3>
                <div className="flex flex-wrap gap-2">
                  {propertyTypes.map((type) => (
                    <Button 
                      key={type.id}
                      variant={filters.propertyTypes.includes(type.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePropertyTypeChange(type.id)}
                      className={filters.propertyTypes.includes(type.id) ? 'bg-kubico-blue hover:bg-kubico-blue/90' : ''}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Faixa de Preço */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Faixa de Preço</h3>
                <div className="px-2">
                  <Slider
                    value={filters.priceRange}
                    min={300000}
                    max={3000000}
                    step={50000}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                    className="mb-6"
                  />
                  <div className="flex justify-between text-sm">
                    <span>{formatCurrency(filters.priceRange[0])}</span>
                    <span>{formatCurrency(filters.priceRange[1])}</span>
                  </div>
                </div>
              </div>
              
              {/* Quartos */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Quartos</h3>
                <div className="flex flex-wrap gap-2">
                  {bedroomOptions.map((count) => (
                    <Button 
                      key={count}
                      variant={filters.bedrooms.includes(count) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleBedroomChange(count)}
                      className={`w-12 ${filters.bedrooms.includes(count) ? 'bg-kubico-blue hover:bg-kubico-blue/90' : ''}`}
                    >
                      {count === 5 ? '5+' : count}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Banheiros */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Banheiros</h3>
                <div className="flex flex-wrap gap-2">
                  {bathroomOptions.map((count) => (
                    <Button 
                      key={count}
                      variant={filters.bathrooms.includes(count) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleBathroomChange(count)}
                      className={`w-12 ${filters.bathrooms.includes(count) ? 'bg-kubico-blue hover:bg-kubico-blue/90' : ''}`}
                    >
                      {count === 5 ? '5+' : count}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Área */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Área (m²)</h3>
                <div className="px-2">
                  <Slider
                    value={filters.areaRange}
                    min={30}
                    max={500}
                    step={10}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, areaRange: value }))}
                    className="mb-6"
                  />
                  <div className="flex justify-between text-sm">
                    <span>{filters.areaRange[0]} m²</span>
                    <span>{filters.areaRange[1]} m²</span>
                  </div>
                </div>
              </div>
              
              {/* Vagas de Garagem */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Vagas de Garagem</h3>
                <div className="flex flex-wrap gap-2">
                  {parkingOptions.map((count) => (
                    <Button 
                      key={count}
                      variant={filters.parkingSpaces.includes(count) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleParkingChange(count)}
                      className={`w-12 ${filters.parkingSpaces.includes(count) ? 'bg-kubico-blue hover:bg-kubico-blue/90' : ''}`}
                    >
                      {count === 4 ? '4+' : count}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Características */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Características e Comodidades</h3>
                <div className="grid grid-cols-2 gap-y-2">
                  {amenityOptions.map((amenity) => (
                    <div key={amenity.id} className="flex items-center">
                      <Checkbox 
                        id={`mobile-feature-${amenity.id}`}
                        checked={filters.features.includes(amenity.id)}
                        onCheckedChange={() => handleFeatureChange(amenity.id)}
                        className="mr-2"
                      />
                      <Label htmlFor={`mobile-feature-${amenity.id}`} className="cursor-pointer">
                        {amenity.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mobiliado */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Mobiliado</h3>
                <RadioGroup 
                  value={filters.furnished === null ? "null" : filters.furnished.toString()}
                  onValueChange={handleFurnishedChange}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="null" id="mobile-furnished-any" />
                    <Label htmlFor="mobile-furnished-any">Tanto faz</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="true" id="mobile-furnished-yes" />
                    <Label htmlFor="mobile-furnished-yes">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="mobile-furnished-no" />
                    <Label htmlFor="mobile-furnished-no">Não</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <SheetFooter className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
              <div className="w-full flex justify-between">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                >
                  Limpar Filtros
                </Button>
                <SheetClose asChild>
                  <Button
                    onClick={applyFilters}
                    className="bg-kubico-blue hover:bg-kubico-blue/90"
                  >
                    Aplicar Filtros
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default AdvancedFilters;
