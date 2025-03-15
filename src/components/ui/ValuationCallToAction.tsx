
import React from 'react';
import { Button } from '@/components/ui/button';

const ValuationCallToAction = () => {
  return (
    <div className="bg-gradient-to-r from-kubico-blue to-kubico-blue/80 text-white rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold mb-2">Quer uma avaliação profissional?</h3>
      <p className="text-sm text-white/80 mb-4">
        Para uma avaliação mais precisa, agende uma visita com um de nossos corretores especializados.
      </p>
      <Button className="w-full bg-white text-kubico-blue hover:bg-white/90">
        Solicitar Visita
      </Button>
    </div>
  );
};

export default ValuationCallToAction;
