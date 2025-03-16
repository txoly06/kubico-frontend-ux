
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Sector, Tooltip, XAxis, YAxis } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, TrendingDown, Users, Home, Eye, Clock, HelpCircle } from 'lucide-react';

// Demo data
const viewsData = [
  { name: 'Jan', views: 1200 },
  { name: 'Fev', views: 1900 },
  { name: 'Mar', views: 1700 },
  { name: 'Abr', views: 2100 },
  { name: 'Mai', views: 2500 },
  { name: 'Jun', views: 3000 },
  { name: 'Jul', views: 2800 },
];

const leadsData = [
  { name: 'Jan', leads: 35 },
  { name: 'Fev', views: 42 },
  { name: 'Mar', leads: 38 },
  { name: 'Abr', leads: 54 },
  { name: 'Mai', leads: 68 },
  { name: 'Jun', leads: 89 },
  { name: 'Jul', leads: 76 },
];

const conversionsData = [
  { name: 'Jan', conversions: 8 },
  { name: 'Fev', conversions: 12 },
  { name: 'Mar', conversions: 9 },
  { name: 'Abr', conversions: 15 },
  { name: 'Mai', conversions: 22 },
  { name: 'Jun', conversions: 28 },
  { name: 'Jul', conversions: 19 },
];

const sourceData = [
  { name: 'Pesquisa Orgânica', value: 45 },
  { name: 'Redes Sociais', value: 25 },
  { name: 'Email', value: 15 },
  { name: 'Direto', value: 10 },
  { name: 'Referência', value: 5 },
];

const deviceData = [
  { name: 'Mobile', value: 65 },
  { name: 'Desktop', value: 30 },
  { name: 'Tablet', value: 5 },
];

interface DashboardAnalyticsProps {
  userType: 'regular' | 'premium' | 'agent' | 'admin';
}

const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({ userType }) => {
  const isPremiumOrAbove = userType === 'premium' || userType === 'agent' || userType === 'admin';
  const isAgentOrAdmin = userType === 'agent' || userType === 'admin';
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Análise de Desempenho</h2>
          <p className="text-kubico-gray-dark">
            {isPremiumOrAbove 
              ? 'Acompanhe o desempenho dos seus anúncios de imóveis e estatísticas de visitas' 
              : 'Visão geral da sua atividade na plataforma'}
          </p>
        </div>
        
        {isPremiumOrAbove && (
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar PDF
            </Button>
            <Button className="bg-kubico-blue hover:bg-kubico-blue/90 flex items-center gap-2">
              Últimos 30 dias <Clock className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-kubico-gray-dark text-sm font-medium">Total de Visualizações</p>
                <h3 className="text-3xl font-bold mt-1">15,284</h3>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+12.5% este mês</span>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Eye className="h-6 w-6 text-kubico-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-kubico-gray-dark text-sm font-medium">Leads Gerados</p>
                <h3 className="text-3xl font-bold mt-1">402</h3>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+8.3% este mês</span>
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-kubico-gray-dark text-sm font-medium">Taxa de Conversão</p>
                <h3 className="text-3xl font-bold mt-1">2.63%</h3>
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  <span>-1.2% este mês</span>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-kubico-gray-dark text-sm font-medium">Imóveis Ativos</p>
                <h3 className="text-3xl font-bold mt-1">8</h3>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+2 este mês</span>
                </div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <Home className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho ao Longo do Tempo</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="views">
            <TabsList>
              <TabsTrigger value="views">Visualizações</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="conversions">Conversões</TabsTrigger>
            </TabsList>
            
            <TabsContent value="views" className="pt-4">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={viewsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="views" stroke="#3B82F6" fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="leads" className="pt-4">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={leadsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Line type="monotone" dataKey="leads" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="conversions" className="pt-4">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={conversionsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Bar dataKey="conversions" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {isPremiumOrAbove && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Fontes de Tráfego</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {sourceData.map((entry, index) => (
                        <Sector
                          key={`cell-${index}`}
                          fill={[
                            '#3B82F6',
                            '#F59E0B',
                            '#10B981',
                            '#8B5CF6',
                            '#EC4899'
                          ][index % 5]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Dispositivos Utilizados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {deviceData.map((entry, index) => (
                        <Sector
                          key={`cell-${index}`}
                          fill={[
                            '#3B82F6',
                            '#F59E0B',
                            '#10B981'
                          ][index % 3]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Upgrade Card - only for regular users */}
      {userType === 'regular' && (
        <Card className="bg-gradient-to-r from-kubico-blue to-blue-700 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Atualize para o Plano Premium</h3>
                <p className="text-blue-100 mb-3">
                  Desbloqueie todas as estatísticas avançadas, relatórios personalizados e mais recursos exclusivos.
                </p>
                <Button className="bg-white text-kubico-blue hover:bg-blue-50">
                  Conheça os benefícios Premium
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                  <HelpCircle className="h-12 w-12" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardAnalytics;
