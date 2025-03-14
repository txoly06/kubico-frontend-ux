
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  online: boolean;
}

interface ChatSidebarProps {
  contacts: Contact[];
  activeContactId: string | null;
  onSelectContact: (id: string) => void;
}

const ChatSidebar = ({ contacts, activeContactId, onSelectContact }: ChatSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredContacts = searchTerm 
    ? contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : contacts;
  
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Pesquisar contatos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {filteredContacts.length > 0 ? (
          filteredContacts.map(contact => (
            <div
              key={contact.id}
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${activeContactId === contact.id ? 'bg-gray-100' : ''}`}
              onClick={() => onSelectContact(contact.id)}
            >
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium line-clamp-1">{contact.name}</h3>
                      <p className="text-xs text-gray-500">{contact.role}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{contact.lastMessageTime}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-600 truncate max-w-[150px]">
                      {contact.lastMessage}
                    </p>
                    {contact.unread > 0 && (
                      <span className="bg-kubico-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            Nenhum contato encontrado
          </div>
        )}
      </div>
      
      <div className="p-3 border-t mt-auto">
        <button className="flex items-center justify-center w-full p-2 text-kubico-blue hover:bg-kubico-blue/10 rounded-lg transition-colors">
          <Plus className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">Nova Conversa</span>
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;
