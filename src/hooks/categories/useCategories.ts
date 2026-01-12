import { useQuery } from '@tanstack/react-query';
import { listCategories } from '@/services/categories.service';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: listCategories,
  });
};
