
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapPin, List, Search, X, Home, Filter, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";

// Dados simulados de imóveis
const propertiesData = [
  {
    id: '1',
    title: 'Apartamento de Luxo com Vista para o Mar',
    price: 1850000,
    location: 'Av. Atlântica, Copacabana, Rio de Janeiro - RJ',
    type: 'Apartamento',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    parkingSpaces: 1,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    latitude: -22.9729,
    longitude: -43.1843
  },
  {
    id: '2',
    title: 'Casa Moderna em Condomínio',
    price: 2150000,
    location: 'Alphaville, São Paulo - SP',
    type: 'Casa',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    parkingSpaces: 3,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    latitude: -23.5505,
    longitude: -46.6333
  },
  {
    id: '3',
    title: 'Cobertura Duplex com Terraço',
    price: 3500000,
    location: 'Moema, São Paulo - SP',
    type: 'Cobertura',
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    parkingSpaces: 2,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    latitude: -23.6005,
    longitude: -46.6600
  },
  {
    id: '4',
    title: 'Studio Moderno bem Localizado',
    price: 650000,
    location: 'Vila Madalena, São Paulo - SP',
    type: 'Studio',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    parkingSpaces: 1,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    latitude: -23.5505,
    longitude: -46.6900
  },
  {
    id: '5',
    title: 'Apartamento com Vista para o Parque',
    price: 980000,
    location: 'Pinheiros, São Paulo - SP',
    type: 'Apartamento',
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    parkingSpaces: 1,
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    latitude: -23.5605,
    longitude: -46.6700
  }
];

const PropertyMap = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [properties, setProperties] = useState(propertiesData);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Configurações de filtro
  const [filters, setFilters] = useState({
    searchQuery: '',
    priceRange: [300000, 5000000],
    propertyTypes: [] as string[],
    bedrooms: [] as number[],
    bathrooms: [] as number[],
    features: [] as string[]
  });
  
  // Simular carregamento do mapa
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Formatar moeda
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    });
  };
  
  // Função para renderizar um marcador de imóvel no mapa
  const renderPropertyMarker = useCallback((property: any) => {
    const isSelected = selectedProperty === property.id;
    
    // Posicionamento fixo para cada propriedade baseado em seu ID
    // Isso garante que eles não se sobreponham e sejam distribuídos pelo mapa
    const getPosition = () => {
      const id = parseInt(property.id);
      const baseTop = 20;
      const baseLeft = 20;
      const spread = 15;
      return {
        top: `${baseTop + ((id * 10) % 60)}%`,
        left: `${baseLeft + ((id * 15) % 70)}%`,
      };
    };
    
    const position = getPosition();
    
    return (
      <div
        key={property.id}
        className={`absolute transition-all duration-300 ${
          isSelected ? 'z-50 scale-125' : 'z-10'
        }`}
        style={{
          top: position.top,
          left: position.left,
        }}
        onClick={() => setSelectedProperty(property.id)}
      >
        <div className="flex flex-col items-center">
          <div
            className={`p-2 rounded-full shadow-md ${
              isSelected ? 'bg-kubico-blue text-white' : 'bg-white text-kubico-blue'
            }`}
          >
            <MapPin className="h-6 w-6" />
          </div>
          
          {isSelected && (
            <Card className="w-64 mt-2 overflow-hidden animate-fade-in absolute -translate-x-1/2 bottom-full mb-2">
              <div className="relative h-32 w-full">
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full bg-black/50 text-white hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProperty(null);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm line-clamp-1 mb-1">{property.title}</h3>
                <p className="text-kubico-blue font-semibold">{formatCurrency(property.price)}</p>
                <p className="text-xs text-kubico-gray-medium mb-2">{property.location}</p>
                <div className="flex items-center text-xs text-kubico-gray-medium mb-3">
                  <span className="mr-2">{property.bedrooms} quartos</span>
                  <span className="mr-2">{property.bathrooms} banheiros</span>
                  <span>{property.area} m²</span>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-kubico-blue hover:bg-kubico-blue/90"
                  onClick={() => navigate(`/properties/${property.id}`)}
                >
                  Ver Detalhes
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }, [selectedProperty, navigate]);
  
  // Função para aplicar filtros
  const applyFilters = () => {
    // Simulação de aplicação de filtros
    setShowFilters(false);
    
    toast({
      title: "Filtros aplicados",
      description: "Os imóveis foram filtrados de acordo com seus critérios.",
    });
  };
  
  // Função para limpar os filtros
  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      priceRange: [300000, 5000000],
      propertyTypes: [],
      bedrooms: [],
      bathrooms: [],
      features: []
    });
  };
  
  // Alternar seleção nos filtros de múltipla escolha
  const toggleFilter = (filterName: string, value: any) => {
    setFilters(prev => {
      const currentValues = prev[filterName as keyof typeof prev] as any[];
      
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [filterName]: currentValues.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [filterName]: [...currentValues, value]
        };
      }
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow relative">
        {/* Painel lateral */}
        <div
          className={`fixed top-0 left-0 h-full bg-white z-30 transition-all duration-300 shadow-lg pt-16 ${
            showSidebar ? 'w-80' : 'w-0 overflow-hidden'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Imóveis Encontrados</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSidebar(false)}
                  className="lg:hidden"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  className="pl-10" 
                  placeholder="Pesquisar imóveis..." 
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <span className="text-sm text-kubico-gray-medium">
                  {properties.length} imóveis encontrados
                </span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-sm text-kubico-blue"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="h-4 w-4 mr-1" />
                Filtros
              </Button>
            </div>
            
            <ScrollArea className="flex-grow">
              <div className="p-2 space-y-2">
                {properties.map((property) => (
                  <Card
                    key={property.id}
                    className={`cursor-pointer overflow-hidden transition-all ${
                      selectedProperty === property.id ? 'ring-2 ring-kubico-blue' : ''
                    }`}
                    onClick={() => setSelectedProperty(property.id)}
                  >
                    <div className="flex">
                      <div className="w-1/3 h-24">
                        <img
                          src={property.imageUrl}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-3">
                        <h3 className="font-medium text-sm line-clamp-1">{property.title}</h3>
                        <p className="text-kubico-blue font-semibold text-sm">{formatCurrency(property.price)}</p>
                        <div className="flex items-center mt-1 text-xs text-kubico-gray-medium">
                          <span className="mr-2">{property.bedrooms} quartos</span>
                          <span>{property.area} m²</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <Button
                className="w-full bg-kubico-blue hover:bg-kubico-blue/90"
                onClick={() => navigate('/properties')}
              >
                <List className="h-4 w-4 mr-2" />
                Ver em Lista
              </Button>
            </div>
          </div>
        </div>
        
        {/* Botão para abrir o sidebar em telas pequenas */}
        {!showSidebar && (
          <Button
            className="fixed top-20 left-4 z-30 bg-white text-kubico-blue shadow-md hover:bg-gray-100"
            onClick={() => setShowSidebar(true)}
          >
            <List className="h-4 w-4 mr-2" />
            <span>Ver Listagem</span>
          </Button>
        )}
        
        {/* Modal de filtros */}
        {showFilters && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md max-h-[90vh] overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Filtros</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <ScrollArea className="pr-4 max-h-[calc(90vh-140px)]">
                  <div className="space-y-6">
                    {/* Filtro de preço */}
                    <div>
                      <h3 className="text-sm font-medium mb-4">Faixa de Preço</h3>
                      <div className="mb-2">
                        <Slider
                          value={filters.priceRange}
                          min={300000}
                          max={5000000}
                          step={50000}
                          onValueChange={(value) => setFilters({...filters, priceRange: value as [number, number]})}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-kubico-gray-medium">
                        <span>{formatCurrency(filters.priceRange[0])}</span>
                        <span>até</span>
                        <span>{formatCurrency(filters.priceRange[1])}</span>
                      </div>
                    </div>
                    
                    {/* Filtro de tipo de imóvel */}
                    <div>
                      <h3 className="text-sm font-medium mb-4">Tipo de Imóvel</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {['Apartamento', 'Casa', 'Cobertura', 'Studio', 'Loft', 'Terreno'].map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`type-${type}`} 
                              checked={filters.propertyTypes.includes(type)}
                              onCheckedChange={() => toggleFilter('propertyTypes', type)}
                            />
                            <Label htmlFor={`type-${type}`} className="text-sm">
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Filtro de quartos */}
                    <div>
                      <h3 className="text-sm font-medium mb-4">Quartos</h3>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, '5+'].map((num) => (
                          <Button
                            key={num}
                            variant="outline"
                            className={`flex-1 ${
                              filters.bedrooms.includes(typeof num === 'number' ? num : 5)
                                ? 'bg-kubico-blue/10 text-kubico-blue border-kubico-blue'
                                : ''
                            }`}
                            onClick={() => toggleFilter('bedrooms', typeof num === 'number' ? num : 5)}
                          >
                            {num}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Filtro de banheiros */}
                    <div>
                      <h3 className="text-sm font-medium mb-4">Banheiros</h3>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, '5+'].map((num) => (
                          <Button
                            key={num}
                            variant="outline"
                            className={`flex-1 ${
                              filters.bathrooms.includes(typeof num === 'number' ? num : 5)
                                ? 'bg-kubico-blue/10 text-kubico-blue border-kubico-blue'
                                : ''
                            }`}
                            onClick={() => toggleFilter('bathrooms', typeof num === 'number' ? num : 5)}
                          >
                            {num}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Filtro de características */}
                    <div>
                      <h3 className="text-sm font-medium mb-4">Características</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          'Piscina', 
                          'Academia', 
                          'Churrasqueira', 
                          'Segurança 24h', 
                          'Área de lazer', 
                          'Permite pets', 
                          'Mobiliado', 
                          'Vista para o mar'
                        ].map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`feature-${feature}`} 
                              checked={filters.features.includes(feature)}
                              onCheckedChange={() => toggleFilter('features', feature)}
                            />
                            <Label htmlFor={`feature-${feature}`} className="text-sm">
                              {feature}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                
                <div className="flex space-x-2 mt-6 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={clearFilters}
                  >
                    Limpar
                  </Button>
                  <Button
                    className="flex-1 bg-kubico-blue hover:bg-kubico-blue/90"
                    onClick={applyFilters}
                  >
                    Aplicar Filtros
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
        
        {/* Área do mapa */}
        <div 
          className={`h-[calc(100vh-64px)] w-full relative ${
            showSidebar ? 'lg:ml-80' : ''
          }`}
        >
          {/* Botão de voltar à listagem em telas pequenas */}
          <Button
            variant="ghost"
            className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm shadow-sm lg:hidden"
            onClick={() => navigate('/properties')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>
          
          {/* Placeholder do mapa - em uma implementação real, seria o componente do mapa */}
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center relative">
            {!mapLoaded ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-t-kubico-blue border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-kubico-gray-dark">Carregando o mapa...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Renderizar marcadores de imóveis */}
                <div className="absolute inset-0 z-10">
                  {properties.map(renderPropertyMarker)}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyMap;
