'use client';

import { useState } from 'react';
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextField,
  Select,
  Box,
  TextArea,
  CheckboxGroup,
} from '@radix-ui/themes';

import { Account, AccountCreatePayload } from '@/services/accounts.service';
import { PaymentType } from '@/services/payment-types.service';
import { AccountType } from '@/services/account-types.service';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account?: Account | null;
  accountTypes?: AccountType[];
  paymentTypes?: PaymentType[];
  onSubmit: (payload: AccountCreatePayload) => Promise<void>;
}

type FormErrors = {
  name?: string;
  accountType?: string;
};

export const AccountDialog = ({
  open,
  onOpenChange,
  account,
  accountTypes,
  paymentTypes,
  onSubmit,
}: Props) => {
  const isEdit = Boolean(account);

  const [name, setName] = useState(account?.name ?? '');
  const [description, setDescription] = useState(account?.description ?? '');
  const [accountTypeId, setAccountTypeId] = useState<number | undefined>(account?.account_type?.id);
  const [paymentTypeIds, setPaymentTypeIds] = useState<number[] | undefined>(
    account?.payment_types?.map((pt) => pt.id),
  );
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'O campo Nome é obrigatório';
    }
    if (!accountTypeId) {
      newErrors.accountType = 'O tipo de conta é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const isFormValid = name.trim().length > 0 && Boolean(accountTypeId);

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (!accountTypeId) return;

    await onSubmit({
      name,
      accountTypeId,
      paymentTypeIds: paymentTypeIds ?? [],
      description,
    });

    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Title align="center" size="6">
          {isEdit ? 'Editar conta' : 'Nova conta'}
        </Dialog.Title>

        <Flex direction="column" gap="6" p="4">
          <Box>
            <Text as="label" size="3" weight="medium">
              Nome
            </Text>
            <TextField.Root
              mt="2"
              placeholder="Nome da conta"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) {
                  setErrors((prev) => ({ ...prev, name: undefined }));
                }
              }}
              size="3"
            />
            {errors.name && (
              <Text size="2" color="red">
                {errors.name}
              </Text>
            )}
          </Box>

          <Box>
            <Text as="label" size="3" weight="medium">
              Descrição
            </Text>
            <TextArea
              mt="2"
              placeholder="Descrição da conta"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>

          <Flex direction="column" gap="2">
            <Text as="label" size="3" weight="medium">
              Tipo
            </Text>

            <Select.Root
              value={accountTypeId?.toString()}
              onValueChange={(v) => {
                setAccountTypeId(Number(v));
                if (errors.accountType) {
                  setErrors((prev) => ({
                    ...prev,
                    accountType: undefined,
                  }));
                }
              }}
              size="3"
            >
              <Select.Trigger placeholder="Selecione o tipo" />
              <Select.Content>
                {accountTypes?.map((type) => (
                  <Select.Item key={type.id} value={type.id.toString()}>
                    {type.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            {errors.accountType && (
              <Text size="2" color="red">
                {errors.accountType}
              </Text>
            )}
          </Flex>

          <Flex direction="column" gap="2">
            <Text as="label" size="3" weight="medium">
              Formas de pagamento
            </Text>

            <CheckboxGroup.Root
              defaultValue={paymentTypeIds?.map((pt) => pt.toString()) ?? []}
              onValueChange={(v) => {
                setPaymentTypeIds(v.map((pt) => Number(pt)));
              }}
              size="3"
            >
              {paymentTypes?.map((type) => (
                <CheckboxGroup.Item key={type.id} value={type.id.toString()}>
                  {type.name}
                </CheckboxGroup.Item>
              ))}
            </CheckboxGroup.Root>
          </Flex>

          <Flex justify="end" gap="3">
            <Button variant="surface" size="3" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>

            <Button onClick={handleSubmit} size="3" disabled={!isFormValid}>
              Salvar
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
