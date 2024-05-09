export interface Message {
    type: 'user' | 'host';
    content: string;
    userId?: string;
  }
  