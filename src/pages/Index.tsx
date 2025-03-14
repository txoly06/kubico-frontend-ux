
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import FeaturedProperties from '@/components/ui/FeaturedProperties';
import Statistics from '@/components/ui/Statistics';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Home, LineChart, MessageCircle, ShieldCheck, Clock } from 'lucide-react';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Featured Properties */}
        <FeaturedProperties />
        
        {/* Services Section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="chip bg-kubico-blue/10 text-kubico-blue mb-3">Nossos Serviços</span>
              <h2 className="section-title">Soluções Completas em Imóveis</h2>
              <p className="section-subtitle">
                Oferecemos uma plataforma integrada com todas as ferramentas para uma experiência imobiliária excepcional
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group animate-fade-in hover:border-kubico-blue/20">
                <div className="w-16 h-16 rounded-xl bg-kubico-blue/10 flex items-center justify-center mb-6 group-hover:bg-kubico-blue/20 transition-colors duration-300">
                  <Building className="h-8 w-8 text-kubico-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3">Busca Inteligente</h3>
                <p className="text-kubico-gray-dark mb-6">
                  Encontre o imóvel ideal com nossos filtros avançados e busca inteligente baseada em suas preferências.
                </p>
                <Link to="/properties">
                  <Button variant="ghost" className="text-kubico-blue p-0 font-medium flex items-center group">
                    Buscar Imóveis
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group animate-fade-in hover:border-kubico-blue/20" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 rounded-xl bg-kubico-green/10 flex items-center justify-center mb-6 group-hover:bg-kubico-green/20 transition-colors duration-300">
                  <LineChart className="h-8 w-8 text-kubico-green" />
                </div>
                <h3 className="text-xl font-bold mb-3">Avaliação de Imóveis</h3>
                <p className="text-kubico-gray-dark mb-6">
                  Obtenha o valor justo do seu imóvel com nossa avaliação precisa baseada em dados de mercado atualizados.
                </p>
                <Link to="/valuation">
                  <Button variant="ghost" className="text-kubico-green p-0 font-medium flex items-center group">
                    Avaliar Imóvel
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group animate-fade-in hover:border-kubico-blue/20" style={{ animationDelay: '0.4s' }}>
                <div className="w-16 h-16 rounded-xl bg-kubico-orange/10 flex items-center justify-center mb-6 group-hover:bg-kubico-orange/20 transition-colors duration-300">
                  <Home className="h-8 w-8 text-kubico-orange" />
                </div>
                <h3 className="text-xl font-bold mb-3">Gestão de Contratos</h3>
                <p className="text-kubico-gray-dark mb-6">
                  Simplifique o processo de compra, venda ou aluguel com nossa plataforma segura de contratos digitais.
                </p>
                <Link to="/contracts">
                  <Button variant="ghost" className="text-kubico-orange p-0 font-medium flex items-center group">
                    Gerenciar Contratos
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <Statistics />
        
        {/* Features Section */}
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <span className="chip bg-kubico-blue/10 text-kubico-blue mb-3">Diferenciais</span>
                <h2 className="section-title">Uma experiência imobiliária completa e segura</h2>
                <p className="text-kubico-gray-dark mb-8">
                  Na Kubico, combinamos tecnologia avançada e atendimento personalizado para oferecer a você uma experiência única no mercado imobiliário.
                </p>
                
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-kubico-blue/10 flex items-center justify-center">
                      <ShieldCheck className="h-6 w-6 text-kubico-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Segurança e Confiabilidade</h3>
                      <p className="text-kubico-gray-dark">
                        Todos os imóveis e usuários são verificados para garantir transações seguras e confiáveis.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-kubico-green/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-kubico-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Economia de Tempo</h3>
                      <p className="text-kubico-gray-dark">
                        Automatizamos processos burocráticos para que você se concentre no que realmente importa.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-kubico-orange/10 flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-kubico-orange" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Suporte Especializado</h3>
                      <p className="text-kubico-gray-dark">
                        Nossa equipe de especialistas está disponível para ajudar em todas as etapas do processo.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <Link to="/about">
                    <Button className="mr-4 bg-kubico-blue hover:bg-kubico-blue/90">
                      Conheça a Kubico
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline">
                      Fale Conosco
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Kubico Platform" 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-kubico-blue opacity-20 blur-2xl"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-kubico-green opacity-20 blur-2xl"></div>
                </div>
                
                {/* Floating card */}
                <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-white p-6 rounded-xl shadow-lg max-w-xs animate-fade-in">
                  <div className="flex items-center mb-3">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="User" 
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-medium">Ana Silva</h4>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-kubico-gray-dark text-sm">
                    "A Kubico transformou minha busca por imóveis. Processo simples, rápido e transparente!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-kubico-blue to-kubico-blue/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para encontrar o imóvel dos seus sonhos?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de clientes satisfeitos que encontraram o imóvel perfeito com a Kubico.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto text-kubico-blue bg-white hover:bg-white/90">
                  Cadastre-se Gratuitamente
                </Button>
              </Link>
              <Link to="/properties">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Explorar Imóveis
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
