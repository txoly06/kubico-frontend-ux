
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PropertyValuationForm, { ValuationFormData } from '@/components/ui/PropertyValuationForm';
import PropertyValuationResult from '@/components/ui/PropertyValuationResult';
import { Button } from '@/components/ui/button';
import { ChartLineUp, Home, TrendingUp, CheckCircle, PenLine } from 'lucide-react';

const PropertyValuation = () => {
  const [showResult, setShowResult] = useState(false);
  const [valuationResult, setValuationResult] = useState({
    estimatedValue: 0,
    priceRange: {
      min: 0,
      max: 0,
    },
    similarProperties: 0,
    confidence: 0,
  });
  
  const handleFormComplete = (formData: ValuationFormData) => {
    console.log('Formulário enviado:', formData);
    
    // Simulação do cálculo de avaliação
    // Em uma aplicação real, esses valores viriam de uma API
    let baseValue = 0;
    
    // Cálculos básicos baseados no tipo, área e localização
    if (formData.propertyType === 'apartment') {
      baseValue = 5000; // R$ 5.000/m²
    } else if (formData.propertyType === 'house') {
      baseValue = 4000; // R$ 4.000/m²
    } else if (formData.propertyType === 'commercial') {
      baseValue = 6000; // R$ 6.000/m²
    } else {
      baseValue = 3000; // Outros tipos
    }
    
    // Ajustes baseados em características
    const area = Number(formData.details.area) || 100;
    const bedroomsMultiplier = formData.details.bedrooms ? 1 + (Number(formData.details.bedrooms) * 0.05) : 1;
    const featuresMultiplier = 1 + (formData.features.length * 0.02);
    const conditionMultiplier = 
      formData.condition === 'excellent' ? 1.2 :
      formData.condition === 'good' ? 1.1 :
      formData.condition === 'regular' ? 1.0 : 0.8;
    
    // Cálculo final
    const calculatedValue = baseValue * area * bedroomsMultiplier * featuresMultiplier * conditionMultiplier;
    
    // Resultados
    setValuationResult({
      estimatedValue: Math.round(calculatedValue),
      priceRange: {
        min: Math.round(calculatedValue * 0.9),
        max: Math.round(calculatedValue * 1.1),
      },
      similarProperties: Math.floor(Math.random() * 30) + 5, // 5-35 propriedades semelhantes
      confidence: Math.floor(Math.random() * 20) + 75, // 75-95% de confiança
    });
    
    setShowResult(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          {!showResult ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <div className="lg:col-span-2">
                  <PropertyValuationForm onComplete={handleFormComplete} />
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-kubico-blue mb-4">
                      Como funciona a avaliação?
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-kubico-blue/10 flex items-center justify-center">
                          <PenLine className="h-5 w-5 text-kubico-blue" />
                        </div>
                        <div>
                          <h4 className="font-medium">Preencha o formulário</h4>
                          <p className="text-sm text-kubico-gray-medium">Informe os dados do imóvel com o máximo de detalhes possível.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-kubico-blue/10 flex items-center justify-center">
                          <ChartLineUp className="h-5 w-5 text-kubico-blue" />
                        </div>
                        <div>
                          <h4 className="font-medium">Processamento dos dados</h4>
                          <p className="text-sm text-kubico-gray-medium">Nossa tecnologia analisa dados de mercado e imóveis similares.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-kubico-blue/10 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-kubico-blue" />
                        </div>
                        <div>
                          <h4 className="font-medium">Resultado instantâneo</h4>
                          <p className="text-sm text-kubico-gray-medium">Receba uma estimativa com base nos dados fornecidos.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-kubico-blue to-kubico-blue/80 text-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-semibold mb-2">Quer uma avaliação profissional?</h3>
                    <p className="text-sm text-white/80 mb-4">
                      Para uma avaliação mais precisa, agende uma visita com um de nossos corretores especializados.
                    </p>
                    <Button className="w-full bg-white text-kubico-blue hover:bg-white/90">
                      Solicitar Visita
                    </Button>
                  </div>
                  
                  <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Dúvidas Frequentes</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Quanto custa a avaliação online?</h4>
                        <p className="text-sm text-kubico-gray-medium">
                          A avaliação online é totalmente gratuita e não gera nenhum compromisso.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">A avaliação é precisa?</h4>
                        <p className="text-sm text-kubico-gray-medium">
                          A avaliação fornece uma estimativa baseada nos dados informados e valores de mercado, podendo variar em relação ao preço final de venda.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Como posso obter uma avaliação mais precisa?</h4>
                        <p className="text-sm text-kubico-gray-medium">
                          Para uma avaliação mais precisa, recomendamos a visita de um de nossos corretores especializados ao imóvel.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-10 p-8 bg-white border border-gray-100 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-center mb-8">Por que avaliar seu imóvel com a Kubico?</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-kubico-blue/10 flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-kubico-blue" />
                    </div>
                    <h4 className="font-semibold mb-2">Precisão e Agilidade</h4>
                    <p className="text-kubico-gray-medium">
                      Nossa tecnologia utiliza dados atualizados do mercado imobiliário para fornecer uma avaliação rápida e precisa.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-kubico-blue/10 flex items-center justify-center mx-auto mb-4">
                      <Home className="h-8 w-8 text-kubico-blue" />
                    </div>
                    <h4 className="font-semibold mb-2">Especialistas no Mercado</h4>
                    <p className="text-kubico-gray-medium">
                      Contamos com corretores experientes que conhecem profundamente o mercado imobiliário de cada região.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-kubico-blue/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-kubico-blue" />
                    </div>
                    <h4 className="font-semibold mb-2">Serviço Completo</h4>
                    <p className="text-kubico-gray-medium">
                      Além da avaliação, oferecemos toda consultoria necessária para venda, compra ou aluguel do seu imóvel.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <PropertyValuationResult 
              result={valuationResult} 
              onNewValuation={() => setShowResult(false)} 
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyValuation;
