
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2, Save } from 'lucide-react';

// Schema de validação para o formulário de perfil
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(8, { message: "Telefone inválido" }),
  bio: z.string().optional(),
  address: z.string().min(5, { message: "Endereço inválido" }),
  city: z.string().min(2, { message: "Cidade inválida" }),
  state: z.string().min(2, { message: "Estado inválido" }),
  zipCode: z.string().min(5, { message: "CEP inválido" }),
});

// Dados de exemplo do usuário
const userData = {
  name: 'Ana Silva',
  email: 'ana.silva@email.com',
  phone: '(21) 98765-4321',
  bio: 'Profissional do mercado imobiliário com mais de 5 anos de experiência.',
  address: 'Rua das Palmeiras, 123',
  city: 'Rio de Janeiro',
  state: 'RJ',
  zipCode: '22000-000',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
};

const DashboardProfile = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: userData,
  });

  const onSubmit = async (data: z.infer<typeof profileFormSchema>) => {
    setIsSubmitting(true);
    
    // Simulação de envio - em uma app real, enviaríamos para uma API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mostrar notificação de sucesso
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram atualizadas com sucesso.",
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      {/* Seção de foto de perfil */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Foto de Perfil</h3>
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div>
            <Button variant="outline" size="sm" className="mb-2">
              Alterar foto
            </Button>
            <p className="text-sm text-kubico-gray-medium">
              Formatos permitidos: JPG, PNG. Tamanho máximo: 2MB
            </p>
          </div>
        </div>
      </div>
      
      {/* Formulário de informações pessoais */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu.email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biografia</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Conte um pouco sobre você" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Esta informação será exibida publicamente em seu perfil.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <h4 className="text-base font-medium mt-6 mb-2">Endereço</h4>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua e número</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua Exemplo, 123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Sua cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="UF" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input placeholder="00000-000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end mt-6">
              <Button 
                type="submit" 
                className="bg-kubico-blue hover:bg-kubico-blue/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DashboardProfile;
