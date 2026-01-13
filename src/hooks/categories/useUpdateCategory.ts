import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory } from '@/services/categories.service';
import { useToast } from '@/contexts/ToastContext';

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

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
      showToast({
        title: 'Sucesso',
        description: 'Categoria atualizada com sucesso.',
        type: 'success',
      });
    },
    onError: (error) => {
      showToast({
        title: 'Erro ao atualizar categoria',
        description: error.message,
        type: 'error',
      });
    },
  });
};
