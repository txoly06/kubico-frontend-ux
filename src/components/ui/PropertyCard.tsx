
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, SquareCode, Heart, ArrowRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

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

const PropertyCard: React.FC<PropertyCardProps> = ({
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
}) => {
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: isFavorite ? 
        "O imóvel foi removido da sua lista de favoritos." : 
        "O imóvel foi adicionado à sua lista de favoritos.",
    });
  };
  
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <Link to={`/properties/${id}`}>
        <div className="relative">
          {/* Imagem */}
          <div className="h-48 overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          
          {/* Botão de Favoritar */}
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-white"
            aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart className={cn(
              "h-4 w-4", 
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            )} />
          </button>
          
          {/* Tags */}
          <div className="absolute top-3 left-3 flex gap-2">
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
          
          {/* Tipo de Imóvel */}
          <div className="absolute bottom-3 left-3">
            <span className="chip bg-white/90 backdrop-blur-sm text-kubico-gray-dark">
              {type}
            </span>
          </div>
          
          {/* Preço */}
          <div className="absolute bottom-0 right-0 bg-kubico-blue text-white py-1 px-3 rounded-tl-lg font-medium">
            {price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
            })}
          </div>
        </div>
        
        {/* Conteúdo */}
        <div className="p-4">
          <h3 className="font-semibold line-clamp-1 group-hover:text-kubico-blue transition-colors">
            {title}
          </h3>
          
          <p className="text-kubico-gray-dark text-sm mt-1 mb-3 flex items-center">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </p>
          
          {/* Características */}
          <div className="flex justify-between text-sm text-kubico-gray-dark">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{bathrooms}</span>
            </div>
            <div className="flex items-center">
              <SquareCode className="h-4 w-4 mr-1" />
              <span>{area} m²</span>
            </div>
          </div>
          
          {/* Botão */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between text-kubico-blue hover:text-kubico-blue/80 hover:bg-kubico-blue/5 p-0 h-6"
            >
              <span>Ver Detalhes</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
