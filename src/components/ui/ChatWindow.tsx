
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Paperclip, MoreVertical, Phone, Video, Image, X, ChevronLeft, Search, Smile } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import MessageGroup from './MessageGroup';

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

// Common emojis for quick access
const COMMON_EMOJIS = [
  "😊", "👍", "❤️", "👋", "🙏", "🔥", "😂", 
  "🎉", "✅", "👀", "🏠", "🌟", "💯", "📄",
  "👨‍👩‍👧‍👦", "📱", "🔑", "💰", "📅", "📍", "📞"
];

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
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
    if (e.key === 'Enter' && !e.shiftKey) {
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
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  };

  const insertEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  // Filter messages based on search query
  const filteredMessages = searchQuery.trim() 
    ? messages.filter(msg => 
        msg.type !== 'image' && 
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  // Group messages by sender and time proximity
  const groupedMessages = () => {
    const groups: Message[][] = [];
    let currentGroup: Message[] = [];
    let lastSender: 'user' | 'contact' | null = null;
    let lastTimestamp: Date | null = null;
    
    filteredMessages.forEach(message => {
      const messageTime = new Date(message.timestamp);
      
      // Start a new group if:
      // 1. There's no current group, or
      // 2. Sender changed, or
      // 3. Time gap is more than 5 minutes
      if (
        currentGroup.length === 0 || 
        lastSender !== message.sender ||
        (lastTimestamp && messageTime.getTime() - lastTimestamp.getTime() > 5 * 60 * 1000)
      ) {
        if (currentGroup.length > 0) {
          groups.push([...currentGroup]);
        }
        currentGroup = [message];
      } else {
        currentGroup.push(message);
      }
      
      lastSender = message.sender;
      lastTimestamp = messageTime;
    });
    
    if (currentGroup.length > 0) {
      groups.push([...currentGroup]);
    }
    
    return groups;
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
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-8 w-8 md:h-10 md:w-10"
                  onClick={toggleSearch}
                >
                  <Search className={cn("h-4 w-4 md:h-5 md:w-5 text-gray-600", isSearchOpen && "text-kubico-blue")} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Pesquisar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
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
      
      {/* Search bar */}
      {isSearchOpen && (
        <div className="px-4 py-2 border-b flex items-center gap-2">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            ref={searchInputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar na conversa..."
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-8 p-0 text-sm"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      )}
      
      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto p-3 md:p-6 bg-gray-50 space-y-4">
        {groupedMessages().map((group, groupIndex) => (
          <MessageGroup 
            key={groupIndex}
            messages={group}
            formatMessageTime={formatMessageTime}
          />
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
          
          <div className="relative flex-grow">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="rounded-full text-sm pr-11"
              disabled={!!imagePreview}
            />
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                >
                  <Smile className="h-5 w-5 text-gray-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2">
                <div className="grid grid-cols-7 gap-1">
                  {COMMON_EMOJIS.map((emoji, index) => (
                    <button
                      key={index}
                      className="h-8 w-8 flex items-center justify-center text-xl hover:bg-gray-100 rounded"
                      onClick={() => insertEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
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
