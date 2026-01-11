'use client';

import { ReactNode } from 'react';
import * as Toast from '@radix-ui/react-toast';

export function Providers({ children }: { children: ReactNode }) {
  return <Toast.Provider swipeDirection="right">{children}</Toast.Provider>;
}
