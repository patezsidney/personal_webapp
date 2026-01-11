'use client';

import { Flex, Text, Box } from '@radix-ui/themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DashboardIcon, CardStackPlusIcon, UpdateIcon, GearIcon } from '@radix-ui/react-icons';

export const Sidebar = () => {
  const pathname = usePathname();

  const mainMenuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
    { label: 'Transações', href: '/transactions', icon: <CardStackPlusIcon /> },
    { label: 'Orçamento', href: '/budget', icon: <DashboardIcon /> },
    { label: 'Lançamentos Recorrentes', href: '/recurring', icon: <UpdateIcon /> },
  ];

  const bottomMenuItems = [{ label: 'Configurações', href: '/settings', icon: <GearIcon /> }];

  return (
    <Box
      style={{
        width: '260px',
        borderRight: '1px solid var(--gray-5)',
        height: 'calc(100vh - 64px)',
        padding: '24px 12px',
        backgroundColor: 'var(--gray-1)',
        position: 'sticky',
        top: '64px',
      }}
    >
      <Flex direction="column" gap="2" justify="between" style={{ height: '100%' }}>
        <Flex direction="column" gap="2">
          {mainMenuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <Flex
                  align="center"
                  gap="3"
                  p="2"
                  style={{
                    borderRadius: 'var(--radius-2)',
                    backgroundColor: isActive ? 'var(--iris-3)' : 'transparent',
                    color: isActive ? 'var(--iris-11)' : 'var(--gray-11)',
                    transition: 'background-color 0.2s',
                  }}
                >
                  {item.icon}
                  <Text size="2" weight={isActive ? 'bold' : 'medium'}>
                    {item.label}
                  </Text>
                </Flex>
              </Link>
            );
          })}
        </Flex>

        <Flex direction="column" gap="2">
          {bottomMenuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <Flex
                  align="center"
                  gap="3"
                  p="2"
                  style={{
                    borderRadius: 'var(--radius-2)',
                    backgroundColor: isActive ? 'var(--iris-3)' : 'transparent',
                    color: isActive ? 'var(--iris-11)' : 'var(--gray-11)',
                    transition: 'background-color 0.2s',
                  }}
                >
                  {item.icon}
                  <Text size="2" weight={isActive ? 'bold' : 'medium'}>
                    {item.label}
                  </Text>
                </Flex>
              </Link>
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
};
