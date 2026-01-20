'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';

import { isAuthenticated, logout } from '@/services/auth';
import { Sidebar } from '@/components/layout/sidebar';
import { Box, Container, Flex } from '@radix-ui/themes';
import { ToastProvider } from '@/contexts/ToastContext';

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isReady = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  const authStatus = isReady ? isAuthenticated() : false;

  useEffect(() => {
    if (isReady && !authStatus) {
      router.replace('/login');
    }
  }, [isReady, authStatus, router]);

  function handleLogout() {
    logout();
    router.replace('/');
  }

  if (!isReady) {
    return null; // Or a loading spinner
  }

  return (
    <ToastProvider>
      <Flex direction="column" minHeight="100vh">
        <Box
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: 'var(--color-background)',
          }}
        >
          <Header loggedUser={authStatus} handleLogout={handleLogout} />
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
    </ToastProvider>
  );
}
