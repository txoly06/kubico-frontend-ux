import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Edit, 
  MapPin, 
  MoreHorizontal, 
  Phone, 
  Plus, 
  Search, 
  Trash, 
  User 
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ClientFormDialog from '@/components/forms/ClientFormDialog';
import { Calendar } from '@/components/ui/calendar';
import { UserType } from '@/components/ui/UserDashboard';

interface AgentDashboardProps {
  activeTab: string;
  userType: UserType;
}

interface Appointment {
  id: string;
  title: string;
  date: Date;
  time: string;
  client: {
    name: string;
    avatar?: string;
  };
  address: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'lead' | 'inactive';
  interests: string[];
  lastContact: string;
  avatar?: string;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ activeTab, userType }) => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Roberto Almeida',
      email: 'roberto.almeida@email.com',
      phone: '(11) 98765-4321',
      status: 'active',
      interests: ['Apartamento', 'Compra'],
      lastContact: '21/06/2023',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
    },
    {
      id: '2',
      name: 'Camila Oliveira',
      email: 'camila.oliveira@email.com',
      phone: '(11) 91234-5678',
      status: 'lead',
      interests: ['Casa', 'Aluguel'],
      lastContact: '14/06/2023',
      avatar: 'https://randomuser.me/api/portraits/women/26.jpg'
    },
    {
      id: '3',
      name: 'Felipe Santos',
      email: 'felipe.santos@email.com',
      phone: '(11) 96543-2109',
      status: 'inactive',
      interests: ['Comercial', 'Compra'],
      lastContact: '05/05/2023',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
      id: '4',
      name: 'Luciana Costa',
      email: 'luciana.costa@email.com',
      phone: '(11) 99876-5432',
      status: 'active',
      interests: ['Apartamento', 'Casa', 'Compra'],
      lastContact: '18/06/2023',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
    },
    {
      id: '5',
      name: 'Gabriel Monteiro',
      email: 'gabriel.monteiro@email.com',
      phone: '(11) 92345-6789',
      status: 'lead',
      interests: ['Terreno', 'Compra'],
      lastContact: '10/06/2023',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
    }
  ]);
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Visita ao Apartamento',
      date: new Date(2023, 6, 15, 10, 0),
      time: '10:00',
      client: {
        name: 'Roberto Almeida',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
      },
      address: 'Av. Paulista, 1000, Apto 123',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Assinatura de Contrato',
      date: new Date(2023, 6, 16, 14, 30),
      time: '14:30',
      client: {
        name: 'Camila Oliveira',
        avatar: 'https://randomuser.me/api/portraits/women/26.jpg'
      },
      address: 'Escritório Central',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Visita Casa em Condomínio',
      date: new Date(2023, 6, 18, 16, 0),
      time: '16:00',
      client: {
        name: 'Luciana Costa',
        avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
      },
      address: 'Rua das Flores, 500, Condomínio Jardins',
      status: 'scheduled'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clientDialogOpen, setClientDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>;
      case 'lead':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Lead</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inativo</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Agendado</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Concluído</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const addNewClient = (client: Omit<Client, 'id'>) => {
    const newClient: Client = {
      ...client,
      id: `${clients.length + 1}`,
      lastContact: new Date().toLocaleDateString('pt-BR'),
    };
    setClients([...clients, newClient]);
    setClientDialogOpen(false);
  };
  
  const filteredAppointments = appointments.filter(appointment => {
    if (!selectedDate) return true;
    const appDate = new Date(appointment.date);
    return appDate.getDate() === selectedDate.getDate() &&
           appDate.getMonth() === selectedDate.getMonth() &&
           appDate.getFullYear() === selectedDate.getFullYear();
  });
  
  if (activeTab === 'clients') {
    return (
      <Card className="border border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Clientes e Leads</CardTitle>
          <Button 
            className="bg-kubico-blue hover:bg-kubico-blue/90" 
            onClick={() => setClientDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou email"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="lead">Leads</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Contato</TableHead>
                  <TableHead className="hidden md:table-cell">Interesses</TableHead>
                  <TableHead className="hidden md:table-cell">Último Contato</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={client.avatar} alt={client.name} />
                          <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell className="hidden md:table-cell">{client.phone}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {client.interests.map((interest, index) => (
                          <Badge key={index} variant="outline">{interest}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{client.lastContact}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredClients.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      Nenhum cliente encontrado com os filtros atuais
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        
        <ClientFormDialog 
          open={clientDialogOpen} 
          onClose={() => setClientDialogOpen(false)}
          onSubmit={addNewClient}
        />
      </Card>
    );
  }
  
  if (activeTab === 'calendar') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border border-gray-100">
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border w-full"
            />
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Resumo de Compromissos</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">Agendados: 3</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Concluídos: 0</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm">Cancelados: 0</span>
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-6 bg-kubico-blue hover:bg-kubico-blue/90">
              <Plus className="mr-2 h-4 w-4" />
              Novo Compromisso
            </Button>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2 border border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Compromissos</CardTitle>
              {selectedDate && (
                <p className="text-sm text-gray-500">
                  {selectedDate.toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {filteredAppointments.length > 0 ? (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 bg-white rounded p-2 mr-4">
                      <CalendarIcon className="h-6 w-6 text-kubico-blue mb-1" />
                      <span className="text-sm font-medium">{appointment.time}</span>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{appointment.title}</h4>
                        {getStatusBadge(appointment.status)}
                      </div>
                      
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          {appointment.client.name}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {appointment.address}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          {appointment.time}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                        <Trash className="h-3.5 w-3.5 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <CalendarIcon className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Sem compromissos para este dia</h3>
                <p className="text-gray-500 mb-4">Adicione um novo compromisso ou selecione outra data.</p>
                <Button className="bg-kubico-blue hover:bg-kubico-blue/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Compromisso
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return null;
};

export default AgentDashboard;
