
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface ClientFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (client: ClientFormData) => void;
  editClient?: ClientFormData;
}

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'lead' | 'inactive';
  interests: string[];
}

const ClientFormDialog: React.FC<ClientFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  editClient
}) => {
  const [formData, setFormData] = useState<ClientFormData>(
    editClient || {
      name: '',
      email: '',
      phone: '',
      status: 'lead',
      interests: []
    }
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleInterestChange = (interest: string) => {
    const interests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    
    setFormData({ ...formData, interests });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validações básicas
      if (!formData.name.trim()) {
        toast.error("O nome do cliente é obrigatório");
        return;
      }
      
      if (!formData.email.trim() || !formData.email.includes('@')) {
        toast.error("Email inválido");
        return;
      }
      
      if (!formData.phone.trim()) {
        toast.error("O telefone do cliente é obrigatório");
        return;
      }
      
      // Simulação de envio para API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit(formData);
      toast.success(editClient ? "Cliente atualizado com sucesso!" : "Cliente cadastrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar cliente");
      console.error("Erro ao salvar cliente:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editClient ? 'Editar Cliente' : 'Adicionar Novo Cliente'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome do cliente"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="cliente@email.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange('status', value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Interesses</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="interest-apartment" 
                  checked={formData.interests.includes('Apartamento')}
                  onCheckedChange={() => handleInterestChange('Apartamento')}
                />
                <Label htmlFor="interest-apartment" className="text-sm">Apartamento</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="interest-house" 
                  checked={formData.interests.includes('Casa')}
                  onCheckedChange={() => handleInterestChange('Casa')}
                />
                <Label htmlFor="interest-house" className="text-sm">Casa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="interest-commercial" 
                  checked={formData.interests.includes('Comercial')}
                  onCheckedChange={() => handleInterestChange('Comercial')}
                />
                <Label htmlFor="interest-commercial" className="text-sm">Comercial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="interest-land" 
                  checked={formData.interests.includes('Terreno')}
                  onCheckedChange={() => handleInterestChange('Terreno')}
                />
                <Label htmlFor="interest-land" className="text-sm">Terreno</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="interest-buy" 
                  checked={formData.interests.includes('Compra')}
                  onCheckedChange={() => handleInterestChange('Compra')}
                />
                <Label htmlFor="interest-buy" className="text-sm">Compra</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="interest-rent" 
                  checked={formData.interests.includes('Aluguel')}
                  onCheckedChange={() => handleInterestChange('Aluguel')}
                />
                <Label htmlFor="interest-rent" className="text-sm">Aluguel</Label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-kubico-blue hover:bg-kubico-blue/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : editClient ? 'Atualizar Cliente' : 'Adicionar Cliente'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientFormDialog;
