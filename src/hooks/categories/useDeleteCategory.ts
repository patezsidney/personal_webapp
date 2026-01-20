import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from '@/services/categories.service';
import { useToast } from '@/contexts/ToastContext';

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      showToast({
        title: 'Sucesso',
        description: 'Categoria excluída com sucesso.',
        type: 'success',
      });
    },
    onError: () => {
      showToast({
        title: 'Erro',
        description: 'Ocorreu um erro ao excluir a categoria.',
        type: 'error',
      });
    },
  });
};
