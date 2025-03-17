import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  File, 
  FileImage, 
  FileSpreadsheet, 
  X, 
  Lock,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import EmptyState from './EmptyState';

type DocumentType = 'pdf' | 'image' | 'sheet' | 'other';

interface Document {
  id: string;
  name: string;
  type: DocumentType;
  fileUrl: string;
  fileSize: string;
  restricted: boolean;
  updatedAt: string;
}

interface PropertyDocumentsProps {
  propertyId: string;
  isOwner?: boolean;
}

const PropertyDocuments: React.FC<PropertyDocumentsProps> = ({ propertyId, isOwner = false }) => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Certidão de Matrícula.pdf',
      type: 'pdf',
      fileUrl: 'https://example.com/documents/matricula.pdf',
      fileSize: '1.2 MB',
      restricted: false,
      updatedAt: '2023-05-10'
    },
    {
      id: '2',
      name: 'Planta Baixa.pdf',
      type: 'pdf',
      fileUrl: 'https://example.com/documents/planta.pdf',
      fileSize: '3.8 MB',
      restricted: false,
      updatedAt: '2023-05-15'
    },
    {
      id: '3',
      name: 'Laudo de Avaliação.pdf',
      type: 'pdf',
      fileUrl: 'https://example.com/documents/laudo.pdf',
      fileSize: '2.4 MB',
      restricted: true,
      updatedAt: '2023-06-01'
    },
    {
      id: '4',
      name: 'Fotos Adicionais.zip',
      type: 'image',
      fileUrl: 'https://example.com/documents/fotos.zip',
      fileSize: '15.7 MB',
      restricted: false,
      updatedAt: '2023-06-10'
    },
    {
      id: '5',
      name: 'Relatório Financeiro.xlsx',
      type: 'sheet',
      fileUrl: 'https://example.com/documents/financeiro.xlsx',
      fileSize: '1.8 MB',
      restricted: true,
      updatedAt: '2023-06-15'
    }
  ]);
  
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  
  const getDocumentIcon = (type: DocumentType) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'image':
        return <FileImage className="h-6 w-6 text-blue-500" />;
      case 'sheet':
        return <FileSpreadsheet className="h-6 w-6 text-green-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };
  
  const handleDownload = (document: Document) => {
    console.log(`Downloading ${document.name}`);
    
    toast({
      title: "Download iniciado",
      description: `O documento ${document.name} começará a ser baixado em instantes.`,
    });
  };
  
  const handlePreview = (document: Document) => {
    if (document.restricted && !isOwner) {
      toast({
        title: "Acesso restrito",
        description: "Este documento só pode ser visualizado pelo proprietário ou por usuários autorizados.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedDocument(document);
  };
  
  const handleRequestAccess = (document: Document) => {
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de acesso ao documento foi enviada. Entraremos em contato em breve.",
    });
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Documentos do Imóvel</h2>
        
        {isOwner && (
          <Button variant="outline" size="sm" className="text-sm">
            <FileText className="h-4 w-4 mr-2" />
            Gerenciar Documentos
          </Button>
        )}
      </div>
      
      {documents.length > 0 ? (
        <ScrollArea className="h-[320px] rounded-md border">
          <div className="p-4">
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    {getDocumentIcon(doc.type)}
                    <div className="ml-3">
                      <div className="flex items-center">
                        <h3 className="font-medium text-sm">{doc.name}</h3>
                        {doc.restricted && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="ml-2">
                                  <Lock className="h-3 w-3 text-amber-500" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Acesso restrito</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-kubico-gray-medium">{doc.fileSize}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-xs text-kubico-gray-medium">
                          Atualizado em {new Date(doc.updatedAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    {doc.restricted && !isOwner ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => handleRequestAccess(doc)}
                      >
                        Solicitar Acesso
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePreview(doc)}
                          className="h-8 w-8"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownload(doc)}
                          className="h-8 w-8"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      ) : (
        <EmptyState 
          type="documents" 
          ctaAction={() => {
            toast({
              title: "Solicitação enviada",
              description: "Sua solicitação de documentos foi enviada. Entraremos em contato em breve.",
            });
          }}
        />
      )}
      
      {selectedDocument && (
        <Dialog open={!!selectedDocument} onOpenChange={(open) => !open && setSelectedDocument(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center">
                  {getDocumentIcon(selectedDocument.type)}
                  <span className="ml-2">{selectedDocument.name}</span>
                </div>
              </DialogTitle>
              <DialogDescription>
                <div className="flex justify-between">
                  <span>Tamanho: {selectedDocument.fileSize}</span>
                  <span>
                    Atualizado em {new Date(selectedDocument.updatedAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="h-[60vh] bg-gray-100 rounded flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-16 w-16 text-kubico-gray-medium mx-auto mb-4" />
                <p className="text-kubico-gray-dark">
                  Visualização de documento em {selectedDocument.type.toUpperCase()}
                </p>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(selectedDocument)}
                    className="mr-2"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Baixar
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => window.open(selectedDocument.fileUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Abrir em nova aba
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PropertyDocuments;
