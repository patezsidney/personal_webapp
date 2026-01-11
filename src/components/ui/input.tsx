'use client';

import { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsx(
        'w-full rounded border border-border bg-bg-alt px-3 py-2 text-sm text-fg',
        'placeholder:text-muted',
        'focus:outline-none focus:ring-2 focus:ring-focus',
      )}
    />
  );
}
