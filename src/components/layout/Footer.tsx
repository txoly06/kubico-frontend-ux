
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company info */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <span className="font-display font-bold text-2xl text-white">Kubico</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              Transformando a experiência imobiliária com tecnologia e inovação. Encontre, avalie e negocie imóveis com segurança e facilidade.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-white transition-colors">Imóveis</Link>
              </li>
              <li>
                <Link to="/valuation" className="text-gray-400 hover:text-white transition-colors">Avaliação</Link>
              </li>
              <li>
                <Link to="/contracts" className="text-gray-400 hover:text-white transition-colors">Contratos</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">Sobre Nós</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contato</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/buy" className="text-gray-400 hover:text-white transition-colors">Comprar Imóvel</Link>
              </li>
              <li>
                <Link to="/services/sell" className="text-gray-400 hover:text-white transition-colors">Vender Imóvel</Link>
              </li>
              <li>
                <Link to="/services/rent" className="text-gray-400 hover:text-white transition-colors">Alugar Imóvel</Link>
              </li>
              <li>
                <Link to="/services/investment" className="text-gray-400 hover:text-white transition-colors">Investimento Imobiliário</Link>
              </li>
              <li>
                <Link to="/services/appraisal" className="text-gray-400 hover:text-white transition-colors">Consultoria Especializada</Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-kubico-blue mr-2 mt-0.5" />
                <span className="text-gray-400">
                  Av. Paulista, 1000<br />São Paulo, SP 01310-100
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-kubico-blue mr-2" />
                <a href="tel:+551145678900" className="text-gray-400 hover:text-white transition-colors">
                  +55 (11) 4567-8900
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-kubico-blue mr-2" />
                <a href="mailto:contato@kubico.com.br" className="text-gray-400 hover:text-white transition-colors">
                  contato@kubico.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-gray-800 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Kubico. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
                Termos de Uso
              </Link>
              <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/cookies" className="text-gray-500 hover:text-white text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
