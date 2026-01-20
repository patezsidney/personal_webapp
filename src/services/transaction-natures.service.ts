import { api } from './api';

export interface TransactionNature {
  id: number;
  name: string;
  description?: string;
}

export const listTransactionNatures = async () => {
  const { data } = await api.get<TransactionNature[]>('/api/transaction-natures/');
  return data;
};
