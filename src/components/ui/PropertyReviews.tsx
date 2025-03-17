
import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, User, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from "@/hooks/use-toast";
import EmptyState from './EmptyState';

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  likes: number;
  userLiked: boolean;
  replies?: Reply[];
  showReplies?: boolean;
}

interface Reply {
  id: string;
  userName: string;
  userAvatar?: string;
  comment: string;
  createdAt: string;
}

interface PropertyReviewsProps {
  propertyId: string;
}

const PropertyReviews: React.FC<PropertyReviewsProps> = ({ propertyId }) => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([
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
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // Função para renderizar as estrelas baseado na avaliação
  const renderStars = (rating: number, interactive = false) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
        onClick={interactive ? () => setNewReview({...newReview, rating: i + 1}) : undefined}
        style={interactive ? { cursor: 'pointer' } : {}}
      />
    ));
  };
  
  // Função para formatar data
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  // Função para alternar a visualização de respostas
  const toggleReplies = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? {...review, showReplies: !review.showReplies} 
        : review
    ));
  };
  
  // Função para curtir uma avaliação
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
  
  // Função para enviar uma nova avaliação
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
    
    const newReviewObj: Review = {
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
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Sua avaliação</h3>
          
          <div className="mb-4">
            <p className="mb-2 text-kubico-gray-medium">Classificação</p>
            <div className="flex items-center">
              {renderStars(newReview.rating, true)}
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
            <Button variant="outline" onClick={() => setShowReviewForm(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmitReview}>
              Enviar avaliação
            </Button>
          </div>
        </div>
      )}
      
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex items-start">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={review.userAvatar} alt={review.userName} />
                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center justify-between">
                    <div>
                      <h4 className="font-medium">{review.userName}</h4>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-kubico-gray-medium ml-2">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`text-sm ${review.userLiked ? 'text-kubico-blue' : 'text-kubico-gray-medium'}`}
                      onClick={() => handleLike(review.id)}
                    >
                      <ThumbsUp className={`h-4 w-4 mr-1 ${review.userLiked ? 'fill-kubico-blue' : ''}`} />
                      <span>{review.likes}</span>
                    </Button>
                  </div>
                  
                  <p className="mt-3 text-kubico-gray-dark">{review.comment}</p>
                  
                  {review.replies && review.replies.length > 0 && (
                    <div className="mt-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-sm text-kubico-gray-medium hover:text-kubico-blue p-0 h-auto"
                        onClick={() => toggleReplies(review.id)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{review.replies.length} {review.replies.length === 1 ? 'resposta' : 'respostas'}</span>
                        {review.showReplies ? (
                          <ChevronUp className="h-4 w-4 ml-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </Button>
                      
                      {review.showReplies && (
                        <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-4">
                          {review.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start">
                              <Avatar className="h-8 w-8 mr-3">
                                <AvatarImage src={reply.userAvatar} alt={reply.userName} />
                                <AvatarFallback>{reply.userName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              
                              <div>
                                <div className="flex items-center">
                                  <h5 className="font-medium">{reply.userName}</h5>
                                  <span className="text-xs text-kubico-gray-medium ml-2">
                                    {formatDate(reply.createdAt)}
                                  </span>
                                </div>
                                <p className="mt-1 text-sm text-kubico-gray-dark">{reply.comment}</p>
                              </div>
                            </div>
                          ))}
                          
                          <div className="flex items-center mt-3">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarImage src="https://randomuser.me/api/portraits/lego/1.jpg" alt="Você" />
                              <AvatarFallback>V</AvatarFallback>
                            </Avatar>
                            <div className="relative flex-grow">
                              <Textarea 
                                placeholder="Escreva sua resposta..." 
                                className="resize-none pr-10"
                                rows={1}
                              />
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-kubico-blue"
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
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
