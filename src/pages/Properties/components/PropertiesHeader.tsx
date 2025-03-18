
import React from 'react';
import { Link } from 'react-router-dom';

const PropertiesHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center text-sm text-kubico-gray-dark mb-2">
        <Link to="/" className="hover:text-kubico-blue">Início</Link>
        <span className="mx-2">/</span>
        <span>Imóveis</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Imóveis à Venda</h1>
      <p className="text-kubico-gray-dark">
        Encontre o imóvel perfeito para você entre as milhares de opções disponíveis
      </p>
    </div>
  );
};

export default PropertiesHeader;
