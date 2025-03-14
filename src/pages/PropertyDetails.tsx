import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Bed, Bath, SquareCode, MapPin, Heart, Share, Home, Calendar, Ruler, LineChart, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import PropertyContactForm from '@/components/ui/PropertyContactForm';
import { cn } from '@/lib/utils';

const propertyData = {
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
  parking: 1,
  description: 'Lindo apartamento com vista para o mar de Copacabana. Totalmente reformado, com acabamentos de alto padrão, piso em porcelanato, iluminação em LED, ar-condicionado em todos os ambientes. Localização privilegiada, próximo a restaurantes, supermercados e transporte público.',
  amenities: ['Piscina', 'Academia', 'Sauna', 'Segurança 24h', 'Área de lazer', 'Churrasqueira', 'Salão de festas'],
  images: [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1560448075-bb485b067938?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ],
  agent: {
    name: 'Marcelo Santos',
    phone: '(21) 98765-4321',
    email: 'marcelo@kubico.com',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  createdAt: '2023-09-15',
  updatedAt: '2023-10-20'
};

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(propertyData);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Em uma aplicação real, buscaríamos os dados da API aqui
    // Por exemplo:
    // const fetchProperty = async () => {
    //   setIsLoading(true);
    //   try {
    //     const response = await fetch(`/api/properties/${id}`);
    //     const data = await response.json();
    //     setProperty(data);
    //   } catch (error) {
    //     console.error('Erro ao buscar os dados do imóvel:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // 
    // fetchProperty();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Carregando...</div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb e botão voltar */}
          <div className="flex flex-wrap items-center justify-between mb-6">
            <Link to="/properties" className="flex items-center text-kubico-gray-medium hover:text-kubico-blue transition-colors mb-2 md:mb-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para listagem
            </Link>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Salvar</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share className="h-4 w-4" />
                <span className="hidden sm:inline">Compartilhar</span>
              </Button>
            </div>
          </div>
          
          {/* Título e endereço */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-kubico-blue/10 text-kubico-blue rounded-full mr-2">
                {property.status}
              </span>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-kubico-green/10 text-kubico-green rounded-full">
                {property.type}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
            <div className="flex items-center text-kubico-gray-medium">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span>{property.address}, {property.city} - {property.state}</span>
            </div>
          </div>
          
          {/* Galeria de imagens */}
          <div className="mb-8">
            <Carousel className="w-full">
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <AspectRatio ratio={16 / 9} className="bg-slate-50 rounded-xl overflow-hidden">
                      <img 
                        src={image} 
                        alt={`${property.title} - Imagem ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            
            <div className="grid grid-cols-5 gap-2 mt-2">
              {property.images.slice(0, 5).map((image, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "aspect-video rounded-md overflow-hidden cursor-pointer border-2",
                    index === 0 ? "border-kubico-blue" : "border-transparent"
                  )}
                >
                  <img 
                    src={image} 
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna principal - detalhes da propriedade */}
            <div className="lg:col-span-2">
              {/* Características principais */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-kubico-blue/10 flex items-center justify-center mb-2">
                      <Bed className="h-6 w-6 text-kubico-blue" />
                    </div>
                    <p className="text-sm text-kubico-gray-medium">Quartos</p>
                    <p className="font-bold text-lg">{property.bedrooms}</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-kubico-green/10 flex items-center justify-center mb-2">
                      <Bath className="h-6 w-6 text-kubico-green" />
                    </div>
                    <p className="text-sm text-kubico-gray-medium">Banheiros</p>
                    <p className="font-bold text-lg">{property.bathrooms}</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-kubico-orange/10 flex items-center justify-center mb-2">
                      <SquareCode className="h-6 w-6 text-kubico-orange" />
                    </div>
                    <p className="text-sm text-kubico-gray-medium">Área</p>
                    <p className="font-bold text-lg">{property.area}m²</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-2">
                      <Home className="h-6 w-6 text-purple-500" />
                    </div>
                    <p className="text-sm text-kubico-gray-medium">Vagas</p>
                    <p className="font-bold text-lg">{property.parking}</p>
                  </div>
                </div>
              </div>
              
              {/* Abas com informações detalhadas */}
              <Tabs defaultValue="description" className="mb-8">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="description">Descrição</TabsTrigger>
                  <TabsTrigger value="amenities">Características</TabsTrigger>
                  <TabsTrigger value="location">Localização</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center mb-4">
                      <Calendar className="h-5 w-5 text-kubico-gray-medium mr-2" />
                      <p className="text-sm text-kubico-gray-medium">
                        Publicado em {new Date(property.createdAt).toLocaleDateString('pt-BR')} • Atualizado em {new Date(property.updatedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">Sobre este imóvel</h3>
                    <p className="text-kubico-gray-dark leading-relaxed">{property.description}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="amenities" className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Características e Comodidades</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-kubico-blue/10 flex items-center justify-center mr-3">
                          <CheckCircle className="h-4 w-4 text-kubico-blue" />
                        </div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="location" className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Localização</h3>
                  <div className="rounded-xl overflow-hidden h-[300px] bg-gray-100">
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-kubico-blue mr-2" />
                      <span className="text-kubico-gray-medium">Mapa da localização</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Coluna lateral - preço e formulário de contato */}
            <div>
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm mb-6">
                <div className="mb-6">
                  <p className="text-sm text-kubico-gray-medium mb-1">Preço</p>
                  <p className="text-3xl font-bold text-kubico-blue">{formatCurrency(property.price)}</p>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-kubico-gray-medium">IPTU</span>
                    <span className="font-medium">R$ 500,00 /ano</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-kubico-gray-medium">Condomínio</span>
                    <span className="font-medium">R$ 850,00 /mês</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 mb-6">
                  <Button className="w-full bg-kubico-blue hover:bg-kubico-blue/90">Agendar Visita</Button>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="h-[1px] flex-grow bg-gray-200"></div>
                  <span className="px-3 text-sm text-kubico-gray-medium">ou</span>
                  <div className="h-[1px] flex-grow bg-gray-200"></div>
                </div>
                
                <PropertyContactForm property={property} />
              </div>
              
              {/* Informações do corretor */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Corretor Responsável</h3>
                <div className="flex items-center">
                  <img 
                    src={property.agent.photo} 
                    alt={property.agent.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-medium">{property.agent.name}</p>
                    <p className="text-sm text-kubico-gray-medium">{property.agent.phone}</p>
                    <p className="text-sm text-kubico-gray-medium">{property.agent.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;
