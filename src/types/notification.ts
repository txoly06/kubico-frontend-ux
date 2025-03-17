
export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type NotificationCategory = 'all' | 'messages' | 'properties' | 'contracts';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: NotificationType;
  category: NotificationCategory;
  link?: string;
}
