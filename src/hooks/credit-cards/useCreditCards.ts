import { useQuery } from '@tanstack/react-query';
import { listCreditCards } from '@/services/credit-cards.service';

export const useCreditCards = () => {
  return useQuery({
    queryKey: ['credit-cards'],
    queryFn: listCreditCards,
  });
};
