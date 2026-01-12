import Link from 'next/link';
import { Card, Flex, Text } from '@radix-ui/themes';

const SettingsPage = () => {
  return (
    <Flex direction="column" gap="4">
      <Text size="5" weight="bold">
        Configurações
      </Text>

      <Flex gap="4" wrap="wrap">
        <Link href="/settings/categories">
          <Card style={{ width: 220, cursor: 'pointer' }}>
            <Text weight="medium">Categorias</Text>
            <Text size="2" color="gray">
              Gerencie categorias de despesas e receitas
            </Text>
          </Card>
        </Link>

        <Link href="/settings/accounts">
          <Card style={{ width: 220, cursor: 'pointer' }}>
            <Text weight="medium">Contas</Text>
            <Text size="2" color="gray">
              Contas bancárias e carteiras
            </Text>
          </Card>
        </Link>

        <Link href="/settings/credit-cards">
          <Card style={{ width: 220, cursor: 'pointer' }}>
            <Text weight="medium">Cartões</Text>
            <Text size="2" color="gray">
              Cartões de crédito e loja
            </Text>
          </Card>
        </Link>
      </Flex>
    </Flex>
  );
};

export default SettingsPage;
