
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PropertyCard from './PropertyCard';
import { Button } from '@/components/ui/button';

// Sample data
const properties = [
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
  }
];

const FeaturedProperties = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h2 className="section-title">Imóveis em Destaque</h2>
            <p className="section-subtitle">Confira nossa seleção de propriedades exclusivas e de alto padrão</p>
          </div>
          <Link to="/properties" className="mt-4 md:mt-0">
            <Button variant="ghost" className="text-kubico-blue hover:text-kubico-blue/90 p-0 font-medium flex items-center group">
              Ver todos os imóveis
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
