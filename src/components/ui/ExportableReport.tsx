
import React, { useState } from 'react';
import { Calendar, Download, FileText, BarChart3, Filter, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";

interface ExportableReportProps {
  title: string;
  description?: string;
  reportType: 'properties' | 'leads' | 'contracts' | 'financial';
  children: React.ReactNode;
  className?: string;
}

const ExportableReport: React.FC<ExportableReportProps> = ({
  title,
  description,
  reportType,
  children,
  className
}) => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simular refresh dos dados
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Relatório atualizado",
        description: "Os dados do relatório foram atualizados com sucesso.",
      });
    }, 1500);
  };
  
  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    toast({
      title: `Exportação em ${format.toUpperCase()} iniciada`,
      description: "O arquivo será baixado em alguns instantes.",
    });
    
    // Em um ambiente real, aqui seria realizada a exportação efetiva
    setTimeout(() => {
      toast({
        title: "Exportação concluída",
        description: `Relatório exportado com sucesso em formato ${format.toUpperCase()}.`,
      });
    }, 2000);
  };
  
  const getDateRangeLabel = () => {
    switch (dateRange) {
      case '7d': return 'Últimos 7 dias';
      case '30d': return 'Últimos 30 dias';
      case '90d': return 'Últimos 90 dias';
      case '12m': return 'Últimos 12 meses';
      case 'ytd': return 'Ano até o momento';
      default: return 'Personalizado';
    }
  };
  
  const getReportIcon = () => {
    switch (reportType) {
      case 'properties': return <Home className="h-5 w-5" />;
      case 'leads': return <Users className="h-5 w-5" />;
      case 'contracts': return <FileText className="h-5 w-5" />;
      case 'financial': return <DollarSign className="h-5 w-5" />;
      default: return <BarChart3 className="h-5 w-5" />;
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
        <div className="space-y-1">
          <CardTitle className="flex items-center">
            {getReportIcon()}
            <span className="ml-2">{title}</span>
          </CardTitle>
          {description && (
            <p className="text-sm text-kubico-gray-medium">{description}</p>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select defaultValue={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder={getDateRangeLabel()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="12m">Últimos 12 meses</SelectItem>
              <SelectItem value="ytd">Ano até o momento</SelectItem>
              <SelectItem value="custom">Período personalizado</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="icon"
            className="h-10 w-10"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          
          <Select defaultValue="pdf" onValueChange={(format) => handleExport(format as 'pdf' | 'excel' | 'csv')}>
            <SelectTrigger className="w-full sm:w-[130px]">
              <Download className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Exportar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">Exportar PDF</SelectItem>
              <SelectItem value="excel">Exportar Excel</SelectItem>
              <SelectItem value="csv">Exportar CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

// Exportar também alguns ícones específicos para permitir uso direto
export const Home = (props: React.ComponentProps<typeof Home>) => <Home {...props} />;
export const Users = (props: React.ComponentProps<typeof Users>) => <Users {...props} />;
export const DollarSign = (props: React.ComponentProps<typeof DollarSign>) => <DollarSign {...props} />;

export default ExportableReport;
