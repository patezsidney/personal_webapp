import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCreditCard } from '@/services/credit-cards.service';
import { useToast } from '@/contexts/ToastContext';

export const useCreateCreditCard = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCreditCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-cards'] });
      showToast({
        title: 'Sucesso',
        description: 'Conta criada com sucesso.',
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
