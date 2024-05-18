export interface Message {
    type: 'user' | 'host' | 'robot';
    content: string;
    userId?: string;
    timestamp: number;
  }
  