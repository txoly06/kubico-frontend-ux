
import React from 'react';
import { PenLine, BarChart3, CheckCircle } from 'lucide-react';

const ValuationHowItWorks = () => {
  return (
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
            <BarChart3 className="h-5 w-5 text-kubico-blue" />
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
  );
};

export default ValuationHowItWorks;
