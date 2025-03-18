
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const SearchFilters = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [purpose, setPurpose] = useState('buy');
  const [priceRange, setPriceRange] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location) {
      toast({
        title: "Localização necessária",
        description: "Por favor, informe uma localização para a busca.",
        variant: "destructive",
      });
      return;
    }
    
    // Em uma aplicação real, construiríamos parâmetros de consulta
    // Por enquanto, apenas simularemos a busca
    console.log('Searching with:', { location, propertyType, purpose, priceRange });
    
    // Construindo os parâmetros de consulta
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (propertyType) params.append('type', propertyType);
    params.append('purpose', purpose); // sempre terá um valor
    if (priceRange) params.append('price', priceRange);
    
    // Navegar para a página de resultados com os parâmetros
    navigate(`/properties?${params.toString()}`);
    
    // Feedback visual
    toast({
      title: "Busca realizada",
      description: "Encontramos imóveis que correspondem à sua busca.",
    });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {/* Localização */}
          <div className="xl:col-span-2">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kubico-gray-medium h-4 w-4" />
              <Input
                placeholder="Cidade, bairro ou região..."
                className="pl-10 bg-gray-50"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          
          {/* Tipo de Imóvel */}
          <div>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="bg-gray-50">
                <SelectValue placeholder="Tipo de Imóvel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="apartment">Apartamento</SelectItem>
                <SelectItem value="house">Casa</SelectItem>
                <SelectItem value="commercial">Comercial</SelectItem>
                <SelectItem value="land">Terreno</SelectItem>
                <SelectItem value="rural">Rural</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Finalidade */}
          <div className="flex space-x-1">
            <Button
              type="button"
              variant={purpose === 'buy' ? 'default' : 'outline'}
              className={`flex-1 ${purpose === 'buy' ? 'bg-kubico-blue hover:bg-kubico-blue/90' : ''}`}
              onClick={() => setPurpose('buy')}
            >
              Comprar
            </Button>
            <Button
              type="button"
              variant={purpose === 'rent' ? 'default' : 'outline'}
              className={`flex-1 ${purpose === 'rent' ? 'bg-kubico-blue hover:bg-kubico-blue/90' : ''}`}
              onClick={() => setPurpose('rent')}
            >
              Alugar
            </Button>
          </div>
          
          {/* Preço */}
          <div className="xl:hidden">
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="bg-gray-50">
                <SelectValue placeholder="Faixa de Preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Qualquer preço</SelectItem>
                {purpose === 'buy' ? (
                  <>
                    <SelectItem value="0-500000">Até R$ 500.000</SelectItem>
                    <SelectItem value="500000-1000000">R$ 500.000 - R$ 1.000.000</SelectItem>
                    <SelectItem value="1000000-2000000">R$ 1.000.000 - R$ 2.000.000</SelectItem>
                    <SelectItem value="2000000-9999999999">Acima de R$ 2.000.000</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="0-2000">Até R$ 2.000</SelectItem>
                    <SelectItem value="2000-5000">R$ 2.000 - R$ 5.000</SelectItem>
                    <SelectItem value="5000-10000">R$ 5.000 - R$ 10.000</SelectItem>
                    <SelectItem value="10000-9999999999">Acima de R$ 10.000</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          
          {/* Botão de busca */}
          <div className="xl:col-start-5 xl:col-span-1">
            <Button 
              type="submit" 
              className="w-full bg-kubico-blue hover:bg-kubico-blue/90"
            >
              <Search className="mr-2 h-4 w-4" />
              Buscar Imóveis
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
