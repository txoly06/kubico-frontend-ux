
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronRight, ChevronLeft, Home, MapPin, Ruler, BadgeDollarSign } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface PropertyValuationFormProps {
  onComplete: (formData: ValuationFormData) => void;
}

export interface ValuationFormData {
  propertyType: string;
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
  };
  details: {
    area: string;
    bedrooms: string;
    bathrooms: string;
    parkingSpaces: string;
    constructionYear: string;
  };
  features: string[];
  condition: string;
}

const PropertyValuationForm: React.FC<PropertyValuationFormProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(25);
  
  const [formData, setFormData] = useState<ValuationFormData>({
    propertyType: '',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      postalCode: '',
    },
    details: {
      area: '',
      bedrooms: '',
      bathrooms: '',
      parkingSpaces: '',
      constructionYear: '',
    },
    features: [],
    condition: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, category?: string, field?: string) => {
    const { name, value } = e.target;
    
    if (category && field) {
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => {
      const features = [...prev.features];
      const index = features.indexOf(feature);
      
      if (index === -1) {
        features.push(feature);
      } else {
        features.splice(index, 1);
      }
      
      return { ...prev, features };
    });
  };

  const nextStep = () => {
    // Validar o formulário por etapa
    if (currentStep === 1 && !formData.propertyType) {
      toast({
        title: "Informação necessária",
        description: "Por favor, selecione o tipo de imóvel.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2) {
      if (!formData.address.street || !formData.address.city || !formData.address.state) {
        toast({
          title: "Informações necessárias", 
          description: "Por favor, preencha os campos obrigatórios de endereço.",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (currentStep === 3) {
      if (!formData.details.area || !formData.details.bedrooms) {
        toast({
          title: "Informações necessárias",
          description: "Por favor, informe a área e o número de quartos.",
          variant: "destructive"
        });
        return;
      }
    }
    
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    setProgress(newStep * 25);
  };

  const prevStep = () => {
    const newStep = currentStep - 1;
    setCurrentStep(newStep);
    setProgress(newStep * 25);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar última etapa
    if (!formData.condition) {
      toast({
        title: "Informação necessária",
        description: "Por favor, selecione o estado de conservação do imóvel.",
        variant: "destructive"
      });
      return;
    }
    
    // Enviar dados para o componente pai
    onComplete(formData);
  };

  // Tipos de imóveis disponíveis
  const propertyTypes = [
    { value: 'apartment', label: 'Apartamento' },
    { value: 'house', label: 'Casa' },
    { value: 'commercial', label: 'Comercial' },
    { value: 'land', label: 'Terreno' },
    { value: 'rural', label: 'Rural' },
    { value: 'other', label: 'Outro' },
  ];
  
  // Características disponíveis
  const availableFeatures = [
    { value: 'pool', label: 'Piscina' },
    { value: 'garden', label: 'Jardim' },
    { value: 'balcony', label: 'Varanda' },
    { value: 'gym', label: 'Academia' },
    { value: 'security', label: 'Segurança 24h' },
    { value: 'elevator', label: 'Elevador' },
    { value: 'furnished', label: 'Mobiliado' },
    { value: 'barbecue', label: 'Churrasqueira' },
    { value: 'laundry', label: 'Lavanderia' },
    { value: 'view', label: 'Vista Panorâmica' },
  ];
  
  // Condições de conservação
  const conditionOptions = [
    { value: 'excellent', label: 'Excelente - Imóvel novo ou recém-reformado' },
    { value: 'good', label: 'Bom - Bem conservado com manutenção em dia' },
    { value: 'regular', label: 'Regular - Necessita de pequenos reparos' },
    { value: 'needs_renovation', label: 'Precisa de reforma - Necessita intervenções significativas' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">
          Avalie seu Imóvel Gratuitamente
        </h2>
        <p className="text-kubico-gray-medium mb-4">
          Preencha o formulário abaixo para receber uma avaliação aproximada do valor de mercado do seu imóvel.
        </p>
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-kubico-gray-medium">
            <span>Etapa {currentStep} de 4</span>
            <span>{progress}% concluído</span>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card className="border border-gray-100 shadow-sm">
          <CardContent className="p-6">
            {/* Etapa 1: Tipo de Imóvel */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-kubico-blue mb-4">
                  <Home className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Tipo de Imóvel</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {propertyTypes.map((type) => (
                    <div key={type.value}>
                      <input
                        type="radio"
                        id={type.value}
                        name="propertyType"
                        value={type.value}
                        className="peer hidden"
                        checked={formData.propertyType === type.value}
                        onChange={handleInputChange}
                      />
                      <Label
                        htmlFor={type.value}
                        className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors peer-checked:bg-kubico-blue/10 peer-checked:border-kubico-blue peer-checked:text-kubico-blue hover:bg-gray-50"
                      >
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Etapa 2: Endereço */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-kubico-blue mb-4">
                  <MapPin className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Localização do Imóvel</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="street">Rua / Avenida <span className="text-red-500">*</span></Label>
                    <Input
                      id="street"
                      value={formData.address.street}
                      onChange={(e) => handleInputChange(e, 'address', 'street')}
                      placeholder="Ex: Avenida Paulista"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="number">Número <span className="text-red-500">*</span></Label>
                      <Input
                        id="number"
                        value={formData.address.number}
                        onChange={(e) => handleInputChange(e, 'address', 'number')}
                        placeholder="Ex: 1000"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={formData.address.complement}
                        onChange={(e) => handleInputChange(e, 'address', 'complement')}
                        placeholder="Ex: Apto 101"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="neighborhood">Bairro <span className="text-red-500">*</span></Label>
                    <Input
                      id="neighborhood"
                      value={formData.address.neighborhood}
                      onChange={(e) => handleInputChange(e, 'address', 'neighborhood')}
                      placeholder="Ex: Jardins"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="postalCode">CEP <span className="text-red-500">*</span></Label>
                    <Input
                      id="postalCode"
                      value={formData.address.postalCode}
                      onChange={(e) => handleInputChange(e, 'address', 'postalCode')}
                      placeholder="Ex: 01311-000"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">Cidade <span className="text-red-500">*</span></Label>
                    <Input
                      id="city"
                      value={formData.address.city}
                      onChange={(e) => handleInputChange(e, 'address', 'city')}
                      placeholder="Ex: São Paulo"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">Estado <span className="text-red-500">*</span></Label>
                    <select
                      id="state"
                      value={formData.address.state}
                      onChange={(e) => handleInputChange(e, 'address', 'state')}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      <option value="">Selecione</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Etapa 3: Detalhes do Imóvel */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-kubico-blue mb-4">
                  <Ruler className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Detalhes do Imóvel</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="area">Área (m²) <span className="text-red-500">*</span></Label>
                    <Input
                      id="area"
                      type="number"
                      value={formData.details.area}
                      onChange={(e) => handleInputChange(e, 'details', 'area')}
                      placeholder="Ex: 100"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bedrooms">Quartos <span className="text-red-500">*</span></Label>
                    <select
                      id="bedrooms"
                      value={formData.details.bedrooms}
                      onChange={(e) => handleInputChange(e, 'details', 'bedrooms')}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      <option value="">Selecione</option>
                      <option value="0">0 (Studio/Kitnet)</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5+">5 ou mais</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="bathrooms">Banheiros</Label>
                    <select
                      id="bathrooms"
                      value={formData.details.bathrooms}
                      onChange={(e) => handleInputChange(e, 'details', 'bathrooms')}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      <option value="">Selecione</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5+">5 ou mais</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="parkingSpaces">Vagas de Garagem</Label>
                    <select
                      id="parkingSpaces"
                      value={formData.details.parkingSpaces}
                      onChange={(e) => handleInputChange(e, 'details', 'parkingSpaces')}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      <option value="">Selecione</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4+">4 ou mais</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="constructionYear">Ano de Construção</Label>
                    <Input
                      id="constructionYear"
                      value={formData.details.constructionYear}
                      onChange={(e) => handleInputChange(e, 'details', 'constructionYear')}
                      placeholder="Ex: 2010"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Características e Diferenciais</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableFeatures.map((feature) => {
                      const isActive = formData.features.includes(feature.value);
                      return (
                        <button
                          key={feature.value}
                          type="button"
                          onClick={() => handleFeatureToggle(feature.value)}
                          className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                            isActive
                              ? 'bg-kubico-blue text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {feature.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            
            {/* Etapa 4: Estado de Conservação */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-kubico-blue mb-4">
                  <BadgeDollarSign className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Estado de Conservação</h3>
                </div>
                
                <p className="text-kubico-gray-medium mb-4">
                  Essa informação é importante para uma avaliação mais precisa do valor do seu imóvel.
                </p>
                
                <div className="space-y-3">
                  {conditionOptions.map((option) => (
                    <div key={option.value}>
                      <input
                        type="radio"
                        id={option.value}
                        name="condition"
                        value={option.value}
                        className="peer hidden"
                        checked={formData.condition === option.value}
                        onChange={handleInputChange}
                      />
                      <Label
                        htmlFor={option.value}
                        className="flex p-4 border rounded-lg cursor-pointer transition-colors peer-checked:bg-kubico-blue/10 peer-checked:border-kubico-blue peer-checked:text-kubico-blue hover:bg-gray-50"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="flex justify-between mt-6">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          ) : (
            <div></div>
          )}
          
          {currentStep < 4 ? (
            <Button type="button" onClick={nextStep} className="bg-kubico-blue hover:bg-kubico-blue/90">
              Continuar
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" className="bg-kubico-blue hover:bg-kubico-blue/90">
              Finalizar Avaliação
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PropertyValuationForm;
