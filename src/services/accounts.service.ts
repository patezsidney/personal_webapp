import { api } from './api';
import { AccountType } from './account-types.service';
import { PaymentType } from './payment-types.service';

export interface Account {
  id: number;
  account_type: AccountType;
  payment_types: PaymentType[];
  name: string;
  description?: string;
}

export interface AccountCreatePayload {
  name: string;
  description?: string;
  accountTypeId: number;
  paymentTypeIds: number[];
}

export const listAccounts = async () => {
  const { data } = await api.get<Account[]>('/api/accounts/');
  return data;
};

export const createAccount = async (payload: AccountCreatePayload) => {
  const { data } = await api.post('/api/accounts/', {
    name: payload.name,
    description: payload.description,
    account_type_id: payload.accountTypeId,
    payment_type_ids: payload.paymentTypeIds,
  });
  return data;
};

export const updateAccount = async (id: number, payload: AccountCreatePayload) => {
  const { data } = await api.put(`/api/accounts/${id}/`, {
    name: payload.name,
    description: payload.description,
    account_type_id: payload.accountTypeId,
    payment_type_ids: payload.paymentTypeIds,
  });
  return data;
};

export const deleteAccount = async (id: number) => {
  await api.delete(`/api/accounts/${id}/`);
};
