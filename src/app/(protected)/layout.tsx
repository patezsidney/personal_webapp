'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';

import { isAuthenticated, logout } from '@/services/auth';
import { Sidebar } from '@/components/layout/sidebar';
import { Box, Container, Flex } from '@radix-ui/themes';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState(isAuthenticated());

  useEffect(() => {
    if (!loggedUser) {
      router.replace('/login');
    }
  }, [router, loggedUser]);

  function handleLogout() {
    logout();
    setLoggedUser(false);
    router.replace('/');
  }

  return (
    <>
      <Flex direction="column" minHeight="100vh">
        <Box
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: 'var(--color-background)',
          }}
        >
          <Header loggedUser={loggedUser} handleLogout={handleLogout} />
        </Box>
        <Flex style={{ flex: 1, alignItems: 'stretch' }}>
          <Sidebar />
          <Box
            asChild
            p="6"
            style={{ flex: 1, backgroundColor: 'var(--gray-2)', overflow: 'auto' }}
          >
            <main>
              <Container size="4">{children}</Container>
            </main>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
