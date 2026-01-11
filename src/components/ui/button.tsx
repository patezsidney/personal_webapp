'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export function Button({
  asChild,
  variant = 'primary',
  className,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      disabled={disabled}
      className={clsx(
        'inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium transition',
        'focus:outline-none focus:ring-2 focus:ring-focus',
        {
          'bg-primary text-bg hover:bg-primary-hover': variant === 'primary' && !disabled,
          'bg-secondary text-bg hover:bg-secondary-hover': variant === 'secondary' && !disabled,
          'bg-danger text-bg': variant === 'danger' && !disabled,
          'bg-disabled-bg text-disabled-fg cursor-not-allowed': disabled,
        },
        className,
      )}
      {...props}
    />
  );
}
