import { api } from './api';

export interface AccountType {
  id: number;
  name: string;
  description?: string;
}

export const listAccountTypes = async () => {
  const { data } = await api.get<AccountType[]>('/api/account-types/');
  return data;
};
