
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Paperclip, MoreVertical, Phone, Video, Image, X, ChevronLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'contact';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image';
  imageUrl?: string;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  online: boolean;
  lastSeen?: string;
  isTyping?: boolean;
}

interface ChatWindowProps {
  contact: Contact | null;
  messages: Message[];
  onSendMessage: (content: string, type?: 'text' | 'image', imageUrl?: string) => void;
  onBack?: () => void;
  isMobileView?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ 
  contact, 
  messages, 
  onSendMessage, 
  onBack,
  isMobileView = false
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (imagePreview) {
      onSendMessage('', 'image', imagePreview);
      setImagePreview(null);
      setSelectedImage(null);
      
      toast({
        title: "Imagem enviada",
        description: "Sua imagem foi enviada com sucesso.",
        duration: 2000,
      });
      return;
    }
    
    if (newMessage.trim() === '') return;
    
    onSendMessage(newMessage.trim());
    setNewMessage('');
    
    toast({
      title: "Mensagem enviada",
      description: "Sua mensagem foi enviada com sucesso.",
      duration: 2000,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImagePreview(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImagePreview = () => {
    setImagePreview(null);
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!contact) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-50 text-center p-8">
        <div className="max-w-md">
          <h3 className="text-xl font-medium text-gray-700 mb-2">Selecione um contato</h3>
          <p className="text-gray-500">
            Escolha um contato da lista para iniciar uma conversa ou continuar uma conversa existente.
          </p>
        </div>
      </div>
    );
  }

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat header */}
      <div className="px-4 py-3 md:px-6 md:py-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          {isMobileView && (
            <Button variant="ghost" size="icon" className="mr-1" onClick={onBack}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <Avatar className="h-8 w-8 md:h-10 md:w-10">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-sm md:text-base">{contact.name}</h3>
            <p className="text-xs text-gray-500">
              {contact.isTyping 
                ? 'Digitando...' 
                : contact.online 
                  ? 'Online agora' 
                  : `Visto por último ${contact.lastSeen || 'recentemente'}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 md:h-10 md:w-10">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Ligar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 md:h-10 md:w-10">
                  <Video className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Videochamada</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 md:h-10 md:w-10">
                  <MoreVertical className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mais opções</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto p-3 md:p-6 bg-gray-50 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] md:max-w-[70%] rounded-lg p-2 md:p-3 ${
                message.sender === 'user'
                  ? 'bg-kubico-blue text-white rounded-br-none'
                  : 'bg-white border rounded-bl-none'
              }`}
            >
              {message.type === 'image' ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <img 
                      src={message.imageUrl} 
                      alt="Imagem enviada" 
                      className="max-w-full rounded cursor-pointer"
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
                <p className="text-sm">{message.content}</p>
              )}
              <div
                className={`text-xs mt-1 flex items-center justify-end gap-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                }`}
              >
                {formatMessageTime(message.timestamp)}
                {message.sender === 'user' && (
                  <span>
                    {message.status === 'read' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-check">
                        <path d="M18 6 7 17l-5-5" />
                        <path d="m22 10-7.5 7.5L13 16" />
                      </svg>
                    ) : message.status === 'delivered' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Image preview */}
      {imagePreview && (
        <div className="p-2 border-t bg-gray-50">
          <div className="relative inline-block">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="max-h-40 rounded border"
            />
            <Button 
              size="icon" 
              variant="secondary" 
              className="absolute top-1 right-1 h-6 w-6 rounded-full" 
              onClick={clearImagePreview}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Chat input */}
      <div className="p-3 md:p-4 border-t">
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageSelect}
          />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full flex-shrink-0 h-9 w-9 md:h-10 md:w-10"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image className="h-5 w-5 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Enviar imagem</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0 h-9 w-9 md:h-10 md:w-10">
                  <Paperclip className="h-5 w-5 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Anexar arquivo</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="rounded-full text-sm"
            disabled={!!imagePreview}
          />
          
          <Button
            onClick={handleSendMessage}
            size="icon"
            className={cn(
              "rounded-full flex-shrink-0 h-9 w-9 md:h-10 md:w-10",
              (newMessage.trim() || imagePreview) 
                ? "bg-kubico-blue hover:bg-kubico-blue/90" 
                : "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
            )}
            disabled={!newMessage.trim() && !imagePreview}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
