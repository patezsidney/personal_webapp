import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'bg-alt': 'var(--color-bg-alt)',
        fg: 'var(--color-fg)',
        muted: 'var(--color-muted)',

        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',

        secondary: 'var(--color-secondary)',
        'secondary-hover': 'var(--color-secondary-hover)',

        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',

        border: 'var(--color-border)',
        focus: 'var(--color-focus)',

        'disabled-bg': 'var(--color-disabled-bg)',
        'disabled-fg': 'var(--color-disabled-fg)',
      },
    },
  },
  plugins: [],
};

export default config;
