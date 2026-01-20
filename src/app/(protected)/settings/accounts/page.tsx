'use client';

import { useState } from 'react';
import { Button, Card, Flex, Text, IconButton, Tooltip, Grid, Badge } from '@radix-ui/themes';

import { ArrowLeftIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

import { useAccounts } from '@/hooks/accounts/useAccounts';
import { useAccountTypes } from '@/hooks/accountTypes/useAccountType';
import { usePaymentTypes } from '@/hooks/payment-types/usePaymentType';
import { useDeleteAccount } from '@/hooks/accounts/useDeleteAccount';
import { useUpdateAccount } from '@/hooks/accounts/useUpdateAccount';
import { useCreateAccounts } from '@/hooks/accounts/useCreateAccounts';

import { AccountDialog } from '@/app/(protected)/settings/accounts/accountsDialogue';
import { DeleteConfirmDialog } from '@/components/ui/DeleteConfirmationDialog';
import { useRouter } from 'next/navigation';
import { Account, AccountCreatePayload } from '@/services/accounts.service';

const AccountsPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Account | null>(null);

  const accountResults = useAccounts();
  const accountTypeResults = useAccountTypes();
  const paymentTypeResults = usePaymentTypes();

  const createAccount = useCreateAccounts();
  const updateAccount = useUpdateAccount();
  const deleteAccount = useDeleteAccount();

  const handleCreate = async (payload: AccountCreatePayload) => {
    await createAccount.mutateAsync(payload);
  };

  const handleUpdate = async (payload: AccountCreatePayload) => {
    if (!editingAccount) return;

    await updateAccount.mutateAsync({
      id: editingAccount.id,
      payload,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    await deleteAccount.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  };

  if (accountResults.isLoading || paymentTypeResults.isLoading || accountTypeResults.isLoading) {
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
            Contas Bancárias
          </Text>
        </Flex>
        <Button
          onClick={() => {
            setEditingAccount(null);
            setOpen(true);
          }}
          size="3"
          style={{ cursor: 'pointer' }}
        >
          Nova conta
        </Button>
      </Flex>

      <Grid columns="1" gap="4" mt="4" style={{ width: '100%' }}>
        {accountResults.data?.map((account) => (
          <Card key={account.id} onClick={() => setEditingAccount(account)}>
            <Flex justify="between" align="center">
              <Flex direction="column" gap="2">
                <Text size="5" weight="bold" as="div">
                  {account.name}
                </Text>
                <Text size="3" color="gray" as="div">
                  {account.account_type.name}
                </Text>
                <Flex direction="row" gap="2">
                  {account.payment_types.map((pt) => (
                    <Badge key={pt.id}>{pt.name}</Badge>
                  ))}
                </Flex>
              </Flex>

              <Flex align="center" gap="4">
                <Tooltip content="Editar conta">
                  <IconButton
                    variant="soft"
                    color="green"
                    onClick={() => {
                      setEditingAccount(account);
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
                    onClick={() => setDeleteTarget(account)}
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
      <AccountDialog
        key={open ? (editingAccount?.id ?? 'new') : 'closed'}
        open={open}
        onOpenChange={setOpen}
        account={editingAccount}
        accountTypes={accountTypeResults.data}
        paymentTypes={paymentTypeResults.data}
        onSubmit={editingAccount ? handleUpdate : handleCreate}
      />
      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        title="Excluir conta"
        description={`Deseja realmente excluir a conta "${deleteTarget?.name}"?`}
        loading={deleteAccount.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Flex>
  );
};

export default AccountsPage;
