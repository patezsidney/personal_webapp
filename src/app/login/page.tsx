'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Card, Flex, Text, TextField } from '@radix-ui/themes';

import { login, isAuthenticated } from '@/services/auth';

const LoginPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/dashboard');
    }
  }, [router]);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      await login(username, password);
      router.replace('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex align="center" justify="center" style={{ minHeight: '100vh' }}>
      <Card size="3" style={{ width: 360 }}>
        <Flex direction="column" gap="4">
          <Flex direction="column">
            <Text size="4" weight="bold">
              Entrar
            </Text>
            <Text size="2" color="gray">
              Acesse sua conta
            </Text>
          </Flex>

          <Box>
            <Text as="label" size="2" weight="medium">
              Usuario
            </Text>
            <TextField.Root
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />
          </Box>

          <Box>
            <Text as="label" size="2" weight="medium">
              Senha
            </Text>
            <TextField.Root
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </Box>

          {error && (
            <Text size="2" color="red">
              {error}
            </Text>
          )}

          <Button onClick={handleLogin} loading={loading}>
            Entrar
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default LoginPage;
