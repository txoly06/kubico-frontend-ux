
import React, { useEffect, useRef } from 'react';
import { Send, Paperclip, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  online: boolean;
}

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isRead: boolean;
}

interface ChatWindowProps {
  contact: Contact;
  messages: Message[];
  newMessage: string;
  onNewMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
}

const ChatWindow = ({ 
  contact, 
  messages, 
  newMessage, 
  onNewMessageChange, 
  onSendMessage 
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <div className="relative mr-3">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {contact.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
            )}
          </div>
          <div>
            <h3 className="font-medium">{contact.name}</h3>
            <div className="flex items-center">
              <span className="text-xs text-gray-500">{contact.role}</span>
              {contact.online && (
                <span className="ml-2 text-xs text-green-600">Online</span>
              )}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => {
            const isUserMessage = message.sender === 'user';
            
            return (
              <div 
                key={message.id}
                className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    isUserMessage 
                      ? 'bg-kubico-blue text-white rounded-br-none' 
                      : 'bg-white text-gray-800 rounded-bl-none border'
                  }`}
                >
                  <p>{message.text}</p>
                  <div className={`text-xs mt-1 flex items-center ${isUserMessage ? 'text-blue-100 justify-end' : 'text-gray-500'}`}>
                    {message.time}
                    {isUserMessage && (
                      <span className="ml-1">{message.isRead ? '✓✓' : '✓'}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input */}
      <div className="p-3 border-t bg-white">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="flex-grow relative">
            <Input
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={onNewMessageChange}
              onKeyPress={handleKeyPress}
              className="pr-12"
            />
            <Button 
              className="absolute right-0 top-0 h-full rounded-l-none"
              onClick={onSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
