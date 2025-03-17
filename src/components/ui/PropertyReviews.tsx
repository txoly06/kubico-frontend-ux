
import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from "@/hooks/use-toast";
import EmptyState from './EmptyState';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';
import { ReviewData, ReplyData } from '@/types/review';

interface PropertyReviewsProps {
  propertyId: string;
}

const PropertyReviews: React.FC<PropertyReviewsProps> = ({ propertyId }) => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<ReviewData[]>([
    {
      id: '1',
      userName: 'Pedro Oliveira',
      userAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 5,
      comment: 'Imóvel excelente, com uma vista deslumbrante para o mar. O condomínio oferece ótima estrutura e a localização é perfeita, próximo a restaurantes, farmácias e supermercados.',
      createdAt: '2023-06-15',
      likes: 12,
      userLiked: false,
      replies: [
        {
          id: '1-1',
          userName: 'Marcelo Santos (Corretor)',
          userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          comment: 'Obrigado pelo feedback, Pedro! Fico feliz que tenha gostado do imóvel e da localização. Estamos à disposição para ajudar em qualquer questão adicional.',
          createdAt: '2023-06-16'
        }
      ],
      showReplies: false
    },
    {
      id: '2',
      userName: 'Ana Luiza',
      userAvatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      rating: 4,
      comment: 'Apartamento muito bem cuidado e espaçoso. Os quartos são amplos e a cozinha é bem equipada. A única ressalva é que o sol da tarde bate muito forte na sala, mas nada que cortinas não resolvam.',
      createdAt: '2023-05-29',
      likes: 8,
      userLiked: true,
      replies: [],
      showReplies: false
    },
    {
      id: '3',
      userName: 'Roberto Mendes',
      userAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 5,
      comment: 'Realizei uma visita virtual e fiquei impressionado com a qualidade do acabamento e a disposição dos cômodos. A área de lazer do prédio é um diferencial incrível.',
      createdAt: '2023-05-10',
      likes: 5,
      userLiked: false,
      replies: [],
      showReplies: false
    }
  ]);
  
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  
  const [newReplies, setNewReplies] = useState<{ [key: string]: string }>({});
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  const toggleReplies = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? {...review, showReplies: !review.showReplies} 
        : review
    ));
  };
  
  const handleLike = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? {
            ...review, 
            likes: review.userLiked ? review.likes - 1 : review.likes + 1,
            userLiked: !review.userLiked
          } 
        : review
    ));
  };
  
  const handleSubmitReview = () => {
    if (newReview.comment.trim() === '') {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, escreva um comentário para sua avaliação.",
        variant: "destructive",
      });
      return;
    }
    
    const currentDate = new Date().toISOString().split('T')[0];
    
    const newReviewObj: ReviewData = {
      id: `review-${Date.now()}`,
      userName: "Você",
      userAvatar: "https://randomuser.me/api/portraits/lego/1.jpg", // Avatar padrão para o usuário atual
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: currentDate,
      likes: 0,
      userLiked: false,
      replies: [],
      showReplies: false
    };
    
    setReviews([newReviewObj, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
    
    toast({
      title: "Avaliação enviada",
      description: "Obrigado por compartilhar sua opinião sobre este imóvel!",
    });
  };
  
  const handleSubmitReply = (reviewId: string) => {
    if (!newReplies[reviewId] || newReplies[reviewId].trim() === '') {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, escreva um comentário para sua resposta.",
        variant: "destructive",
      });
      return;
    }
    
    const currentDate = new Date().toISOString().split('T')[0];
    
    const newReplyObj: ReplyData = {
      id: `reply-${Date.now()}`,
      userName: "Você",
      userAvatar: "https://randomuser.me/api/portraits/lego/1.jpg", // Avatar padrão para o usuário atual
      comment: newReplies[reviewId],
      createdAt: currentDate
    };
    
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? {
            ...review, 
            replies: [...(review.replies || []), newReplyObj],
            showReplies: true
          } 
        : review
    ));
    
    setNewReplies(prev => ({...prev, [reviewId]: ''}));
    
    toast({
      title: "Resposta enviada",
      description: "Sua resposta foi publicada com sucesso!",
    });
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Avaliações e Comentários</h2>
        
        {!showReviewForm && (
          <Button onClick={() => setShowReviewForm(true)}>
            Avaliar este imóvel
          </Button>
        )}
      </div>
      
      {showReviewForm && (
        <ReviewForm 
          newReview={newReview}
          setNewReview={setNewReview}
          onCancel={() => setShowReviewForm(false)}
          onSubmit={handleSubmitReview}
        />
      )}
      
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewItem 
              key={review.id}
              review={review}
              replyText={newReplies[review.id] || ''}
              onReplyChange={(text) => setNewReplies({...newReplies, [review.id]: text})}
              onToggleReplies={() => toggleReplies(review.id)}
              onLike={() => handleLike(review.id)}
              onSubmitReply={() => handleSubmitReply(review.id)}
              formatDate={formatDate}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          type="reviews" 
          ctaAction={() => setShowReviewForm(true)} 
        />
      )}
    </div>
  );
};

export default PropertyReviews;
