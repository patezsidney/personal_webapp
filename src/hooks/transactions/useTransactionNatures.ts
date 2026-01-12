import { useQuery } from '@tanstack/react-query';
import { listTransactionNatures } from '@/services/transaction-natures.service';

export const useTransactionNatures = () => {
  return useQuery({
    queryKey: ['transaction-natures'],
    queryFn: listTransactionNatures,
  });
};
