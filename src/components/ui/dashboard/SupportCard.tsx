
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SupportCard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-r from-kubico-blue to-kubico-blue/80 text-white rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold mb-2">Precisa de ajuda?</h3>
      <p className="text-sm text-white/80 mb-4">Nossa equipe está disponível para atender você e responder qualquer dúvida.</p>
      <Button
        className="w-full bg-white text-kubico-blue hover:bg-white/90"
        onClick={() => navigate('/contact')}
      >
        Fale Conosco
      </Button>
    </div>
  );
};

export default SupportCard;
