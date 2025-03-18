
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Property } from '../data/propertiesData';

interface PropertyListProps {
  properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  return (
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
              <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
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
                <PropertyFeature icon="bedroom" value={`${property.bedrooms} Quartos`} />
                <PropertyFeature icon="bathroom" value={`${property.bathrooms} Banheiros`} />
                <PropertyFeature icon="parking" value={`${property.parkingSpaces} Vagas`} />
                <PropertyFeature icon="area" value={`${property.area} m²`} />
              </div>
            </div>
            
            <div className="flex flex-wrap justify-between items-center gap-2 mt-auto">
              <Button variant="ghost" size="sm" className="text-red-500">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
  );
};

interface PropertyFeatureProps {
  icon: 'bedroom' | 'bathroom' | 'parking' | 'area';
  value: string;
}

const PropertyFeature: React.FC<PropertyFeatureProps> = ({ icon, value }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'bedroom':
        return (
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'bathroom':
        return (
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M21 13V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V13M21 13H3M21 13V16C21 17.1046 20.1046 18 19 18H5C3.89543 18 3 17.1046 3 16V13M12 7V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'parking':
        return (
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6 20L5 21M18 20L19 21M6 20H18M6 20V16M18 20V16M4 13V11C4 10.4477 4.44772 10 5 10H6.5M19 13V11C19 10.4477 18.5523 10 18 10H17M6.5 10V5C6.5 4.44772 6.94772 4 7.5 4H16.5C17.0523 4 17.5 4.44772 17.5 5V10M6.5 10H17M7 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'area':
        return (
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3 16V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H7C4.79086 21 3 19.2091 3 17V16ZM3 16H8C8.55228 16 9 16.4477 9 17V21M13 10L17 6M17 6H14M17 6V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="property-feature">
      {renderIcon()}
      <span>{value}</span>
    </div>
  );
};

export default PropertyList;
