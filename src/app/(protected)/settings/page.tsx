import Link from 'next/link';
import { Box, Card, Flex, Grid, Text } from '@radix-ui/themes';
import { ListBulletIcon, CardStackIcon, PersonIcon } from '@radix-ui/react-icons';

const SettingsPage = () => {
  const options = [
    {
      href: '/settings/categories',
      title: 'Categorias',
      description: 'Gerencie categorias de despesas e receitas',
      icon: <ListBulletIcon width={30} height={30} />,
    },
    {
      href: '/settings/accounts',
      title: 'Contas Bancárias',
      description: 'Contas bancárias e carteiras',
      icon: <PersonIcon width={30} height={30} />,
    },
    {
      href: '/settings/credit-cards',
      title: 'Cartões de Crédito',
      description: 'Cartões de crédito e loja',
      icon: <CardStackIcon width={30} height={30} />,
    },
  ];

  return (
    <Flex direction="column" gap="4">
      <Text size="5" weight="bold">
        Configurações
      </Text>

      <Grid gap="4" columns="3">
        {options.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Card>
              <Flex gap="3" align="center" p="3">
                {item.icon}
                <Box>
                  <Text weight="bold" size="5" as="div">
                    {item.title}
                  </Text>
                  <Text size="2" color="gray" as="div">
                    {item.description}
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Link>
        ))}
      </Grid>
    </Flex>
  );
};

export default SettingsPage;
