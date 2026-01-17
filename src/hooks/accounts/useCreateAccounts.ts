import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAccount } from '@/services/accounts.service';
import { useToast } from '@/contexts/ToastContext';

export const useCreateAccounts = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] }).then(() => {});
      showToast({
        title: 'Sucesso',
        description: 'Conta criada com sucesso.',
        type: 'success',
      });
    },
    onError: (error) => {
      showToast({
        title: 'Erro ao criar conta',
        description: error.message,
        type: 'error',
      });
    },
  });
};
