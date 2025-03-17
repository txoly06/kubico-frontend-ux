
import React from 'react';
import { Star, MessageSquare, ThumbsUp, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ReviewData } from '@/types/review';

interface ReviewItemProps {
  review: ReviewData;
  replyText: string;
  onReplyChange: (text: string) => void;
  onToggleReplies: () => void;
  onLike: () => void;
  onSubmitReply: () => void;
  formatDate: (date: string) => string;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  replyText,
  onReplyChange,
  onToggleReplies,
  onLike,
  onSubmitReply,
  formatDate
}) => {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="border-b border-gray-100 pb-6 last:border-0">
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
              onClick={onLike}
            >
              <ThumbsUp className={`h-4 w-4 mr-1 ${review.userLiked ? 'fill-kubico-blue' : ''}`} />
              <span>{review.likes}</span>
            </Button>
          </div>
          
          <p className="mt-3 text-kubico-gray-dark">{review.comment}</p>
          
          <div className="mt-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm text-kubico-gray-medium hover:text-kubico-blue p-0 h-auto"
              onClick={onToggleReplies}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>
                {review.replies && review.replies.length > 0 
                  ? `${review.replies.length} ${review.replies.length === 1 ? 'resposta' : 'respostas'}` 
                  : 'Responder'}
              </span>
              {review.showReplies ? (
                <ChevronUp className="h-4 w-4 ml-1" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-1" />
              )}
            </Button>
            
            {review.showReplies && (
              <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-4">
                {review.replies && review.replies.length > 0 && review.replies.map((reply) => (
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
                      value={replyText}
                      onChange={(e) => onReplyChange(e.target.value)}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-kubico-blue"
                      onClick={onSubmitReply}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
