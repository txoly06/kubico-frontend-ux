
import React from 'react';
import PropertyCard from '@/components/ui/PropertyCard';
import LoadingState from '@/components/ui/LoadingState';
import { Property } from '../data/propertiesData';

interface PropertyGridProps {
  properties: Property[];
  isLoading?: boolean;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {Array(8).fill(0).map((_, index) => (
          <LoadingState key={index} variant="card" />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum imóvel encontrado com os filtros selecionados.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  );
};

export default PropertyGrid;
