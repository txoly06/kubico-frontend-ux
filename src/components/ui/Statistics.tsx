
import React from 'react';
import { Users, Home, Award, TrendingUp } from 'lucide-react';

const stats = [
  {
    label: 'Imóveis Cadastrados',
    value: '15.000+',
    icon: Home,
    description: 'Em todo o Brasil'
  },
  {
    label: 'Clientes Satisfeitos',
    value: '8.500+',
    icon: Users,
    description: 'Avaliações 5 estrelas'
  },
  {
    label: 'Prêmios Recebidos',
    value: '25+',
    icon: Award,
    description: 'Reconhecimentos do setor'
  },
  {
    label: 'Transações Realizadas',
    value: 'R$ 2.8B+',
    icon: TrendingUp,
    description: 'Em valor de vendas'
  }
];

const Statistics = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">Por que escolher a Kubico?</h2>
          <p className="section-subtitle">
            Somos referência no mercado imobiliário, combinando tecnologia avançada e atendimento personalizado para oferecer a melhor experiência.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 text-center group hover:bg-gradient-to-br hover:from-kubico-blue/5 hover:to-kubico-green/5"
            >
              <div className="inline-flex items-center justify-center p-4 bg-kubico-blue/10 rounded-full mb-6 group-hover:bg-kubico-blue/20 transition-colors duration-300">
                <stat.icon className="h-7 w-7 text-kubico-blue" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-gray-900">{stat.value}</h3>
              <h4 className="text-lg font-medium mb-2 text-gray-900">{stat.label}</h4>
              <p className="text-kubico-gray-medium">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
