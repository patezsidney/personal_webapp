import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCreditCard, CreditCardCreatePayload } from '@/services/credit-cards.service';
import { useToast } from '@/contexts/ToastContext';

export const useUpdateCreditCard = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CreditCardCreatePayload }) =>
      updateCreditCard(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-cards'] });
      showToast({
        title: 'Sucesso',
        description: 'Conta atualizada com sucesso.',
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
