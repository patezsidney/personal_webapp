import { useQuery } from '@tanstack/react-query';
import { listAccounts } from '@/services/accounts.service';

export const useAccounts = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: listAccounts,
  });
};
