import { api } from '@/services/api';

export interface CreditCard {
  id: number;
  issuer: string;
  limit: string;
  closing_day: number;
  due_day: number;
  is_store_card: boolean;
  active: boolean;
  account: number;
}

export interface CreditCardCreatePayload {
  issuer: string;
  limit: string;
  closingDay: number;
  dueDay: number;
  isStoreCard: boolean;
  active: boolean;
  accountId?: number;
}

export const listCreditCards = async () => {
  const { data } = await api.get<CreditCard[]>('/api/credit-cards/');
  return data;
};

export const createCreditCard = async (payload: CreditCardCreatePayload) => {
  const { data } = await api.post('/api/credit-cards/', {
    issuer: payload.issuer,
    limit: payload.limit,
    closing_day: payload.closingDay,
    due_day: payload.dueDay,
    is_store_card: payload.isStoreCard,
    active: payload.active,
    account_id: payload.accountId,
  });
  return data;
};

export const deleteCreditCard = async (id: number) => {
  await api.delete(`/api/credit-cards/${id}/`);
};

export const updateCreditCard = async (id: number, payload: CreditCardCreatePayload) => {
  const { data } = await api.put(`/api/credit-cards/${id}/`, {
    issuer: payload.issuer,
    limit: payload.limit,
    closing_day: payload.closingDay,
    due_day: payload.dueDay,
    is_store_card: payload.isStoreCard,
    active: payload.active,
    account_id: payload.accountId,
  });
  return data;
};
