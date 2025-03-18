
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchFilters from '@/components/ui/SearchFilters';
import AdvancedFilters from '@/components/ui/AdvancedFilters';
import PropertiesHeader from './components/PropertiesHeader';
import PropertiesControls from './components/PropertiesControls';
import PropertyGrid from './components/PropertyGrid';
import PropertyList from './components/PropertyList';
import EmptyResults from './components/EmptyResults';
import Pagination from './components/Pagination';
import { propertiesData } from './data/propertiesData';

const Properties = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('relevance');
  const [properties, setProperties] = useState(propertiesData);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
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
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [sortOption]);

  const handleApplyFilters = (filters: any) => {
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
    navigate(`/properties/${propertyId}`);
  };
  
  // Responsive view mode handler
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setViewMode('grid');
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              
              <div className="h-12 bg-gray-200 rounded mb-8"></div>
              
              <div className="h-10 bg-gray-200 rounded mb-6"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(8).fill(0).map((_, index) => (
                  <div key={index} className="bg-gray-200 rounded-xl h-64"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Pular para o conteúdo principal
      </a>
      
      <Navbar />
      
      <main id="main-content" className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <PropertiesHeader />
          
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
          
          <PropertiesControls 
            propertiesCount={properties.length}
            sortOption={sortOption}
            setSortOption={setSortOption}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          
          {/* Property listings */}
          {viewMode === 'grid' ? (
            <PropertyGrid properties={properties} />
          ) : (
            <PropertyList properties={properties} />
          )}
          
          {/* Empty state when no properties match filters */}
          {properties.length === 0 && (
            <EmptyResults onClearFilters={handleClearFilters} />
          )}
          
          {/* Pagination */}
          {properties.length > 0 && (
            <Pagination />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;
