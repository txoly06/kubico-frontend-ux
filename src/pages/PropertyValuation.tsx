
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PropertyValuationForm, { ValuationFormData } from '@/components/ui/PropertyValuationForm';
import PropertyValuationResult from '@/components/ui/PropertyValuationResult';
import ValuationHowItWorks from '@/components/ui/ValuationHowItWorks';
import ValuationCallToAction from '@/components/ui/ValuationCallToAction';
import ValuationFAQ from '@/components/ui/ValuationFAQ';
import ValuationBenefits from '@/components/ui/ValuationBenefits';

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
                  <ValuationHowItWorks />
                  <ValuationCallToAction />
                  <ValuationFAQ />
                </div>
              </div>
              
              <ValuationBenefits />
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
