import { Button, Flex, Heading, Container, Box, Avatar, DropdownMenu } from '@radix-ui/themes';
import Link from 'next/link';
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons';

interface HeaderProps {
  loggedUser?: boolean;
  handleLogout?: () => void;
}

export const Header = ({ loggedUser, handleLogout }: HeaderProps) => {
  return (
    <Box style={{ borderBottom: '1px solid var(--gray-5)' }}>
      <Container size="4">
        <Flex justify="between" align="center" py="3" px="4">
          <Flex align="center" gap="4">
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Heading size="4">FinanceApp</Heading>
            </Link>
          </Flex>

          <Flex align="center" gap="5">
            <Flex gap="4">
              {!loggedUser ? (
                <Link
                  href="/"
                  style={{
                    textDecoration: 'none',
                    color: 'var(--gray-11)',
                    fontWeight: 500,
                  }}
                >
                  Home
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  style={{
                    textDecoration: 'none',
                    color: 'var(--gray-11)',
                    fontWeight: 500,
                  }}
                >
                  Dashboard
                </Link>
              )}
              <Link
                href="/about"
                style={{ textDecoration: 'none', color: 'var(--gray-11)', fontWeight: 500 }}
              >
                Sobre
              </Link>
            </Flex>

            {loggedUser ? (
              <Flex align="center" gap="4">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Box style={{ cursor: 'pointer' }}>
                      <Avatar size="2" fallback="U" radius="full" />
                    </Box>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content variant="soft" align="end">
                    <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <DropdownMenu.Item>
                        <Flex align="center" gap="2">
                          <PersonIcon />
                          Perfil
                        </Flex>
                      </DropdownMenu.Item>
                    </Link>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item color="red" onClick={handleLogout}>
                      <Flex align="center" gap="2">
                        <ExitIcon />
                        Sair
                      </Flex>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            ) : (
              <Link href="/login">
                <Button variant="solid" highContrast>
                  Entrar
                </Button>
              </Link>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
