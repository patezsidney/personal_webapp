'use client';

import { useState } from 'react';
import { Button, Card, Flex, Text, IconButton, Tooltip, Grid, Box } from '@radix-ui/themes';

import { ArrowLeftIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

import { useCreditCards } from '@/hooks/credit-cards/useCreditCards';
import { useDeleteCreditCard } from '@/hooks/credit-cards/useDeleteCreditCard';
import { useCreateCreditCard } from '@/hooks/credit-cards/useCreateCreditCard';
import { useUpdateCreditCard } from '@/hooks/credit-cards/useUpdateCreditCard';
import { useAccounts } from '@/hooks/accounts/useAccounts';

import { CreditCardDialog } from './creditCardDialog';
import { DeleteConfirmDialog } from '@/components/ui/DeleteConfirmationDialog';
import { useRouter } from 'next/navigation';
import { CreditCard, CreditCardCreatePayload } from '@/services/credit-cards.service';

const CreditCardsPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editingCreditCard, setEditingCreditCard] = useState<CreditCard | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<CreditCard | null>(null);

  const creditCardResults = useCreditCards();
  const accountResults = useAccounts();

  const createCreditCard = useCreateCreditCard();
  const updateCreditCard = useUpdateCreditCard();
  const deleteCreditCard = useDeleteCreditCard();

  const handleCreate = async (payload: CreditCardCreatePayload) => {
    await createCreditCard.mutateAsync(payload);
  };

  const handleUpdate = async (payload: CreditCardCreatePayload) => {
    if (!editingCreditCard) return;

    await updateCreditCard.mutateAsync({
      id: editingCreditCard.id,
      payload,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    await deleteCreditCard.mutateAsync(deleteTarget.id);
  };

  if (creditCardResults.isLoading || accountResults.isLoading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center">
        <Flex align="center" gap="4">
          <IconButton onClick={() => router.back()} size="3" style={{ cursor: 'pointer' }}>
            <ArrowLeftIcon />
          </IconButton>
          <Text size="6" weight="bold">
            Cartões de Crédito
          </Text>
        </Flex>
        <Button
          onClick={() => {
            setEditingCreditCard(undefined);
            setOpen(true);
          }}
          size="3"
          style={{ cursor: 'pointer' }}
        >
          Novo Cartão
        </Button>
      </Flex>

      <Grid columns="1" gap="4" mt="4" style={{ width: '100%' }}>
        {creditCardResults.data?.map((creditCard) => (
          <Card key={creditCard.id} onClick={() => setEditingCreditCard(creditCard)}>
            <Flex justify="between" align="center">
              <Flex direction="column" gap="2">
                <Box>
                  <Text size="2" weight="medium" as="div">
                    Emissor
                  </Text>
                  <Text size="5" weight="bold" as="div">
                    {creditCard.issuer}
                  </Text>
                </Box>

                <Box>
                  <Text size="2" weight="medium" as="div">
                    Conta
                  </Text>
                  <Text size="3" color="gray" as="div">
                    {accountResults.data?.find((acc) => acc.id === creditCard.account)?.name}
                  </Text>
                </Box>
              </Flex>

              <Flex align="center" gap="4">
                <Tooltip content="Editar conta">
                  <IconButton
                    variant="soft"
                    color="green"
                    onClick={() => {
                      setEditingCreditCard(creditCard);
                      setOpen(true);
                    }}
                    size="3"
                    style={{ cursor: 'pointer' }}
                  >
                    <Pencil1Icon width={20} height={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip content="Excluir conta">
                  <IconButton
                    variant="soft"
                    color="red"
                    onClick={() => setDeleteTarget(creditCard)}
                    size="3"
                    style={{ cursor: 'pointer' }}
                  >
                    <TrashIcon width={20} height={20} />
                  </IconButton>
                </Tooltip>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Grid>

      <CreditCardDialog
        key={open ? (editingCreditCard?.id ?? 'new') : 'closed'}
        open={open}
        onOpenChange={setOpen}
        creditCard={editingCreditCard}
        accounts={accountResults.data}
        onSubmit={editingCreditCard ? handleUpdate : handleCreate}
      />
      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        title="Excluir cartão de crédito?"
        description={`Deseja realmente excluir o cartão "${deleteTarget?.issuer}"?`}
        loading={deleteCreditCard.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Flex>
  );
};

export default CreditCardsPage;
