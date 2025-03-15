
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { CheckCheck, Check, Clock } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'contact';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image';
  imageUrl?: string;
}

interface MessageGroupProps {
  messages: Message[];
  formatMessageTime: (date: Date) => string;
}

const MessageGroup: React.FC<MessageGroupProps> = ({ messages, formatMessageTime }) => {
  if (!messages.length) return null;
  
  const firstMessage = messages[0];
  const isUserMessage = firstMessage.sender === 'user';
  
  // Only show the timestamp for the last message in the group
  const lastMessage = messages[messages.length - 1];
  
  return (
    <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'} mb-2`}>
      {!isUserMessage && (
        <div className="mr-2 mt-1">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Contact avatar" />
            <AvatarFallback className="bg-gray-300 text-gray-600">C</AvatarFallback>
          </Avatar>
        </div>
      )}
      
      <div className={`flex flex-col ${isUserMessage ? 'items-end' : 'items-start'} max-w-[80%] md:max-w-[70%]`}>
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              isUserMessage
                ? 'bg-kubico-blue text-white rounded-tl-lg rounded-tr-lg'
                : 'bg-white border rounded-tl-lg rounded-tr-lg',
              index === 0 
                ? isUserMessage ? 'rounded-bl-lg' : 'rounded-br-lg' 
                : '',
              index === messages.length - 1 
                ? isUserMessage ? 'rounded-br-none' : 'rounded-bl-none' 
                : '',
              'p-2 md:p-3 mb-0.5 shadow-sm'
            )}
          >
            {message.type === 'image' ? (
              <Dialog>
                <DialogTrigger asChild>
                  <img 
                    src={message.imageUrl} 
                    alt="Imagem enviada" 
                    className="max-w-full rounded cursor-pointer transition-all hover:brightness-90"
                  />
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <img 
                    src={message.imageUrl} 
                    alt="Imagem enviada" 
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                </DialogContent>
              </Dialog>
            ) : (
              <p className="text-sm break-words">{message.content}</p>
            )}
            
            {/* Only show timestamp and status for the last message in the group */}
            {index === messages.length - 1 && (
              <div
                className={cn(
                  "text-xs mt-1 flex items-center justify-end gap-1",
                  isUserMessage ? "text-blue-100" : "text-gray-400"
                )}
              >
                {formatMessageTime(message.timestamp)}
                {isUserMessage && (
                  <span>
                    {message.status === 'read' ? (
                      <CheckCheck className="h-3 w-3" />
                    ) : message.status === 'delivered' ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Clock className="h-3 w-3" />
                    )}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageGroup;
