'use client';

import { ReactNode, useState } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Toast.Provider swipeDirection="right">{children}</Toast.Provider>
    </QueryClientProvider>
  );
}
