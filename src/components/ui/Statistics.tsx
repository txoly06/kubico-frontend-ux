
import React, { useEffect, useState } from 'react';
import { Users, Home, Award, TrendingUp, Building, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  {
    label: 'Imóveis Cadastrados',
    value: '15.000+',
    icon: Home,
    description: 'Em todo o Brasil',
    color: 'text-kubico-blue',
    bgColor: 'bg-kubico-blue/10'
  },
  {
    label: 'Clientes Satisfeitos',
    value: '8.500+',
    icon: Users,
    description: 'Avaliações 5 estrelas',
    color: 'text-kubico-green',
    bgColor: 'bg-kubico-green/10'
  },
  {
    label: 'Prêmios Recebidos',
    value: '25+',
    icon: Award,
    description: 'Reconhecimentos do setor',
    color: 'text-kubico-orange',
    bgColor: 'bg-kubico-orange/10'
  },
  {
    label: 'Transações Realizadas',
    value: 'R$ 2.8B+',
    icon: TrendingUp,
    description: 'Em valor de vendas',
    color: 'text-purple-600',
    bgColor: 'bg-purple-600/10'
  },
  {
    label: 'Construtoras Parceiras',
    value: '120+',
    icon: Building,
    description: 'Empreendimentos exclusivos',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    label: 'Contratos Finalizados',
    value: '12.600+',
    icon: CheckCircle,
    description: 'Sonhos realizados',
    color: 'text-green-600',
    bgColor: 'bg-green-600/10'
  }
];

interface CounterProps {
  value: string;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ''));
  
  useEffect(() => {
    if (isNaN(numericValue)) return;
    
    let start = 0;
    const increment = numericValue / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      setCount(Math.floor(start));
      
      if (start >= numericValue) {
        clearInterval(timer);
        setCount(numericValue);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [numericValue, duration]);
  
  // Handle non-numeric values like "15.000+"
  const prefix = value.match(/^\D+/) || '';
  const suffix = value.match(/\D+$/) || '';
  
  return (
    <span>{prefix}{count.toLocaleString('pt-BR')}{suffix}</span>
  );
};

interface StatisticsProps {
  className?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

const Statistics: React.FC<StatisticsProps> = ({ 
  className,
  title = "Por que escolher a Kubico?",
  subtitle = "Somos referência no mercado imobiliário, combinando tecnologia avançada e atendimento personalizado para oferecer a melhor experiência.",
  compact = false
}) => {
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('statistics-section');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);
  
  // Choose how many stats to display based on compact mode
  const displayStats = compact ? stats.slice(0, 4) : stats;
  
  return (
    <section 
      id="statistics-section"
      className={cn(
        "section-padding bg-white", 
        compact ? "py-12" : "py-16 md:py-24",
        className
      )}
    >
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        
        <div className={cn(
          "grid gap-6",
          compact 
            ? "grid-cols-2 md:grid-cols-4" 
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}>
          {displayStats.map((stat, index) => (
            <div 
              key={index} 
              className={cn(
                "bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300",
                compact ? "text-center" : "text-center group hover:bg-gradient-to-br hover:from-kubico-blue/5 hover:to-kubico-green/5",
                "transform transition-transform duration-300",
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                `transition-delay-${index * 100}`
              )}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <div className={cn(
                "inline-flex items-center justify-center p-4 rounded-full mb-6 transition-colors duration-300",
                stat.bgColor,
                "group-hover:scale-110 transform transition-transform"
              )}>
                <stat.icon className={cn("h-7 w-7", stat.color)} />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-gray-900">
                {inView ? <Counter value={stat.value} /> : "0"}
              </h3>
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
