import { api } from './api';

import { TransactionNature } from './transaction-natures.service';

export interface Category {
  id: string;
  name: string;
  description?: string;
  nature: TransactionNature;
  params?: {
    color?: string;
  };
}

export interface CategoryCreatePayload {
  name: string;
  description?: string;
  natureId: number;
  params?: {
    color?: string;
  };
}

export const listCategories = async (): Promise<Category[]> => {
  const { data } = await api.get('/api/categories/');
  return data;
};

export const createCategory = async (payload: CategoryCreatePayload): Promise<Category> => {
  const { data } = await api.post('/api/categories/', {
    name: payload.name,
    description: payload.description,
    nature_id: payload.natureId,
    params: JSON.stringify(payload.params),
  });
  return data;
};

export const updateCategory = async (
  id: string,
  payload: CategoryCreatePayload,
): Promise<Category> => {
  const { data } = await api.put(`/api/categories/${id}/`, {
    name: payload.name,
    description: payload.description,
    nature_id: payload.natureId,
    params: JSON.stringify(payload.params),
  });
  return data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/api/categories/${id}/`);
};
