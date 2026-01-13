'use client';

import { useState } from 'react';
import { Button, Dialog, Flex, Text, TextField, Select, Box, TextArea } from '@radix-ui/themes';

import { Category } from '@/services/categories.service';
import { TransactionNature } from '@/services/transaction-natures.service';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
  transactionNatures: TransactionNature[];
  onSubmit: (payload: {
    name: string;
    natureId: number;
    description?: string;
    params?: { color?: string };
  }) => Promise<void>;
}

type FormErrors = {
  name?: string;
  natureId?: string;
};

export const CategoryDialog = ({
  open,
  onOpenChange,
  category,
  transactionNatures,
  onSubmit,
}: Props) => {
  const isEdit = Boolean(category);

  const [name, setName] = useState(category?.name ?? '');
  const [description, setDescription] = useState(category?.description ?? '');
  const [color, setColor] = useState(category?.params?.color ?? 'grey');
  const [natureId, setNatureId] = useState<number | undefined>(category?.nature?.id);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'O campo Nome é obrigatório';
    }
    if (!natureId) {
      newErrors.natureId = 'A natureza é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const isFormValid = name.trim().length > 0 && Boolean(natureId);

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (!natureId) return;
    await onSubmit({
      name,
      natureId,
      description,
      params: { color },
    });

    onOpenChange(false);
  };

  const colors = [
    '#94a3b8',
    '#ef4444',
    '#f97316',
    '#f59e0b',
    '#eab308',
    '#84cc16',
    '#22c55e',
    '#10b981',
    '#06b6d4',
    '#0ea5e9',
    '#3b82f6',
    '#6366f1',
    '#8b5cf6',
    '#a855f7',
    '#d946ef',
    '#f43f5e',
  ];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Title align="center" size="6">
          {isEdit ? 'Editar categoria' : 'Nova categoria'}
        </Dialog.Title>

        <Flex direction="column" gap="6" p="4">
          <Box>
            <Text as="label" size="3" weight="medium">
              Nome
            </Text>
            <TextField.Root
              mt="2"
              placeholder="Nome da categoria"
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
              placeholder="Descrição da categoria"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>

          <Flex direction="column" gap="2">
            <Text as="label" size="3" weight="medium">
              Tipo
            </Text>

            <Select.Root
              value={natureId?.toString()}
              onValueChange={(v) => {
                setNatureId(Number(v));
                if (errors.natureId) {
                  setErrors((prev) => ({
                    ...prev,
                    natureId: undefined,
                  }));
                }
              }}
              size="3"
            >
              <Select.Trigger placeholder="Selecione o tipo" />
              <Select.Content>
                {transactionNatures.map((nature) => (
                  <Select.Item key={nature.id} value={nature.id.toString()}>
                    {nature.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            {errors.natureId && (
              <Text size="2" color="red">
                {errors.natureId}
              </Text>
            )}
          </Flex>
          <Box>
            <Text as="div" size="2" mb="2" weight="bold">
              Cor
            </Text>
            <Flex gap="2" wrap="wrap">
              {colors.map((c) => (
                <Box
                  key={c}
                  onClick={() => setColor(c)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: c,
                    cursor: 'pointer',
                    border: color === c ? '2px solid var(--iris-9)' : '2px solid transparent',
                    boxShadow: color === c ? '0 0 0 2px var(--gray-1)' : 'none',
                  }}
                />
              ))}
            </Flex>
          </Box>

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
