import { useQuery } from '@tanstack/react-query';
import { listPaymentTypes } from '@/services/payment-types.service';

export const usePaymentTypes = () => {
  return useQuery({
    queryKey: ['payment-types'],
    queryFn: listPaymentTypes,
  });
};
