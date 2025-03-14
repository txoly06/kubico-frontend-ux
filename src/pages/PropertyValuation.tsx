
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2, Calculator, Home, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PropertyValuationResult from '@/components/ui/PropertyValuationResult';

// Schema para validação do formulário
const valuationFormSchema = z.object({
  propertyType: z.string({
    required_error: "Selecione o tipo de imóvel",
  }),
  area: z.string().min(1, { message: "Informe a área do imóvel" }),
  bedrooms: z.string().min(1, { message: "Informe o número de quartos" }),
  bathrooms: z.string().min(1, { message: "Informe o número de banheiros" }),
  zipCode: z.string().min(8, { message: "CEP inválido" }),
  neighborhood: z.string().min(2, { message: "Informe o bairro" }),
  city: z.string().min(2, { message: "Informe a cidade" }),
  state: z.string().min(2, { message: "Informe o estado" }),
  condition: z.string({
    required_error: "Selecione a condição do imóvel",
  }),
  additionalInfo: z.string().optional(),
});

const PropertyValuation = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [valuationResult, setValuationResult] = useState<null | {
    estimatedValue: number;
    priceRange: { min: number; max: number };
    similarProperties: number;
    confidence: number;
  }>(null);
  
  const form = useForm<z.infer<typeof valuationFormSchema>>({
    resolver: zodResolver(valuationFormSchema),
    defaultValues: {
      propertyType: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      zipCode: "",
      neighborhood: "",
      city: "",
      state: "",
      condition: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof valuationFormSchema>) => {
    setIsSubmitting(true);
    
    // Simulação de envio - em uma app real, enviaríamos para uma API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Simulação de resultado da avaliação
    const mockResult = {
      estimatedValue: 850000,
      priceRange: { min: 780000, max: 920000 },
      similarProperties: 18,
      confidence: 85,
    };
    
    setValuationResult(mockResult);
    
    toast({
      title: "Avaliação realizada com sucesso!",
      description: "Os resultados estão disponíveis para visualização.",
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-10 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Avaliação de Imóveis</h1>
            <p className="text-kubico-gray-medium">
              Descubra o valor estimado do seu imóvel com base em dados de mercado.
            </p>
          </div>
          
          {!valuationResult ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Características do Imóvel</h3>
                        
                        <FormField
                          control={form.control}
                          name="propertyType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo de Imóvel</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo de imóvel" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="apartment">Apartamento</SelectItem>
                                  <SelectItem value="house">Casa</SelectItem>
                                  <SelectItem value="townhouse">Sobrado</SelectItem>
                                  <SelectItem value="land">Terreno</SelectItem>
                                  <SelectItem value="commercial">Comercial</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="area"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Área (m²)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="100" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="bedrooms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Quartos</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="3" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="bathrooms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Banheiros</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="2" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Localização</h3>
                        
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="neighborhood"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bairro</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nome do bairro" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cidade</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nome da cidade" {...field} />
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
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Informações Adicionais</h3>
                        
                        <FormField
                          control={form.control}
                          name="condition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Condição do Imóvel</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione a condição do imóvel" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="new">Novo</SelectItem>
                                  <SelectItem value="excellent">Excelente</SelectItem>
                                  <SelectItem value="good">Bom</SelectItem>
                                  <SelectItem value="fair">Regular</SelectItem>
                                  <SelectItem value="needs_renovation">Precisa de Reformas</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="additionalInfo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Informações Adicionais</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Descreva características importantes do imóvel (reformas recentes, móveis planejados, etc.)" 
                                  className="min-h-[100px]" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Detalhes adicionais que possam influenciar no valor do imóvel.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-kubico-blue hover:bg-kubico-blue/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Calculando...
                          </>
                        ) : (
                          <>
                            <Calculator className="mr-2 h-4 w-4" />
                            Calcular Avaliação
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
              
              <div>
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Como funciona a avaliação?</h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-kubico-blue/10 flex items-center justify-center flex-shrink-0">
                        <Home className="h-4 w-4 text-kubico-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">Dados do imóvel</h4>
                        <p className="text-sm text-kubico-gray-medium">
                          Forneça informações detalhadas sobre o seu imóvel para um resultado mais preciso.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-kubico-blue/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 w-4 text-kubico-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">Análise da localização</h4>
                        <p className="text-sm text-kubico-gray-medium">
                          Nosso sistema considera a região, infraestrutura e valorização do bairro.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-kubico-blue/10 flex items-center justify-center flex-shrink-0">
                        <Calculator className="h-4 w-4 text-kubico-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">Cálculo do valor</h4>
                        <p className="text-sm text-kubico-gray-medium">
                          Comparamos com imóveis similares e aplicamos algoritmos avançados para estimar o valor.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-kubico-blue/10 flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="h-4 w-4 text-kubico-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">Resultado detalhado</h4>
                        <p className="text-sm text-kubico-gray-medium">
                          Receba uma estimativa do valor atual com análise de mercado e potencial de valorização.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-kubico-blue/5 rounded-lg border border-kubico-blue/10">
                    <p className="text-sm text-kubico-gray-dark">
                      <strong>Nota:</strong> Esta é uma estimativa baseada em dados do mercado. Para uma avaliação oficial, 
                      recomendamos a contratação de um profissional especializado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <PropertyValuationResult result={valuationResult} onNewValuation={() => setValuationResult(null)} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyValuation;
