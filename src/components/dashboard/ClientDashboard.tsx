
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Search, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

interface ClientDashboardProps {
  activeTab: string;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ activeTab }) => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  
  // Dados simulados de mensagens
  const conversations = [
    {
      id: '1',
      agent: {
        id: 'a1',
        name: 'Marina Santos',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        role: 'Corretora',
      },
      lastMessage: 'Olá! Gostaria de marcar uma visita para ver o apartamento no Centro.',
      timestamp: '10:30',
      unread: 2,
    },
    {
      id: '2',
      agent: {
        id: 'a2',
        name: 'Ricardo Gomes',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        role: 'Corretor',
      },
      lastMessage: 'Os documentos que solicitei já estão disponíveis para revisão.',
      timestamp: 'Ontem',
      unread: 0,
    },
    {
      id: '3',
      agent: {
        id: 'a3',
        name: 'Juliana Costa',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        role: 'Corretora',
      },
      lastMessage: 'Vamos agendar a assinatura do contrato para semana que vem?',
      timestamp: '20/04',
      unread: 1,
    },
  ];
  
  // Mensagens da conversa selecionada
  const selectedChat = [
    {
      id: 'm1',
      sender: 'agent',
      text: 'Olá! Sou a Marina, corretora responsável pelo apartamento no Centro que você demonstrou interesse.',
      timestamp: '10:20',
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'Olá Marina! Gostaria de marcar uma visita para ver o apartamento.',
      timestamp: '10:25',
    },
    {
      id: 'm3',
      sender: 'agent',
      text: 'Claro! Temos disponibilidade para quinta ou sexta-feira desta semana. Qual horário seria melhor para você?',
      timestamp: '10:28',
    },
    {
      id: 'm4',
      sender: 'user',
      text: 'Quinta-feira às 14h seria perfeito para mim.',
      timestamp: '10:30',
    },
  ];
  
  const filteredConversations = conversations.filter(
    conv => conv.agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Enviando mensagem:', message);
      setMessage('');
    }
  };
  
  const renderMessages = () => (
    <div className="flex-grow overflow-y-auto px-4 py-4 space-y-4">
      {selectedChat.map(msg => (
        <div 
          key={msg.id}
          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-[75%] rounded-lg px-4 py-2 ${
              msg.sender === 'user' 
                ? 'bg-kubico-blue text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p>{msg.text}</p>
            <span className={`text-xs ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'} block text-right mt-1`}>
              {msg.timestamp}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
  
  // Se a aba ativa não for mensagens, retorna null
  if (activeTab !== 'messages') {
    return null;
  }
  
  return (
    <Card className="overflow-hidden border border-gray-100">
      <div className="flex h-[calc(80vh-150px)] max-h-[700px]">
        {/* Lista de conversas (escondida em mobile) */}
        {!isMobile && (
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar conversas"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto">
              {filteredConversations.map(conv => (
                <div 
                  key={conv.id}
                  className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                >
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage src={conv.agent.avatar} alt={conv.agent.name} />
                    <AvatarFallback>{conv.agent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900 truncate">{conv.agent.name}</h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{conv.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="ml-2 bg-kubico-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conv.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Área de conversa */}
        <div className="flex-grow flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={conversations[0].agent.avatar} alt={conversations[0].agent.name} />
              <AvatarFallback>{conversations[0].agent.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium">{conversations[0].agent.name}</h4>
              <p className="text-xs text-gray-500">{conversations[0].agent.role}</p>
            </div>
          </div>
          
          {renderMessages()}
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <Input
                placeholder="Digite sua mensagem..."
                className="flex-grow"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                className="ml-2 bg-kubico-blue hover:bg-kubico-blue/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ClientDashboard;
