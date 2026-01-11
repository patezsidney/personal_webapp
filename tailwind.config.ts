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
        secondary: 'var(--color-secondary)',

        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
    },
  },
  plugins: [],
};

export default config;
