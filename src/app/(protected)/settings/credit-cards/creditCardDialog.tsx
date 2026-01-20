'use client';

import { useState } from 'react';
import { Button, Dialog, Flex, Text, TextField, Select, Box, Checkbox } from '@radix-ui/themes';

import { CreditCard, CreditCardCreatePayload } from '@/services/credit-cards.service';
import { Account } from '@/services/accounts.service';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  creditCard?: CreditCard;
  accounts?: Account[];
  onSubmit: (payload: CreditCardCreatePayload) => Promise<void>;
}

type FormErrors = {
  issuer?: string;
  limit?: string;
  closingDay?: string;
  dueDay?: string;
};

export const CreditCardDialog = ({ open, onOpenChange, creditCard, accounts, onSubmit }: Props) => {
  const isEdit = Boolean(creditCard);

  const [errors, setErrors] = useState<FormErrors>({});
  const [issuer, setIssuer] = useState(creditCard?.issuer ?? '');
  const [limit, setLimit] = useState(creditCard?.limit ?? '');
  const [closingDay, setClosingDay] = useState<number | undefined>(creditCard?.closing_day);
  const [dueDay, setDueDay] = useState<number | undefined>(creditCard?.due_day);
  const [isStoreCard, setIsStoreCard] = useState(creditCard?.is_store_card ?? false);
  const [active, setActive] = useState(creditCard?.active ?? true);
  const [accountId, setAccountId] = useState<number | undefined>(creditCard?.account);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!issuer.trim()) {
      newErrors.issuer = 'O campo Banco ou Loja emissora é obrigatório';
    }
    if (!limit.trim()) {
      newErrors.limit = 'O campo Limite é obrigatório';
    }
    if (!closingDay) {
      newErrors.closingDay = 'É obrigatório definir o dia de fechamento';
    }
    if (!dueDay) {
      newErrors.dueDay = 'É obrigatório definir o dia de vencimento da fatura';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (!dueDay || !closingDay) return;

    await onSubmit({
      issuer,
      limit,
      closingDay,
      dueDay: dueDay,
      isStoreCard,
      active,
      accountId,
    });

    onOpenChange(false);
  };

  const isFormValid = issuer.trim().length > 0 && limit.trim().length > 0 && dueDay && closingDay;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Title align="center" size="6">
          {isEdit ? 'Editar Cartão de crédito' : 'Novo Cartão de crédito'}
        </Dialog.Title>
        <Flex direction="column" gap="6" p="4">
          <Box>
            <Text as="label" size="3" weight="medium">
              Banco ou Loja emissora
            </Text>
            <TextField.Root
              mt="2"
              placeholder="Banco ou Loja emissora"
              required
              value={issuer}
              onChange={(e) => {
                setIssuer(e.target.value);
                if (errors.issuer) {
                  setErrors((prev) => ({ ...prev, issuer: undefined }));
                }
              }}
              size="3"
            />
            {errors.issuer && (
              <Text size="2" color="red">
                {errors.issuer}
              </Text>
            )}
          </Box>

          <Box>
            <Text as="label" size="3" weight="medium">
              Limite
            </Text>
            <TextField.Root
              mt="2"
              placeholder="R$ 0,00"
              required
              type="number"
              value={limit}
              onChange={(e) => {
                setLimit(e.target.value);
                if (errors.limit) {
                  setErrors((prev) => ({ ...prev, limit: undefined }));
                }
              }}
              size="3"
            />
            {errors.limit && (
              <Text size="2" color="red">
                {errors.limit}
              </Text>
            )}
          </Box>

          <Box>
            <Text as="label" size="3" weight="medium">
              Dia de fechamento
            </Text>
            <TextField.Root
              value={closingDay?.toString() ?? ''}
              mt="2"
              placeholder="5"
              type="number"
              onChange={(e) => {
                setClosingDay(Number(e.target.value));
                if (errors.closingDay) {
                  setErrors((prev) => ({ ...prev, closingDay: undefined }));
                }
              }}
              size="3"
            />
            {errors.closingDay && <Text>{errors.closingDay}</Text>}
          </Box>

          <Box>
            <Text as="label" size="3" weight="medium">
              Dia de vencimento da fatura
            </Text>
            <TextField.Root
              value={dueDay?.toString() ?? ''}
              mt="2"
              placeholder="10"
              type="number"
              onChange={(e) => {
                setDueDay(Number(e.target.value));
                if (errors.dueDay) {
                  setErrors((prev) => ({ ...prev, dueDay: undefined }));
                }
              }}
              size="3"
            />
            {errors.dueDay && <Text>{errors.dueDay}</Text>}
          </Box>

          <Flex direction="column" gap="2">
            <Text as="label" size="3" weight="medium">
              Conta
            </Text>

            <Select.Root
              value={accountId?.toString()}
              onValueChange={(v) => setAccountId(Number(v))}
              size="3"
            >
              <Select.Trigger placeholder="Selecione o tipo" />
              <Select.Content>
                {accounts?.map((account) => (
                  <Select.Item key={account.id} value={account.id.toString()}>
                    {account.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex direction="row" justify="between" align="stretch" gap="2">
            <Flex gap="2">
              <Checkbox size="3" onChange={() => setIsStoreCard(isStoreCard)} />É um cartão de loja
            </Flex>
            <Flex gap="2">
              <Checkbox size="3" defaultChecked onChange={() => setActive(active)} />
              Está ativo
            </Flex>
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
