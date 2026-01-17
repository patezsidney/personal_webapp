import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAccount, AccountCreatePayload } from '@/services/accounts.service';
import { useToast } from '@/contexts/ToastContext';

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: AccountCreatePayload }) =>
      updateAccount(id, payload),
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
