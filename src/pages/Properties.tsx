
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, LayoutList, MapPin, ArrowUpDown } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchFilters from '@/components/ui/SearchFilters';
import PropertyCard from '@/components/ui/PropertyCard';
import { Button } from '@/components/ui/button';

// Sample properties data
const propertiesData = [
  {
    id: '1',
    title: 'Apartamento Luxuoso com Vista',
    price: 1250000,
    location: 'Jardins, São Paulo',
    type: 'Apartamento',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    parkingSpaces: 2,
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    featured: true,
    newProperty: false
  },
  {
    id: '2',
    title: 'Casa Moderna em Condomínio',
    price: 2150000,
    location: 'Alphaville, São Paulo',
    type: 'Casa',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    parkingSpaces: 3,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    featured: true,
    newProperty: true
  },
  {
    id: '3',
    title: 'Cobertura Duplex com Terraço',
    price: 3500000,
    location: 'Moema, São Paulo',
    type: 'Cobertura',
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    parkingSpaces: 2,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    featured: true,
    newProperty: false
  },
  {
    id: '4',
    title: 'Studio Moderno bem Localizado',
    price: 650000,
    location: 'Vila Madalena, São Paulo',
    type: 'Studio',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    parkingSpaces: 1,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    featured: true,
    newProperty: true
  },
  {
    id: '5',
    title: 'Apartamento com Vista para o Parque',
    price: 980000,
    location: 'Pinheiros, São Paulo',
    type: 'Apartamento',
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    parkingSpaces: 1,
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    featured: false,
    newProperty: true
  },
  {
    id: '6',
    title: 'Casa de Campo com Piscina',
    price: 1750000,
    location: 'Ibiúna, São Paulo',
    type: 'Casa',
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    parkingSpaces: 4,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    featured: false,
    newProperty: false
  },
  {
    id: '7',
    title: 'Loft Industrial Reformado',
    price: 890000,
    location: 'Barra Funda, São Paulo',
    type: 'Loft',
    bedrooms: 1,
    bathrooms: 1,
    area: 75,
    parkingSpaces: 1,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    featured: false,
    newProperty: false
  },
  {
    id: '8',
    title: 'Apartamento Alto Padrão',
    price: 2850000,
    location: 'Itaim Bibi, São Paulo',
    type: 'Apartamento',
    bedrooms: 3,
    bathrooms: 4,
    area: 160,
    parkingSpaces: 2,
    imageUrl: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    featured: false,
    newProperty: false
  }
];

const Properties = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('relevance');
  const [properties, setProperties] = useState(propertiesData);
  const [showMap, setShowMap] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Sort properties based on selected option
    let sortedProperties = [...propertiesData];
    
    switch (sortOption) {
      case 'price-asc':
        sortedProperties.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProperties.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sortedProperties.sort((a, b) => (a.newProperty === b.newProperty) ? 0 : a.newProperty ? -1 : 1);
        break;
      case 'bedrooms':
        sortedProperties.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      case 'area':
        sortedProperties.sort((a, b) => b.area - a.area);
        break;
      default:
        // By relevance (featured first)
        sortedProperties.sort((a, b) => (a.featured === b.featured) ? 0 : a.featured ? -1 : 1);
    }
    
    setProperties(sortedProperties);
  }, [sortOption]);

  const handleApplyFilters = (filters: any) => {
    console.log('Applied filters:', filters);
    
    // Count active filters
    let count = 0;
    
    if (filters.propertyTypes.length > 0) count++;
    if (filters.priceRange[0] !== 300000 || filters.priceRange[1] !== 3000000) count++;
    if (filters.bedrooms.length > 0) count++;
    if (filters.bathrooms.length > 0) count++;
    if (filters.parkingSpaces.length > 0) count++;
    if (filters.areaRange[0] !== 30 || filters.areaRange[1] !== 500) count++;
    if (filters.features.length > 0) count++;
    if (filters.neighborhoods.length > 0) count++;
    
    setActiveFilterCount(count);
    
    // Filter properties based on the applied filters
    // This is a simplified version for demonstration
    let filteredProperties = [...propertiesData];
    
    // Filter by property type
    if (filters.propertyTypes.length > 0) {
      filteredProperties = filteredProperties.filter(property => 
        filters.propertyTypes.some((type: string) => 
          property.type.toLowerCase().includes(type.toLowerCase())
        )
      );
    }
    
    // Filter by price range
    filteredProperties = filteredProperties.filter(property => 
      property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
    );
    
    // Filter by bedrooms
    if (filters.bedrooms.length > 0) {
      filteredProperties = filteredProperties.filter(property => 
        filters.bedrooms.includes(property.bedrooms) || 
        (filters.bedrooms.includes(5) && property.bedrooms >= 5)
      );
    }
    
    // Filter by area
    filteredProperties = filteredProperties.filter(property => 
      property.area >= filters.areaRange[0] && property.area <= filters.areaRange[1]
    );
    
    setProperties(filteredProperties);
  };

  const handleClearFilters = () => {
    setActiveFilterCount(0);
    setProperties(propertiesData);
  };

  const handlePropertySelect = (propertyId: string) => {
    window.location.href = `/properties/${propertyId}`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page header */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-kubico-gray-dark mb-2">
              <Link to="/" className="hover:text-kubico-blue">Início</Link>
              <span className="mx-2">/</span>
              <span>Imóveis</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Imóveis à Venda</h1>
            <p className="text-kubico-gray-dark">
              Encontre o imóvel perfeito para você entre as milhares de opções disponíveis
            </p>
          </div>
          
          {/* Search filters */}
          <div className="mb-8">
            <SearchFilters />
          </div>

          {/* Advanced filters */}
          <AdvancedFilters 
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
            activeFilterCount={activeFilterCount}
          />
          
          {/* Results header */}
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="mb-4 md:mb-0">
              <p className="text-kubico-gray-dark">
                <span className="font-medium text-gray-900">{properties.length}</span> imóveis encontrados
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Sort options */}
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-10 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-kubico-blue/20 focus:border-kubico-blue"
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
                  aria-label="View as grid"
                >
                  <LayoutGrid className="h-5 w-5" />
                </button>
                <button
                  className={`p-2 ${viewMode === 'list' ? 'bg-kubico-blue text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setViewMode('list')}
                  aria-label="View as list"
                >
                  <LayoutList className="h-5 w-5" />
                </button>
              </div>
              
              {/* Map view button */}
              <Button 
                variant="outline" 
                className="hidden md:flex items-center"
                onClick={() => setShowMap(true)}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Ver no Mapa
              </Button>
            </div>
          </div>
          
          {/* Property listings */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {properties.map((property) => (
                <div 
                  key={property.id}
                  className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="md:w-1/3 relative">
                    <Link to={`/properties/${property.id}`}>
                      <div className="h-60 md:h-full overflow-hidden">
                        <img
                          src={property.imageUrl}
                          alt={property.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                    </Link>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {property.featured && (
                        <span className="chip bg-kubico-orange text-white">
                          Destaque
                        </span>
                      )}
                      {property.newProperty && (
                        <span className="chip bg-kubico-green text-white">
                          Novo
                        </span>
                      )}
                    </div>
                    
                    {/* Property type */}
                    <div className="absolute bottom-4 left-4">
                      <span className="chip bg-white/90 backdrop-blur-sm text-kubico-gray-dark">
                        {property.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-5 flex flex-col">
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link to={`/properties/${property.id}`}>
                            <h3 className="font-semibold text-xl mb-1 transition-colors hover:text-kubico-blue">
                              {property.title}
                            </h3>
                          </Link>
                          <p className="text-kubico-gray-dark text-sm mb-2 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {property.location}
                          </p>
                        </div>
                        <p className="text-kubico-blue font-semibold text-xl">
                          {property.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                      
                      <p className="text-kubico-gray-dark mb-4">
                        Excelente {property.type.toLowerCase()} com acabamento de alto padrão e ótima localização. Ambiente espaçoso e bem iluminado, com distribuição inteligente dos espaços.
                      </p>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                        <div className="property-feature">
                          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>{property.bedrooms} Quartos</span>
                        </div>
                        <div className="property-feature">
                          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 13V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V13M21 13H3M21 13V16C21 17.1046 20.1046 18 19 18H5C3.89543 18 3 17.1046 3 16V13M12 7V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <span>{property.bathrooms} Banheiros</span>
                        </div>
                        <div className="property-feature">
                          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 20L5 21M18 20L19 21M6 20H18M6 20V16M18 20V16M4 13V11C4 10.4477 4.44772 10 5 10H6.5M19 13V11C19 10.4477 18.5523 10 18 10H17M6.5 10V5C6.5 4.44772 6.94772 4 7.5 4H16.5C17.0523 4 17.5 4.44772 17.5 5V10M6.5 10H17M7 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>{property.parkingSpaces} Vagas</span>
                        </div>
                        <div className="property-feature">
                          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 16V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H7C4.79086 21 3 19.2091 3 17V16ZM3 16H8C8.55228 16 9 16.4477 9 17V21M13 10L17 6M17 6H14M17 6V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>{property.area} m²</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Favoritar
                      </Button>
                      <Link to={`/properties/${property.id}`}>
                        <Button className="bg-kubico-blue hover:bg-kubico-blue/90">
                          Ver Detalhes
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Map View Modal */}
          {showMap && (
            <MapView 
              properties={properties}
              onPropertySelect={handlePropertySelect}
              onClose={() => setShowMap(false)}
            />
          )}
          
          {/* Empty state when no properties match filters */}
          {properties.length === 0 && (
            <div className="p-12 text-center bg-gray-50 rounded-lg border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nenhum imóvel encontrado</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Não encontramos imóveis com os filtros selecionados. Tente ajustar seus critérios de busca.
              </p>
              <Button onClick={handleClearFilters}>
                Limpar Filtros
              </Button>
            </div>
          )}
          
          {/* Pagination */}
          {properties.length > 0 && (
            <div className="mt-10 flex justify-center">
              <nav className="flex items-center space-x-2">
                <Button variant="outline" className="h-10 px-4 text-kubico-gray-dark border-gray-200" disabled>
                  Anterior
                </Button>
                <Button className="h-10 w-10 bg-kubico-blue hover:bg-kubico-blue/90">1</Button>
                <Button variant="outline" className="h-10 w-10 text-kubico-gray-dark border-gray-200">2</Button>
                <Button variant="outline" className="h-10 w-10 text-kubico-gray-dark border-gray-200">3</Button>
                <span className="text-kubico-gray-dark">...</span>
                <Button variant="outline" className="h-10 w-10 text-kubico-gray-dark border-gray-200">12</Button>
                <Button variant="outline" className="h-10 px-4 text-kubico-gray-dark border-gray-200">
                  Próxima
                </Button>
              </nav>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;
