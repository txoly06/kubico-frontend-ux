
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ExternalLink, Trash2, Home, Bed, Bath, SquareCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Dados de exemplo de imóveis favoritos
const favoritesData = [
  {
    id: '1',
    title: 'Apartamento de Luxo com Vista para o Mar',
    address: 'Av. Atlântica, 1500, Copacabana',
    city: 'Rio de Janeiro',
    state: 'RJ',
    price: 1850000,
    type: 'Apartamento',
    status: 'À Venda',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    savedAt: '2023-11-10'
  },
  {
    id: '2',
    title: 'Casa em Condomínio Fechado',
    address: 'Rua das Palmeiras, 250, Jardim Europa',
    city: 'São Paulo',
    state: 'SP',
    price: 2250000,
    type: 'Casa',
    status: 'À Venda',
    bedrooms: 4,
    bathrooms: 3,
    area: 240,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    savedAt: '2023-12-05'
  },
  {
    id: '3',
    title: 'Apartamento Moderno no Centro',
    address: 'Rua Augusta, 1200, Consolação',
    city: 'São Paulo',
    state: 'SP',
    price: 950000,
    type: 'Apartamento',
    status: 'À Venda',
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    savedAt: '2024-01-15'
  },
  {
    id: '4',
    title: 'Cobertura Duplex com Piscina',
    address: 'Av. Vieira Souto, 500, Ipanema',
    city: 'Rio de Janeiro',
    state: 'RJ',
    price: 4500000,
    type: 'Cobertura',
    status: 'À Venda',
    bedrooms: 4,
    bathrooms: 4,
    area: 300,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    savedAt: '2024-02-20'
  },
  {
    id: '5',
    title: 'Casa de Campo com Área Verde',
    address: 'Estrada do Sol, Km 10',
    city: 'Petrópolis',
    state: 'RJ',
    price: 1750000,
    type: 'Casa',
    status: 'À Venda',
    bedrooms: 3,
    bathrooms: 2,
    area: 500,
    image: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    savedAt: '2024-03-01'
  }
];

const DashboardFavorites = () => {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState(favoritesData);
  
  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
  
  // Função para remover um imóvel dos favoritos
  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(favorite => favorite.id !== id));
    toast({
      title: "Imóvel removido dos favoritos",
      description: "O imóvel foi removido da sua lista de favoritos.",
    });
  };
  
  // Função para remover todos os favoritos
  const handleClearAll = () => {
    setFavorites([]);
    toast({
      title: "Lista de favoritos limpa",
      description: "Todos os imóveis foram removidos da sua lista de favoritos.",
    });
  };
  
  return (
    <div>
      {/* Barra de ações */}
      {favorites.length > 0 && (
        <div className="flex justify-end mb-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar Todos
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Limpar favoritos</DialogTitle>
                <DialogDescription>
                  Você tem certeza que deseja remover todos os imóveis da sua lista de favoritos? Esta ação não poderá ser desfeita.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline">Cancelar</Button>
                <Button 
                  variant="destructive"
                  onClick={handleClearAll}
                >
                  Remover Todos
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
      
      {/* Lista de favoritos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((property) => (
          <div 
            key={property.id}
            className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="relative">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Link to={`/properties/${property.id}`}>
                  <Button className="bg-white text-gray-900 hover:bg-white/90">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver detalhes
                  </Button>
                </Link>
              </div>
              <div className="absolute top-2 right-2">
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="h-8 w-8 bg-white/90 hover:bg-white text-red-500"
                  onClick={() => handleRemoveFavorite(property.id)}
                >
                  <Heart className="h-4 w-4 fill-current" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black/70 to-transparent">
                <span className="text-white font-medium">{formatCurrency(property.price)}</span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-lg mb-1 line-clamp-1">{property.title}</h3>
              <p className="text-kubico-gray-medium text-sm mb-3 line-clamp-1">{property.address}</p>
              
              <div className="flex items-center justify-between text-sm text-kubico-gray-medium">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    {property.bedrooms}
                  </span>
                  <span className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    {property.bathrooms}
                  </span>
                  <span className="flex items-center">
                    <SquareCode className="h-4 w-4 mr-1" />
                    {property.area}m²
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mensagem para quando não há favoritos */}
      {favorites.length === 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-kubico-gray-medium" />
          </div>
          <h3 className="text-lg font-medium mb-2">Nenhum favorito encontrado</h3>
          <p className="text-kubico-gray-medium mb-6">
            Você ainda não adicionou nenhum imóvel à sua lista de favoritos.
          </p>
          <Link to="/properties">
            <Button className="bg-kubico-blue hover:bg-kubico-blue/90">
              <Home className="h-4 w-4 mr-2" />
              Explorar Imóveis
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardFavorites;
