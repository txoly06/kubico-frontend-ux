
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash, Search, Plus, Filter, Grid3X3, List, MoreHorizontal, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import AddPropertyForm from '@/pages/Properties/components/AddPropertyForm';
import EditPropertyForm from '@/pages/Properties/components/EditPropertyForm';

const propertiesData = [
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
    createdAt: '2023-09-15',
    views: 345,
    featured: true
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
    createdAt: '2023-10-20',
    views: 210,
    featured: false
  }
];

const DashboardPropertiesList = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [properties, setProperties] = useState(propertiesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
  
  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter(property => property.id !== id));
    toast({
      title: "Imóvel excluído",
      description: "O imóvel foi removido com sucesso.",
    });
  };
  
  const handleToggleFeature = (id: string) => {
    setProperties(properties.map(property => 
      property.id === id 
        ? { ...property, featured: !property.featured } 
        : property
    ));
    
    const property = properties.find(p => p.id === id);
    toast({
      title: property?.featured ? "Destaque removido" : "Imóvel destacado",
      description: property?.featured 
        ? "O imóvel não será mais exibido em destaque." 
        : "O imóvel será exibido em destaque na plataforma.",
    });
  };
  
  const handleAddProperty = () => {
    // Em uma aplicação real, aqui seria feita uma chamada à API para adicionar o imóvel
    // Simulando a adição de um novo imóvel
    const newProperty = {
      id: `${properties.length + 1}`,
      title: 'Novo Imóvel',
      address: 'Endereço do novo imóvel',
      city: 'São Paulo',
      state: 'SP',
      price: 800000,
      type: 'Apartamento',
      status: 'À Venda',
      bedrooms: 2,
      bathrooms: 1,
      area: 80,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      createdAt: new Date().toISOString().split('T')[0],
      views: 0,
      featured: false
    };
    
    setProperties([newProperty, ...properties]);
    setIsAddDialogOpen(false);
  };
  
  const handleEditProperty = () => {
    // Em uma aplicação real, aqui seria feita uma chamada à API para atualizar o imóvel
    // Simulando a atualização de um imóvel
    setProperties(properties.map(property => 
      property.id === editingProperty.id 
        ? { ...editingProperty, updatedAt: new Date().toISOString() } 
        : property
    ));
    
    setEditingProperty(null);
  };
  
  return (
    <div>
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kubico-gray-medium h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Buscar imóveis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filtrar</span>
            </Button>
            
            <div className="border rounded-md flex">
              <Button
                size="sm"
                variant="ghost"
                className={cn(
                  "rounded-none",
                  viewMode === 'grid' && "bg-gray-100"
                )}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className={cn(
                  "rounded-none",
                  viewMode === 'list' && "bg-gray-100"
                )}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1 bg-kubico-blue hover:bg-kubico-blue/90">
                  <Plus className="h-4 w-4" />
                  <span>Adicionar Imóvel</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <AddPropertyForm 
                  onClose={() => setIsAddDialogOpen(false)} 
                  onSuccess={handleAddProperty} 
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property) => (
            <div 
              key={property.id}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/90 hover:bg-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        <span>Visualizar</span>
                      </DropdownMenuItem>
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => {
                            e.preventDefault();
                            setEditingProperty(property);
                          }}>
                            <Edit className="h-4 w-4 mr-2" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          {editingProperty && (
                            <EditPropertyForm 
                              property={editingProperty}
                              onClose={() => setEditingProperty(null)} 
                              onSuccess={handleEditProperty} 
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuItem onClick={() => handleToggleFeature(property.id)}>
                        {property.featured ? (
                          <>
                            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>Remover destaque</span>
                          </>
                        ) : (
                          <>
                            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor" />
                            </svg>
                            <span>Destacar</span>
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500 focus:text-red-500">
                            <Trash className="h-4 w-4 mr-2" />
                            <span>Excluir</span>
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Excluir imóvel</DialogTitle>
                            <DialogDescription>
                              Você tem certeza que deseja excluir este imóvel? Esta ação não poderá ser desfeita.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-end space-x-2 mt-4">
                            <Button variant="outline">Cancelar</Button>
                            <Button 
                              variant="destructive"
                              onClick={() => handleDeleteProperty(property.id)}
                            >
                              Excluir
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {property.featured && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">Destaque</Badge>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-white font-medium">{formatCurrency(property.price)}</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1 line-clamp-1">{property.title}</h3>
                <p className="text-kubico-gray-medium text-sm mb-3">{property.address}</p>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor" />
                      </svg>
                      <span>{property.views} visualizações</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link to={`/properties/${property.id}`}>
                      <Button size="sm" variant="outline" className="h-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8"
                          onClick={() => setEditingProperty(property)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        {editingProperty && (
                          <EditPropertyForm 
                            property={editingProperty}
                            onClose={() => setEditingProperty(null)} 
                            onSuccess={handleEditProperty} 
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {viewMode === 'list' && (
        <div className="space-y-4">
          {properties.map((property) => (
            <div 
              key={property.id}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex"
            >
              <div className="w-32 sm:w-48 flex-shrink-0">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium line-clamp-1">{property.title}</h3>
                    {property.featured && (
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">Destaque</Badge>
                    )}
                  </div>
                  <p className="text-kubico-gray-medium text-sm mb-2">{property.address}</p>
                  <p className="text-kubico-blue font-semibold">{formatCurrency(property.price)}</p>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm text-kubico-gray-medium">
                    <span>{property.views} visualizações</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Link to={`/properties/${property.id}`}>
                      <Button size="sm" variant="outline" className="h-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8"
                          onClick={() => setEditingProperty(property)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        {editingProperty && (
                          <EditPropertyForm 
                            property={editingProperty}
                            onClose={() => setEditingProperty(null)} 
                            onSuccess={handleEditProperty} 
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleToggleFeature(property.id)}>
                          {property.featured ? "Remover destaque" : "Destacar"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500 focus:text-red-500">
                              Excluir
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Excluir imóvel</DialogTitle>
                              <DialogDescription>
                                Você tem certeza que deseja excluir este imóvel? Esta ação não poderá ser desfeita.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end space-x-2 mt-4">
                              <Button variant="outline">Cancelar</Button>
                              <Button 
                                variant="destructive"
                                onClick={() => handleDeleteProperty(property.id)}
                              >
                                Excluir
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {properties.length === 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Home className="h-8 w-8 text-kubico-gray-medium" />
          </div>
          <h3 className="text-lg font-medium mb-2">Nenhum imóvel encontrado</h3>
          <p className="text-kubico-gray-medium mb-6">
            Você ainda não cadastrou nenhum imóvel na plataforma.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-kubico-blue hover:bg-kubico-blue/90">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Imóvel
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <AddPropertyForm 
                onClose={() => setIsAddDialogOpen(false)} 
                onSuccess={handleAddProperty} 
              />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default DashboardPropertiesList;
