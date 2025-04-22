import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Building, 
  Edit, 
  EyeIcon, 
  Lock, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Settings as SettingsIcon, 
  Trash, 
  Unlock, 
  UserPlus 
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UserType } from '@/components/ui/UserDashboard';

interface AdminDashboardProps {
  activeTab: string;
  userType: UserType;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'client';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  avatar?: string;
}

interface Business {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  agents: number;
  properties: number;
  status: 'active' | 'inactive' | 'pending';
  logo?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ activeTab, userType }) => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Carlos Mendes',
      email: 'carlos.mendes@email.com',
      role: 'admin',
      status: 'active',
      lastLogin: '25/06/2023 10:30',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg'
    },
    {
      id: '2',
      name: 'João Oliveira',
      email: 'joao.oliveira@email.com',
      role: 'agent',
      status: 'active',
      lastLogin: '23/06/2023 14:15',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: '3',
      name: 'Ana Silva',
      email: 'ana.silva@email.com',
      role: 'client',
      status: 'active',
      lastLogin: '20/06/2023 16:45',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: '4',
      name: 'Mariana Costa',
      email: 'mariana.costa@email.com',
      role: 'agent',
      status: 'inactive',
      lastLogin: '15/06/2023 09:20',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    {
      id: '5',
      name: 'Paulo Rodrigues',
      email: 'paulo.rodrigues@email.com',
      role: 'client',
      status: 'pending',
      lastLogin: 'Nunca',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
    }
  ]);
  
  const [businesses, setBusinesses] = useState<Business[]>([
    {
      id: '1',
      name: 'Imobiliária Global',
      address: 'Av. Paulista, 1000, São Paulo - SP',
      phone: '(11) 5555-1234',
      email: 'contato@global.com',
      agents: 12,
      properties: 45,
      status: 'active',
      logo: 'https://via.placeholder.com/150?text=Global'
    },
    {
      id: '2',
      name: 'Imobiliária Horizonte',
      address: 'Rua Oscar Freire, 500, São Paulo - SP',
      phone: '(11) 5555-5678',
      email: 'contato@horizonte.com',
      agents: 8,
      properties: 32,
      status: 'active',
      logo: 'https://via.placeholder.com/150?text=Horizonte'
    },
    {
      id: '3',
      name: 'Imobiliária Future',
      address: 'Av. Brigadeiro Faria Lima, 1500, São Paulo - SP',
      phone: '(11) 5555-9012',
      email: 'contato@future.com',
      agents: 5,
      properties: 18,
      status: 'inactive',
      logo: 'https://via.placeholder.com/150?text=Future'
    },
    {
      id: '4',
      name: 'Imobiliária Premium',
      address: 'Av. Rebouças, 1200, São Paulo - SP',
      phone: '(11) 5555-3456',
      email: 'contato@premium.com',
      agents: 15,
      properties: 60,
      status: 'pending',
      logo: 'https://via.placeholder.com/150?text=Premium'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [businessDialogOpen, setBusinessDialogOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState('general');
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          business.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || business.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inativo</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Admin</Badge>;
      case 'agent':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Corretor</Badge>;
      case 'client':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cliente</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };
  
  if (activeTab === 'users') {
    return (
      <Card className="border border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gerenciamento de Usuários</CardTitle>
          <Button 
            className="bg-kubico-blue hover:bg-kubico-blue/90" 
            onClick={() => setUserDialogOpen(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Usuário
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
              value={roleFilter}
              onValueChange={setRoleFilter}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrar por papel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os papéis</SelectItem>
                <SelectItem value="admin">Administradores</SelectItem>
                <SelectItem value="agent">Corretores</SelectItem>
                <SelectItem value="client">Clientes</SelectItem>
              </SelectContent>
            </Select>
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
                <SelectItem value="inactive">Inativos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Papel</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Último Login</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" title="Editar">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {user.status === 'active' ? (
                          <Button variant="outline" size="icon" title="Bloquear">
                            <Lock className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="outline" size="icon" title="Desbloquear">
                            <Unlock className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="icon" title="Mais opções">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                      Nenhum usuário encontrado com os filtros atuais
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        
        <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Nome do usuário" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@exemplo.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Papel</Label>
                  <Select defaultValue="client">
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Selecione o papel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="agent">Corretor</SelectItem>
                      <SelectItem value="client">Cliente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha Temporária</Label>
                <Input id="password" type="password" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sendEmail" defaultChecked />
                <Label htmlFor="sendEmail">Enviar email com instruções de acesso</Label>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setUserDialogOpen(false)}>Cancelar</Button>
              <Button className="bg-kubico-blue hover:bg-kubico-blue/90">Adicionar Usuário</Button>
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    );
  }
  
  if (activeTab === 'business') {
    return (
      <Card className="border border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gerenciamento de Imobiliárias</CardTitle>
          <Button 
            className="bg-kubico-blue hover:bg-kubico-blue/90" 
            onClick={() => setBusinessDialogOpen(true)}
          >
            <Building className="mr-2 h-4 w-4" />
            Nova Imobiliária
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
                <SelectItem value="active">Ativas</SelectItem>
                <SelectItem value="inactive">Inativas</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imobiliária</TableHead>
                  <TableHead className="hidden md:table-cell">Contato</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Corretores</TableHead>
                  <TableHead className="hidden md:table-cell">Imóveis</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBusinesses.map((business) => (
                  <TableRow key={business.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center mr-2 overflow-hidden">
                          {business.logo ? (
                            <img src={business.logo} alt={business.name} className="w-full h-full object-cover" />
                          ) : (
                            <Briefcase className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{business.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-[200px]">{business.address}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="text-sm">{business.phone}</div>
                      <div className="text-sm text-gray-500">{business.email}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(business.status)}</TableCell>
                    <TableCell className="hidden md:table-cell text-center">{business.agents}</TableCell>
                    <TableCell className="hidden md:table-cell text-center">{business.properties}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" title="Ver detalhes">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" title="Editar">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {business.status === 'active' ? (
                          <Button variant="outline" size="icon" title="Desativar">
                            <Lock className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="outline" size="icon" title="Ativar">
                            <Unlock className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredBusinesses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      Nenhuma imobiliária encontrada com os filtros atuais
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        
        <Dialog open={businessDialogOpen} onOpenChange={setBusinessDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Imobiliária</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bizName">Nome da Imobiliária</Label>
                  <Input id="bizName" placeholder="Nome da empresa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bizEmail">Email</Label>
                  <Input id="bizEmail" type="email" placeholder="contato@empresa.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bizPhone">Telefone</Label>
                  <Input id="bizPhone" placeholder="(00) 0000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bizStatus">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger id="bizStatus">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativa</SelectItem>
                      <SelectItem value="inactive">Inativa</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bizAddress">Endereço</Label>
                <Input id="bizAddress" placeholder="Rua, número, cidade - estado" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bizLogo">Logo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                  <Plus className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 text-center mb-2">
                    Arraste uma imagem ou clique para fazer upload
                  </p>
                  <Button type="button" variant="outline" size="sm">
                    Selecionar Arquivo
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setBusinessDialogOpen(false)}>Cancelar</Button>
              <Button className="bg-kubico-blue hover:bg-kubico-blue/90">Adicionar Imobiliária</Button>
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    );
  }
  
  if (activeTab === 'settings') {
    return (
      <Card className="border border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <SettingsIcon className="mr-2 h-5 w-5" />
            Configurações da Plataforma
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" value={settingsTab} onValueChange={setSettingsTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="integrations">Integrações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="pt-6">
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Informações da Plataforma</h3>
                  <p className="text-sm text-gray-500">Configurações gerais do sistema</p>
                </div>
                
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="platformName">Nome da Plataforma</Label>
                      <Input id="platformName" defaultValue="Kubico Imobiliária" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">Email de Administração</Label>
                      <Input id="adminEmail" defaultValue="admin@kubico.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="supportPhone">Telefone de Suporte</Label>
                    <Input id="supportPhone" defaultValue="(11) 5555-0000" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço da Empresa</Label>
                    <Input id="address" defaultValue="Av. Paulista, 1000, São Paulo - SP" />
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <h4 className="font-medium">Modo de Manutenção</h4>
                      <p className="text-sm text-gray-500">Ativa o modo de manutenção no sistema</p>
                    </div>
                    <Switch id="maintenanceMode" />
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <h4 className="font-medium">Permitir Cadastros</h4>
                      <p className="text-sm text-gray-500">Permite que novos usuários se cadastrem</p>
                    </div>
                    <Switch id="allowRegistrations" defaultChecked />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-kubico-blue hover:bg-kubico-blue/90">
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="pt-6">
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Configurações de Segurança</h3>
                  <p className="text-sm text-gray-500">Ajuste as políticas de segurança da plataforma</p>
                </div>
                
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                      <p className="text-sm text-gray-500">Exige 2FA para contas administrativas</p>
                    </div>
                    <Switch id="require2fa" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <h4 className="font-medium">Login com Redes Sociais</h4>
                      <p className="text-sm text-gray-500">Permite login com Google e Facebook</p>
                    </div>
                    <Switch id="socialLogin" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <h4 className="font-medium">Bloqueio Após Tentativas</h4>
                      <p className="text-sm text-gray-500">Bloqueia contas após 5 tentativas de login inválidas</p>
                    </div>
                    <Switch id="loginAttempts" defaultChecked />
                  </div>
                  
                  <div className="space-y-2 border-t border-gray-100 pt-4">
                    <Label htmlFor="sessionTimeout">Tempo Limite da Sessão (minutos)</Label>
                    <Input id="sessionTimeout" type="number" defaultValue="60" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-kubico-blue hover:bg-kubico-blue/90">
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="pt-6">
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Configurações de Notificações</h3>
                  <p className="text-sm text-gray-500">Controle as notificações enviadas pelo sistema</p>
                </div>
                
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificações por Email</h4>
                      <p className="text-sm text-gray-500">Envia notificações do sistema por email</p>
                    </div>
                    <Switch id="emailNotifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <h4 className="font-medium">Notificações por SMS</h4>
                      <p className="text-sm text-gray-500">Envia notificações do sistema por SMS</p>
                    </div>
                    <Switch id="smsNotifications" />
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <h4 className="font-medium">Notificações Push</h4>
                      <p className="text-sm text-gray-500">Envia notificações push para aplicativos móveis</p>
                    </div>
                    <Switch id="pushNotifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <h4 className="font-medium">Newsletter</h4>
                      <p className="text-sm text-gray-500">Envia newsletter semanal com novidades</p>
                    </div>
                    <Switch id="newsletter" defaultChecked />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-kubico-blue hover:bg-kubico-blue/90">
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="integrations" className="pt-6">
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Integrações</h3>
                  <p className="text-sm text-gray-500">Configure integrações com serviços externos</p>
                </div>
                
                <div className="grid gap-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                        <img src="https://via.placeholder.com/40?text=G" alt="Google Maps" />
                      </div>
                      <div>
                        <h4 className="font-medium">Google Maps</h4>
                        <p className="text-sm text-gray-500">Integração para mapas de localização de imóveis</p>
                      </div>
                    </div>
                    <Switch id="googleMapsIntegration" defaultChecked />
                  </div>
                  
                  <div className="flex items-start justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-start space-x-3">
                      <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                        <img src="https://via.placeholder.com/40?text=S" alt="Stripe" />
                      </div>
                      <div>
                        <h4 className="font-medium">Stripe</h4>
                        <p className="text-sm text-gray-500">Processamento de pagamentos e assinaturas</p>
                      </div>
                    </div>
                    <Switch id="stripeIntegration" defaultChecked />
                  </div>
                  
                  <div className="flex items-start justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-start space-x-3">
                      <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                        <img src="https://via.placeholder.com/40?text=A" alt="Analytics" />
                      </div>
                      <div>
                        <h4 className="font-medium">Google Analytics</h4>
                        <p className="text-sm text-gray-500">Rastreamento de estat��sticas do site</p>
                      </div>
                    </div>
                    <Switch id="analyticsIntegration" defaultChecked />
                  </div>
                  
                  <div className="flex items-start justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-start space-x-3">
                      <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                        <img src="https://via.placeholder.com/40?text=M" alt="Mailchimp" />
                      </div>
                      <div>
                        <h4 className="font-medium">Mailchimp</h4>
                        <p className="text-sm text-gray-500">Marketing por email e automação</p>
                      </div>
                    </div>
                    <Switch id="mailchimpIntegration" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-kubico-blue hover:bg-kubico-blue/90">
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  }
  
  return null;
};

export default AdminDashboard;
