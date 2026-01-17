import { api } from './api';

export interface PaymentType {
  id: number;
  name: string;
  description?: string;
}

export const listPaymentTypes = async () => {
  const { data } = await api.get<PaymentType[]>('/api/payment-types/');
  return data;
};
