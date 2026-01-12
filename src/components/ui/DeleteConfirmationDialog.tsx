'use client';

import { AlertDialog, Button, Flex, Strong, Text } from '@radix-ui/themes';

interface Props {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  showWarning?: boolean;
}

export const DeleteConfirmDialog = ({
  open,
  title = 'Confirmar exclusão',
  description = 'Esta ação não pode ser desfeita.',
  confirmLabel = 'Excluir',
  loading = false,
  onConfirm,
  onCancel,
  showWarning = true,
}: Props) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={(o) => !o && onCancel()}>
      <AlertDialog.Content>
        <AlertDialog.Title size="6">{title}</AlertDialog.Title>

        <AlertDialog.Description>
          <Flex direction="column" gap="2">
            <Text size="4" color="gray">
              {description}
            </Text>

            {showWarning && (
              <Text size="4" color="gray">
                <Strong>Atenção:</Strong> Esta ação não pode ser desfeita.
              </Text>
            )}
          </Flex>
        </AlertDialog.Description>

        <Flex justify="end" gap="3" mt="4">
          <AlertDialog.Cancel>
            <Button variant="surface" onClick={onCancel} size="3">
              Cancelar
            </Button>
          </AlertDialog.Cancel>

          <AlertDialog.Action>
            <Button color="red" onClick={onConfirm} loading={loading} size="3">
              {confirmLabel}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
