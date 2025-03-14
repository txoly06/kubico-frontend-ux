
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import ChatSidebar from '@/components/ui/ChatSidebar';
import ChatWindow from '@/components/ui/ChatWindow';

// Sample data
interface Contact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  online: boolean;
  lastSeen?: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'contact';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

const CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Maria Silva',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    role: 'Corretora',
    lastMessage: 'Podemos marcar uma visita no final da semana?',
    lastMessageTime: '10:42',
    unread: 1,
    online: true,
  },
  {
    id: '2',
    name: 'João Oliveira',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'Cliente',
    lastMessage: 'Obrigado pelas informações sobre o imóvel',
    lastMessageTime: 'Ontem',
    unread: 0,
    online: false,
    lastSeen: 'há 3 horas',
  },
  {
    id: '3',
    name: 'Ana Carvalho',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Proprietária',
    lastMessage: 'Quando podemos agendar a avaliação?',
    lastMessageTime: 'Ontem',
    unread: 0,
    online: true,
  },
  {
    id: '4',
    name: 'Carlos Santos',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    role: 'Arquiteto',
    lastMessage: 'Estou disponível para avaliar a reforma',
    lastMessageTime: 'Seg',
    unread: 0,
    online: false,
    lastSeen: 'há 1 dia',
  },
  {
    id: '5',
    name: 'Fernanda Lima',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    role: 'Advogada Imobiliária',
    lastMessage: 'Enviei o contrato por email',
    lastMessageTime: 'Dom',
    unread: 0,
    online: false,
    lastSeen: 'há 5 dias',
  },
];

// Sample conversation starters for auto-replies
const CONVERSATION_STARTERS = [
  "Olá! Como posso ajudar com sua busca por imóveis hoje?",
  "Temos algumas novas listagens que podem te interessar. Gostaria de saber mais?",
  "Entendi sua necessidade. Posso sugerir algumas opções que se encaixam no seu perfil.",
  "Estou verificando a disponibilidade do imóvel. Aguarde um momento, por favor.",
  "Claro, podemos agendar uma visita. Qual seria o melhor horário para você?",
  "O proprietário está aberto a negociações no valor. Você gostaria de fazer uma contraproposta?",
  "Acabei de receber a documentação. Está tudo em ordem para prosseguirmos.",
  "Excelente escolha! Este imóvel tem uma localização privilegiada."
];

// Generate a random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

const Messages: React.FC = () => {
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contact[]>(CONTACTS);
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const { toast } = useToast();

  // Initialize conversations with sample data
  useEffect(() => {
    const initialConversations: Record<string, Message[]> = {};
    
    CONTACTS.forEach(contact => {
      const numberOfMessages = Math.floor(Math.random() * 5) + 1;
      const messages: Message[] = [];
      
      // Add a welcome message from the contact
      messages.push({
        id: generateId(),
        content: CONVERSATION_STARTERS[Math.floor(Math.random() * CONVERSATION_STARTERS.length)],
        sender: 'contact',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        status: 'read'
      });
      
      // Add some previous conversation
      for (let i = 0; i < numberOfMessages; i++) {
        const isUser = i % 2 === 0;
        const hoursAgo = (numberOfMessages - i) * 2;
        
        messages.push({
          id: generateId(),
          content: isUser 
            ? `Olá, estou interessado em saber mais sobre os imóveis disponíveis em ${['Copacabana', 'Ipanema', 'Leblon', 'Botafogo', 'Flamengo'][Math.floor(Math.random() * 5)]}.`
            : CONVERSATION_STARTERS[Math.floor(Math.random() * CONVERSATION_STARTERS.length)],
          sender: isUser ? 'user' : 'contact',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * hoursAgo),
          status: 'read'
        });
      }
      
      initialConversations[contact.id] = messages;
    });
    
    setConversations(initialConversations);
  }, []);

  const handleSelectContact = (contactId: string) => {
    setActiveContactId(contactId);
    
    // Mark messages as read
    setContacts(prev => 
      prev.map(contact => 
        contact.id === contactId 
          ? { ...contact, unread: 0 }
          : contact
      )
    );
  };

  const handleSendMessage = (content: string) => {
    if (!activeContactId) return;
    
    // Add user message
    const newMessage: Message = {
      id: generateId(),
      content,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };
    
    setConversations(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMessage]
    }));
    
    // Update contact's last message
    setContacts(prev => 
      prev.map(contact => 
        contact.id === activeContactId 
          ? { 
              ...contact, 
              lastMessage: content,
              lastMessageTime: 'Agora'
            }
          : contact
      )
    );
    
    // Simulate message being delivered after 1 second
    setTimeout(() => {
      setConversations(prev => ({
        ...prev,
        [activeContactId]: prev[activeContactId].map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      }));
      
      // Simulate message being read after 2 seconds
      setTimeout(() => {
        setConversations(prev => ({
          ...prev,
          [activeContactId]: prev[activeContactId].map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: 'read' }
              : msg
          )
        }));
        
        // Simulate reply after 3 seconds
        setTimeout(() => {
          const replyContent = CONVERSATION_STARTERS[Math.floor(Math.random() * CONVERSATION_STARTERS.length)];
          
          const replyMessage: Message = {
            id: generateId(),
            content: replyContent,
            sender: 'contact',
            timestamp: new Date(),
            status: 'read'
          };
          
          setConversations(prev => ({
            ...prev,
            [activeContactId]: [...prev[activeContactId], replyMessage]
          }));
          
          // Update contact's last message
          setContacts(prev => 
            prev.map(contact => 
              contact.id === activeContactId 
                ? { 
                    ...contact, 
                    lastMessage: replyContent,
                    lastMessageTime: 'Agora'
                  }
                : contact
            )
          );
          
          // Show notification if contact is not active
          if (document.visibilityState === 'hidden' || !activeContactId) {
            toast({
              title: `Nova mensagem de ${CONTACTS.find(c => c.id === activeContactId)?.name}`,
              description: replyContent,
              duration: 5000,
            });
          }
        }, 3000);
      }, 2000);
    }, 1000);
  };

  const activeContact = activeContactId 
    ? contacts.find(contact => contact.id === activeContactId) || null
    : null;
    
  const activeMessages = activeContactId 
    ? conversations[activeContactId] || []
    : [];

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex overflow-hidden">
        <div className="w-1/3 border-r h-full">
          <ChatSidebar
            contacts={contacts}
            activeContactId={activeContactId}
            onSelectContact={handleSelectContact}
          />
        </div>
        <div className="w-2/3 h-full">
          <ChatWindow
            contact={activeContact}
            messages={activeMessages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;
