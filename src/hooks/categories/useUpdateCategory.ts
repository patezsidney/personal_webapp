import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory } from '@/services/categories.service';

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        name: string;
        natureId: number;
        params?: { color?: string };
      };
    }) => updateCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
