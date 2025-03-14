
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import ChatSidebar from '@/components/ui/ChatSidebar';
import ChatWindow from '@/components/ui/ChatWindow';
import { useToast } from '@/hooks/use-toast';

// Dados simulados para os contatos
const MOCK_CONTACTS = [
  {
    id: '1',
    name: 'Ana Silveira',
    avatar: '/placeholder.svg',
    role: 'Corretora',
    lastMessage: 'Podemos agendar uma visita para amanhã?',
    lastMessageTime: '10:30',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    avatar: '/placeholder.svg',
    role: 'Proprietário',
    lastMessage: 'O imóvel já está disponível para visitação',
    lastMessageTime: '09:15',
    unread: 0,
    online: true,
  },
  {
    id: '3',
    name: 'Mariana Costa',
    avatar: '/placeholder.svg',
    role: 'Interessada',
    lastMessage: 'Gostaria de mais informações sobre o apartamento',
    lastMessageTime: 'Ontem',
    unread: 0,
    online: false,
  },
  {
    id: '4',
    name: 'Paulo Rodrigues',
    avatar: '/placeholder.svg',
    role: 'Corretor',
    lastMessage: 'Enviando os detalhes do condomínio conforme solicitado',
    lastMessageTime: 'Ontem',
    unread: 1,
    online: false,
  },
  {
    id: '5',
    name: 'Julia Martins',
    avatar: '/placeholder.svg',
    role: 'Administradora',
    lastMessage: 'Os documentos foram aprovados!',
    lastMessageTime: '23/05',
    unread: 0,
    online: false,
  },
];

// Dados simulados para as conversas
const MOCK_CONVERSATIONS = {
  '1': [
    {
      id: 'm1',
      sender: '1',
      text: 'Olá! Estou interessada em mostrar o apartamento na Av. Paulista para você.',
      time: '10:15',
      isRead: true,
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'Olá Ana! Seria ótimo. Quando podemos fazer isso?',
      time: '10:20',
      isRead: true,
    },
    {
      id: 'm3',
      sender: '1',
      text: 'Podemos agendar uma visita para amanhã?',
      time: '10:30',
      isRead: false,
    },
  ],
  '2': [
    {
      id: 'm1',
      sender: '2',
      text: 'Bom dia! Sou o proprietário do imóvel que você demonstrou interesse.',
      time: '09:00',
      isRead: true,
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'Bom dia Carlos! O imóvel já está disponível para visitação?',
      time: '09:10',
      isRead: true,
    },
    {
      id: 'm3',
      sender: '2',
      text: 'O imóvel já está disponível para visitação',
      time: '09:15',
      isRead: true,
    },
  ],
  '3': [
    {
      id: 'm1',
      sender: 'user',
      text: 'Olá Mariana, vi que você está interessada no apartamento do Centro',
      time: 'Ontem 15:30',
      isRead: true,
    },
    {
      id: 'm2',
      sender: '3',
      text: 'Gostaria de mais informações sobre o apartamento',
      time: 'Ontem 16:45',
      isRead: true,
    },
  ],
  '4': [
    {
      id: 'm1',
      sender: '4',
      text: 'Olá, aqui é o Paulo da Kubico Imóveis',
      time: 'Ontem 14:20',
      isRead: true,
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'Oi Paulo, poderia me enviar mais detalhes sobre o condomínio?',
      time: 'Ontem 14:30',
      isRead: true,
    },
    {
      id: 'm3',
      sender: '4',
      text: 'Enviando os detalhes do condomínio conforme solicitado',
      time: 'Ontem 14:45',
      isRead: false,
    },
  ],
  '5': [
    {
      id: 'm1',
      sender: '5',
      text: 'Recebemos seus documentos para análise',
      time: '23/05 09:00',
      isRead: true,
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'Obrigado Julia. Quando terei um retorno?',
      time: '23/05 09:15',
      isRead: true,
    },
    {
      id: 'm3',
      sender: '5',
      text: 'Os documentos foram aprovados!',
      time: '23/05 12:30',
      isRead: true,
    },
  ],
};

const Messages = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState(MOCK_CONTACTS);
  const [activeContact, setActiveContact] = useState<string | null>(null);
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [newMessage, setNewMessage] = useState('');

  const handleContactSelect = (contactId: string) => {
    setActiveContact(contactId);
    
    // Marcar mensagens como lidas ao selecionar o contato
    const updatedContacts = contacts.map(contact => 
      contact.id === contactId ? { ...contact, unread: 0 } : contact
    );
    
    setContacts(updatedContacts);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeContact) return;
    
    const messageId = `m${Date.now()}`;
    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newMessageObj = {
      id: messageId,
      sender: 'user',
      text: newMessage,
      time: timeString,
      isRead: true,
    };
    
    // Adicionar mensagem à conversa
    setConversations(prev => ({
      ...prev,
      [activeContact]: [...(prev[activeContact] || []), newMessageObj],
    }));
    
    // Atualizar último contato
    const updatedContacts = contacts.map(contact => 
      contact.id === activeContact ? {
        ...contact,
        lastMessage: newMessage,
        lastMessageTime: timeString,
      } : contact
    );
    
    setContacts(updatedContacts);
    setNewMessage('');
    
    // Simulação de resposta
    setTimeout(() => {
      const responseId = `m${Date.now()}`;
      const contact = contacts.find(c => c.id === activeContact);
      
      if (contact) {
        const responseMessages = [
          'Claro, vamos agendar!',
          'Entendi, vou verificar isso para você.',
          'Obrigado pela mensagem.',
          'Podemos conversar mais sobre isso amanhã?',
          'Vou enviar mais informações em breve.',
        ];
        
        const randomResponse = responseMessages[Math.floor(Math.random() * responseMessages.length)];
        const responseTime = `${now.getHours()}:${(now.getMinutes() + 1).toString().padStart(2, '0')}`;
        
        const responseObj = {
          id: responseId,
          sender: activeContact,
          text: randomResponse,
          time: responseTime,
          isRead: false,
        };
        
        setConversations(prev => ({
          ...prev,
          [activeContact]: [...prev[activeContact], responseObj],
        }));
        
        // Atualizar último contato
        const newUpdatedContacts = contacts.map(c => 
          c.id === activeContact ? {
            ...c,
            lastMessage: randomResponse,
            lastMessageTime: responseTime,
          } : c
        );
        
        setContacts(newUpdatedContacts);
        
        toast({
          title: `Nova mensagem de ${contact.name}`,
          description: randomResponse,
        });
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Mensagens</h1>
          
          <Card className="border-0 shadow-md h-[calc(100vh-220px)] min-h-[500px] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 h-full">
              <ChatSidebar 
                contacts={contacts}
                activeContactId={activeContact}
                onSelectContact={handleContactSelect}
              />
              
              <div className="col-span-2 border-l">
                {activeContact ? (
                  <ChatWindow
                    contact={contacts.find(c => c.id === activeContact)!}
                    messages={conversations[activeContact] || []}
                    newMessage={newMessage}
                    onNewMessageChange={(e) => setNewMessage(e.target.value)}
                    onSendMessage={handleSendMessage}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-50">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">Suas mensagens</h3>
                      <p className="text-gray-500 mt-1">Selecione um contato para iniciar uma conversa</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;
