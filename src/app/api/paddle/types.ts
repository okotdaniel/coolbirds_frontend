import { Subscription, Transaction } from '@paddle/paddle-node-sdk';

export  interface Subscription {
  subscriptionId: string;
  subscriptionStatus: string;
  priceId: string;
  productId: string;
  scheduledChange: string;
  customerId: string;
  customerEmail: string;
}

export interface SubscriptionResponse {
  data?: Subscription[];
  hasMore: boolean;
  totalRecords: number;
  error?: string;
}

export  interface TransactionResponse {
  data?: Transaction[];
  hasMore: boolean;
  totalRecords: number;
  error?: string;
}

export  interface SubscriptionDetailResponse {
  data?: Subscription;
  error?: string;
}
