import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAccount } from '@/services/accounts.service';
import { useToast } from '@/contexts/ToastContext';

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] }).then(() => {});
      showToast({
        title: 'Sucesso',
        description: 'Conta excluída com sucesso.',
        type: 'success',
      });
    },
    onError: (error) => {
      showToast({
        title: 'Erro ao excluir conta',
        description: error.message,
        type: 'error',
      });
    },
  });
};
