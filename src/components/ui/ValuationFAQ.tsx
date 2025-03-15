
import React from 'react';

const ValuationFAQ = () => {
  return (
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
        <div>
          <h4 className="font-medium mb-1">O que influencia o valor do meu imóvel?</h4>
          <p className="text-sm text-kubico-gray-medium">
            Localização, tamanho, estado de conservação, idade do imóvel e características diferenciadas são alguns dos principais fatores que influenciam o valor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValuationFAQ;
