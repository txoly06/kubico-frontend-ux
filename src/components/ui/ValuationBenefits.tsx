
import React from 'react';
import { TrendingUp, Home, CheckCircle } from 'lucide-react';

const ValuationBenefits = () => {
  return (
    <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm">
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
  );
};

export default ValuationBenefits;
