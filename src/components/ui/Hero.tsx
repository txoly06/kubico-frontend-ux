
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [searchType, setSearchType] = useState('buy');
  const [location, setLocation] = useState('');

  return (
    <div className="relative h-screen max-h-[800px] min-h-[600px] w-full overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80" 
          alt="Modern Architecture" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl animate-slide-up">
          <div className="inline-block mb-4">
            <span className="chip bg-kubico-blue text-white">Kubico 3.0</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-white mb-4">
            Encontre o imóvel perfeito para seu estilo de vida
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl">
            A plataforma mais completa para você encontrar, avaliar e negociar imóveis com segurança e praticidade.
          </p>
          
          {/* Search form */}
          <div className="bg-white/90 backdrop-blur-lg p-4 rounded-xl shadow-lg mb-8 max-w-2xl">
            <div className="flex flex-wrap md:flex-nowrap gap-3">
              {/* Type of search */}
              <div className="w-full md:w-auto">
                <div className="relative">
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full md:w-40 appearance-none bg-white border border-gray-200 rounded-lg py-3 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-kubico-blue/20 focus:border-kubico-blue"
                  >
                    <option value="buy">Comprar</option>
                    <option value="rent">Alugar</option>
                    <option value="commercial">Comercial</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              
              {/* Location */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cidade, bairro ou região"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-kubico-blue/20 focus:border-kubico-blue"
                  />
                  <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                </div>
              </div>
              
              {/* Search button */}
              <Button 
                className="w-full md:w-auto bg-kubico-blue hover:bg-kubico-blue/90"
                size="lg"
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
            
            {/* Quick links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm">
              <span className="text-kubico-gray-dark">Buscas populares:</span>
              <Link to="/properties?type=apartment" className="text-kubico-blue hover:underline">
                Apartamentos
              </Link>
              <Link to="/properties?type=house" className="text-kubico-blue hover:underline">
                Casas
              </Link>
              <Link to="/properties?feature=pool" className="text-kubico-blue hover:underline">
                Com piscina
              </Link>
              <Link to="/properties?feature=furnished" className="text-kubico-blue hover:underline">
                Mobiliados
              </Link>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <div className="text-white">
              <p className="text-3xl font-bold">2,500+</p>
              <p className="text-white/70">Imóveis disponíveis</p>
            </div>
            <div className="text-white">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-white/70">Clientes satisfeitos</p>
            </div>
            <div className="text-white">
              <p className="text-3xl font-bold">98%</p>
              <p className="text-white/70">Taxa de satisfação</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="p-2 rounded-full bg-white/20 backdrop-blur-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
