
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, BarChart, TrendingUp, CheckCircle, ArrowLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PropertyValuationResultProps {
  result: {
    estimatedValue: number;
    priceRange: {
      min: number;
      max: number;
    };
    similarProperties: number;
    confidence: number;
  };
  onNewValuation: () => void;
}

const PropertyValuationResult: React.FC<PropertyValuationResultProps> = ({ result, onNewValuation }) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="space-y-8">
      <Button variant="outline" onClick={onNewValuation} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Nova Avaliação
      </Button>
      
      <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
        <div className="mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">
            Avaliação Concluída
          </h2>
          <p className="text-center text-kubico-gray-medium">
            Confira abaixo o valor estimado do seu imóvel com base nos dados fornecidos.
          </p>
        </div>
        
        <div className="border border-gray-100 rounded-lg p-6 mb-8 bg-kubico-blue/5">
          <h3 className="text-lg font-semibold text-center mb-1">Valor Estimado</h3>
          <p className="text-3xl md:text-4xl font-bold text-center text-kubico-blue">
            {formatCurrency(result.estimatedValue)}
          </p>
          <p className="text-center text-kubico-gray-medium mt-2">
            Faixa de preço: {formatCurrency(result.priceRange.min)} - {formatCurrency(result.priceRange.max)}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-kubico-blue/10 flex items-center justify-center mb-4">
                  <Home className="h-6 w-6 text-kubico-blue" />
                </div>
                <h4 className="font-medium mb-1">Imóveis Similares</h4>
                <p className="text-2xl font-bold">{result.similarProperties}</p>
                <p className="text-sm text-kubico-gray-medium">
                  propriedades comparadas
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-kubico-blue/10 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-kubico-blue" />
                </div>
                <h4 className="font-medium mb-1">Confiança da Estimativa</h4>
                <div className="w-full mb-2">
                  <Progress value={result.confidence} className="h-2" />
                </div>
                <p className="text-2xl font-bold">{result.confidence}%</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-kubico-blue/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-kubico-blue" />
                </div>
                <h4 className="font-medium mb-1">Valorização Estimada</h4>
                <p className="text-2xl font-bold">5.2%</p>
                <p className="text-sm text-kubico-gray-medium">
                  nos próximos 12 meses
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Análise do Mercado Local</h3>
          <p className="text-kubico-gray-dark mb-4">
            A região onde o imóvel está localizado apresenta uma tendência de valorização moderada, 
            com demanda constante e bom potencial de liquidez. O valor por metro quadrado está alinhado 
            com imóveis semelhantes na mesma área.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Fatores Positivos</h4>
              <ul className="space-y-1 text-kubico-gray-dark">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Boa infraestrutura urbana
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Proximidade a serviços essenciais
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Área com baixo índice de desvalorização
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Dicas para Valorização</h4>
              <ul className="space-y-1 text-kubico-gray-dark">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                  Modernização da fachada
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                  Atualização dos acabamentos
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                  Investimento em eficiência energética
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <Button className="bg-kubico-blue hover:bg-kubico-blue/90">
            Solicitar Avaliação Profissional
          </Button>
          <Button variant="outline">
            Baixar Relatório
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyValuationResult;
