import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import ChatSidebar from '@/components/ui/ChatSidebar';
import ChatWindow from '@/components/ui/ChatWindow';
import { useIsMobile } from '@/hooks/use-mobile';

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
  isTyping?: boolean;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'contact';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image';
  imageUrl?: string;
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

// Array of sample image URLs
const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBhcnRtZW50fGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGludGVyaW9yfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG91c2VzfGVufDB8fDB8fHww"
];

// Generate a random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

const Messages: React.FC = () => {
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contact[]>(CONTACTS);
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const { toast } = useToast();
  const isMobile = useIsMobile();

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
      
      // Add some previous conversation including an image
      for (let i = 0; i < numberOfMessages; i++) {
        const isUser = i % 2 === 0;
        const hoursAgo = (numberOfMessages - i) * 2;
        const isImage = Math.random() > 0.7; // 30% chance of being an image
        
        if (isImage) {
          messages.push({
            id: generateId(),
            content: '',
            sender: isUser ? 'user' : 'contact',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * hoursAgo),
            status: 'read',
            type: 'image',
            imageUrl: SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)]
          });
        } else {
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

  const handleSendMessage = (content: string, type: 'text' | 'image' = 'text', imageUrl?: string) => {
    if (!activeContactId) return;
    
    // Add user message
    const newMessage: Message = {
      id: generateId(),
      content,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
      ...(type === 'image' && { type: 'image', imageUrl })
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
              lastMessage: type === 'image' ? '📷 Imagem' : content,
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
        
        // Show typing indicator
        setContacts(prev => 
          prev.map(contact => 
            contact.id === activeContactId 
              ? { ...contact, isTyping: true }
              : contact
          )
        );
        
        // Simulate reply after 3-5 seconds
        const replyDelay = 3000 + Math.random() * 2000;
        setTimeout(() => {
          // Remove typing indicator
          setContacts(prev => 
            prev.map(contact => 
              contact.id === activeContactId 
                ? { ...contact, isTyping: false }
                : contact
            )
          );
          
          // Determine if reply is text or image (20% chance of image)
          const isImageReply = Math.random() > 0.8;
          
          let replyMessage: Message;
          
          if (isImageReply) {
            // Image reply
            const randomImageUrl = SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)];
            
            replyMessage = {
              id: generateId(),
              content: '',
              sender: 'contact',
              timestamp: new Date(),
              status: 'read',
              type: 'image',
              imageUrl: randomImageUrl
            };
            
            // Update contact's last message
            setContacts(prev => 
              prev.map(contact => 
                contact.id === activeContactId 
                  ? { 
                      ...contact, 
                      lastMessage: '📷 Imagem',
                      lastMessageTime: 'Agora'
                    }
                  : contact
              )
            );
          } else {
            // Text reply
            const replyContent = CONVERSATION_STARTERS[Math.floor(Math.random() * CONVERSATION_STARTERS.length)];
            
            replyMessage = {
              id: generateId(),
              content: replyContent,
              sender: 'contact',
              timestamp: new Date(),
              status: 'read'
            };
            
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
          }
          
          // Add the reply message to conversation
          setConversations(prev => ({
            ...prev,
            [activeContactId]: [...prev[activeContactId], replyMessage]
          }));
          
          // Show notification if contact is not active
          if (document.visibilityState === 'hidden' || !activeContactId) {
            toast({
              title: `Nova mensagem de ${contacts.find(c => c.id === activeContactId)?.name}`,
              description: replyMessage.type === 'image' ? '📷 Enviou uma imagem' : replyMessage.content,
              duration: 5000,
            });
          }
        }, replyDelay);
      }, 2000);
    }, 1000);
  };

  const handleBackToContacts = () => {
    setActiveContactId(null);
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
        {isMobile ? (
          // Mobile view
          activeContactId ? (
            <div className="w-full h-full">
              <ChatWindow
                contact={activeContact}
                messages={activeMessages}
                onSendMessage={handleSendMessage}
                onBack={handleBackToContacts}
                isMobileView
              />
            </div>
          ) : (
            <div className="w-full h-full">
              <ChatSidebar
                contacts={contacts}
                activeContactId={activeContactId}
                onSelectContact={handleSelectContact}
              />
            </div>
          )
        ) : (
          // Desktop view
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;
