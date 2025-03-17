
import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ReviewFormProps {
  newReview: {
    rating: number;
    comment: string;
  };
  setNewReview: React.Dispatch<React.SetStateAction<{
    rating: number;
    comment: string;
  }>>;
  onCancel: () => void;
  onSubmit: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ 
  newReview, 
  setNewReview, 
  onCancel, 
  onSubmit 
}) => {
  const renderStars = (rating: number, interactive = true) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
        onClick={interactive ? () => setNewReview({...newReview, rating: i + 1}) : undefined}
        style={interactive ? { cursor: 'pointer' } : {}}
      />
    ));
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Sua avaliação</h3>
      
      <div className="mb-4">
        <p className="mb-2 text-kubico-gray-medium">Classificação</p>
        <div className="flex items-center">
          {renderStars(newReview.rating)}
          <span className="ml-2 text-kubico-gray-medium">
            {newReview.rating} de 5
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="mb-2 text-kubico-gray-medium">Comentário</p>
        <Textarea 
          placeholder="Compartilhe sua experiência com este imóvel..." 
          className="resize-none"
          rows={4}
          value={newReview.comment}
          onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={onSubmit}>
          Enviar avaliação
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;
