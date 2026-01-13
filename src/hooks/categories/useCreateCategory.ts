import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from '@/services/categories.service';
import { useToast } from '@/contexts/ToastContext';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      showToast({
        title: 'Sucesso',
        description: 'Categoria criada com sucesso.',
        type: 'success',
      });
    },
    onError: (error) => {
      showToast({
        title: 'Erro ao criar categoria',
        description: error.message,
        type: 'error',
      });
    },
  });
};
