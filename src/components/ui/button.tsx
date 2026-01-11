'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export function Button({ asChild, variant = 'primary', className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={clsx(
        'inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition',
        'focus:outline-none focus:ring-2 focus:ring-primary',
        {
          'bg-primary text-bg hover:opacity-90': variant === 'primary',
          'bg-secondary text-bg': variant === 'secondary',
          'bg-danger text-bg': variant === 'danger',
        },
        className,
      )}
      {...props}
    />
  );
}
