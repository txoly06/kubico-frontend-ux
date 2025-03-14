
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bed, Bath, Car, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parkingSpaces: number;
  imageUrl: string;
  featured?: boolean;
  newProperty?: boolean;
}

const PropertyCard = ({
  id,
  title,
  price,
  location,
  type,
  bedrooms,
  bathrooms,
  area,
  parkingSpaces,
  imageUrl,
  featured = false,
  newProperty = false,
}: PropertyCardProps) => {
  return (
    <div className="group rounded-xl overflow-hidden bg-white hover-scale shadow-sm border border-gray-100 transition-all duration-300">
      <div className="relative">
        <Link to={`/properties/${id}`}>
          <div className="relative h-60 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {featured && (
            <span className="chip bg-kubico-orange text-white">
              Destaque
            </span>
          )}
          {newProperty && (
            <span className="chip bg-kubico-green text-white">
              Novo
            </span>
          )}
        </div>
        
        {/* Favorite button */}
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition duration-300 text-kubico-gray-dark hover:text-red-500">
          <Heart className="h-5 w-5" />
        </button>
        
        {/* Property type chip */}
        <div className="absolute bottom-4 left-4">
          <span className="chip bg-white/90 backdrop-blur-sm text-kubico-gray-dark">
            {type}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <Link to={`/properties/${id}`}>
          <h3 className="font-semibold text-lg mb-1 transition-colors hover:text-kubico-blue">{title}</h3>
        </Link>
        <p className="text-kubico-gray-dark text-sm mb-3">{location}</p>
        <p className="text-kubico-blue font-semibold text-xl mb-4">
          {price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
          })}
        </p>
        
        {/* Features */}
        <div className="grid grid-cols-4 gap-2 py-3 border-t border-gray-100">
          <div className="property-feature">
            <Bed className="h-4 w-4" />
            <span>{bedrooms}</span>
          </div>
          <div className="property-feature">
            <Bath className="h-4 w-4" />
            <span>{bathrooms}</span>
          </div>
          <div className="property-feature">
            <Car className="h-4 w-4" />
            <span>{parkingSpaces}</span>
          </div>
          <div className="property-feature">
            <Maximize className="h-4 w-4" />
            <span>{area}m²</span>
          </div>
        </div>
        
        {/* CTA */}
        <div className="pt-4">
          <Link to={`/properties/${id}`}>
            <Button className="w-full" variant="outline">Ver Detalhes</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
