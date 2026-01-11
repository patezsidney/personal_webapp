import { ReactNode } from 'react';
import { Providers } from './providers';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <Theme appearance="dark" accentColor="purple">
          <Providers>{children}</Providers>
        </Theme>
      </body>
    </html>
  );
}
