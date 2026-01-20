import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCreditCard } from '@/services/credit-cards.service';
import { useToast } from '@/contexts/ToastContext';

export const useDeleteCreditCard = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: deleteCreditCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-cards'] });
      showToast({
        title: 'Sucesso',
        description: 'Conta excluída com sucesso.',
        type: 'success',
      });
    },
    onError: (error) => {
      showToast({
        title: 'Erro',
        description: error.message,
        type: 'error',
      });
    },
  });
};
