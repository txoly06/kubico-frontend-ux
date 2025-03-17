
import { Notification } from '@/types/notification';

// Dados de exemplo para as notificações
export const sampleNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'Nova mensagem',
    message: 'Maria enviou uma mensagem sobre o apartamento em Copacabana.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutos atrás
    read: false,
    type: 'info',
    category: 'messages',
    link: '/messages'
  },
  {
    id: 'n2',
    title: 'Contrato assinado',
    message: 'O contrato CT001 foi assinado por todas as partes.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
    read: false,
    type: 'success',
    category: 'contracts',
    link: '/contracts'
  },
  {
    id: 'n3',
    title: 'Visita agendada',
    message: 'Carlos agendou uma visita para amanhã às 14h no imóvel da Av. Paulista.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    read: true,
    type: 'info',
    category: 'properties',
    link: '/properties/2'
  },
  {
    id: 'n4',
    title: 'Documento pendente',
    message: 'O contrato de aluguel está aguardando sua assinatura.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 horas atrás
    read: true,
    type: 'warning',
    category: 'contracts',
    link: '/contracts'
  },
  {
    id: 'n5',
    title: 'Contrato rejeitado',
    message: 'Roberto rejeitou o contrato de compra e venda da cobertura.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
    read: true,
    type: 'error',
    category: 'contracts',
    link: '/contracts'
  },
  {
    id: 'n6',
    title: 'Imóvel em destaque',
    message: 'Seu imóvel em Moema foi destacado na plataforma.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 dias atrás
    read: true,
    type: 'success',
    category: 'properties',
    link: '/properties/3'
  },
];
