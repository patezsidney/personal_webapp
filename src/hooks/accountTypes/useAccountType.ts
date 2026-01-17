import { useQuery } from '@tanstack/react-query';
import { listAccountTypes } from '@/services/account-types.service';

export const useAccountTypes = () => {
  return useQuery({
    queryKey: ['account-types'],
    queryFn: listAccountTypes,
  });
};
