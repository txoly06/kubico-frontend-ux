
import React, { useState } from 'react';
import { Star, ThumbsUp, Flag, MoreHorizontal, User, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import EmptyState from './EmptyState';

interface Review {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  date: string;
  likes: number;
  userLiked?: boolean;
  responseFrom?: {
    name: string;
    avatar?: string;
    comment: string;
    date: string;
  };
}

interface PropertyReviewsProps {
  propertyId: string;
  userCanReview?: boolean;
  averageRating?: number;
}

const PropertyReviews: React.FC<PropertyReviewsProps> = ({
  propertyId,
  userCanReview = true,
  averageRating = 0
}) => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      author: {
        name: 'Ana Silva',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      rating: 5,
      comment: 'Adorei o imóvel, localização excelente e ótimo acabamento. A vista é incrível e o atendimento do corretor foi exemplar.',
      date: '2023-06-10',
      likes: 3,
      userLiked: false
    },
    {
      id: '2',
      author: {
        name: 'Carlos Gomes',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      rating: 4,
      comment: 'Bom apartamento, bem localizado e com ótimo custo-benefício. Apenas achei que alguns detalhes de acabamento poderiam ser melhores.',
      date: '2023-05-20',
      likes: 1,
      userLiked: false,
      responseFrom: {
        name: 'Marcelo Santos (Corretor)',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        comment: 'Obrigado pelo feedback, Carlos! Estamos sempre procurando melhorar. Vamos analisar esses pontos de acabamento para futuros imóveis semelhantes.',
        date: '2023-05-22'
      }
    },
    {
      id: '3',
      author: {
        name: 'Juliana Costa',
      },
      rating: 5,
      comment: 'Imóvel perfeito! O condomínio é muito bem cuidado e oferece excelente estrutura. Recomendo!',
      date: '2023-04-15',
      likes: 5,
      userLiked: true
    }
  ]);
  
  const [showNewReviewDialog, setShowNewReviewDialog] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [expandedResponses, setExpandedResponses] = useState<string[]>([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={cn(
          "h-4 w-4", 
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        )} 
      />
    ));
  };
  
  const handleToggleResponse = (reviewId: string) => {
    setExpandedResponses(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId) 
        : [...prev, reviewId]
    );
  };
  
  const handleToggleLike = (reviewId: string) => {
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        const userLiked = !review.userLiked;
        return {
          ...review,
          likes: userLiked ? review.likes + 1 : review.likes - 1,
          userLiked
        };
      }
      return review;
    }));
  };
  
  const handleSubmitReview = () => {
    if (!newReview.comment.trim()) {
      toast({
        title: "Comentário necessário",
        description: "Por favor, adicione um comentário à sua avaliação.",
        variant: "destructive",
      });
      return;
    }
    
    // Em uma aplicação real, enviaríamos isso para a API
    const newReviewObject: Review = {
      id: `review-${Date.now()}`,
      author: {
        name: 'Você',
      },
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };
    
    setReviews(prev => [newReviewObject, ...prev]);
    setNewReview({ rating: 5, comment: '' });
    setShowNewReviewDialog(false);
    
    toast({
      title: "Avaliação enviada",
      description: "Obrigado por compartilhar sua opinião sobre este imóvel.",
    });
  };
  
  const handleReportReview = (reviewId: string) => {
    toast({
      title: "Avaliação denunciada",
      description: "Agradecemos por nos ajudar a manter a qualidade das avaliações.",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Avaliações</h2>
          {reviews.length > 0 && (
            <div className="flex items-center mt-1">
              <div className="flex mr-2">
                {renderStars(Math.round(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length))}
              </div>
              <span className="text-sm text-kubico-gray-dark">
                {reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'}
              </span>
            </div>
          )}
        </div>
        
        {userCanReview && (
          <Button 
            onClick={() => setShowNewReviewDialog(true)} 
            className="bg-kubico-blue hover:bg-kubico-blue/90"
          >
            <Star className="h-4 w-4 mr-2" />
            Avaliar
          </Button>
        )}
      </div>
      
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {visibleReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg border border-gray-100 p-4">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.author.avatar} alt={review.author.name} />
                    <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <div className="font-medium">{review.author.name}</div>
                    <div className="text-sm text-kubico-gray-medium">
                      {new Date(review.date).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {renderStars(review.rating)}
                </div>
              </div>
              
              <div className="mt-3 text-kubico-gray-dark">
                {review.comment}
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-xs h-8",
                    review.userLiked && "text-kubico-blue"
                  )}
                  onClick={() => handleToggleLike(review.id)}
                >
                  <ThumbsUp className={cn(
                    "h-4 w-4 mr-1",
                    review.userLiked && "fill-kubico-blue text-kubico-blue"
                  )} />
                  {review.likes} {review.likes === 1 ? 'curtida' : 'curtidas'}
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleReportReview(review.id)}>
                      <Flag className="h-4 w-4 mr-2" />
                      Denunciar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Resposta (se houver) */}
              {review.responseFrom && (
                <>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex w-full justify-between text-kubico-gray-medium p-2 h-auto"
                      onClick={() => handleToggleResponse(review.id)}
                    >
                      <span>Resposta de {review.responseFrom.name}</span>
                      {expandedResponses.includes(review.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    
                    {expandedResponses.includes(review.id) && (
                      <div className="mt-2 pl-4 border-l-2 border-gray-200">
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={review.responseFrom.avatar} alt={review.responseFrom.name} />
                            <AvatarFallback>{review.responseFrom.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="ml-2">
                            <div className="text-sm font-medium">{review.responseFrom.name}</div>
                            <div className="text-xs text-kubico-gray-medium">
                              {new Date(review.responseFrom.date).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-kubico-gray-dark">
                          {review.responseFrom.comment}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
          
          {reviews.length > 3 && (
            <div className="text-center mt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                {showAllReviews ? 'Mostrar menos' : `Ver todas as ${reviews.length} avaliações`}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <EmptyState 
          type="reviews" 
          ctaAction={() => setShowNewReviewDialog(true)} 
        />
      )}
      
      {/* Dialog para nova avaliação */}
      <Dialog open={showNewReviewDialog} onOpenChange={setShowNewReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Avaliar Imóvel</DialogTitle>
            <DialogDescription>
              Compartilhe sua experiência sobre este imóvel para ajudar outros usuários.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Sua Avaliação</Label>
              <RadioGroup
                id="rating"
                value={newReview.rating.toString()}
                onValueChange={(value) => setNewReview(prev => ({ ...prev, rating: parseInt(value) }))}
                className="flex space-x-2"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <RadioGroupItem
                    key={value}
                    value={value.toString()}
                    id={`rating-${value}`}
                    className="sr-only"
                  />
                ))}
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label
                      key={value}
                      htmlFor={`rating-${value}`}
                      className="cursor-pointer"
                    >
                      <Star 
                        className={cn(
                          "h-8 w-8 transition-colors", 
                          value <= newReview.rating 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-gray-300 hover:text-yellow-200"
                        )} 
                      />
                    </label>
                  ))}
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="comment">Seu Comentário</Label>
              <Textarea
                id="comment"
                placeholder="Conte-nos sua experiência com este imóvel..."
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                className="min-h-[120px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewReviewDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmitReview} className="bg-kubico-blue hover:bg-kubico-blue/90">
              Enviar Avaliação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyReviews;
