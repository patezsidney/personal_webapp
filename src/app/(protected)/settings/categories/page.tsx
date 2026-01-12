'use client';

import { useState } from 'react';
import { Box, Button, Card, Flex, Text, IconButton, Tooltip } from '@radix-ui/themes';

import { Category } from '@/services/categories.service';
import { useCategories } from '@/hooks/categories/useCategories';
import { useCreateCategory } from '@/hooks/categories/useCreateCategory';
import { useDeleteCategory } from '@/hooks/categories/useDeleteCategory';
import { useTransactionNatures } from '@/hooks/transactions/useTransactionNatures';
import { ArrowLeftIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

import { CategoryDialog } from '@/app/(protected)/settings/categories/categoryDialog';
import { useUpdateCategory } from '@/hooks/categories/useUpdateCategory';
import { DeleteConfirmDialog } from '@/components/ui/DeleteConfirmationDialog';
import { useRouter } from 'next/navigation';

const CategoriesPage = () => {
  const router = useRouter();
  const categoriesResult = useCategories();
  const natureResult = useTransactionNatures();

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const handleCreate = async (payload: {
    name: string;
    natureId: number;
    params?: { color?: string };
  }) => {
    await createCategory.mutateAsync(payload);
  };

  const handleUpdate = async (payload: {
    name: string;
    natureId: number;
    params?: { color?: string };
  }) => {
    if (!editingCategory) return;

    await updateCategory.mutateAsync({
      id: editingCategory.id,
      payload,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    await deleteCategory.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  };

  if (categoriesResult.isLoading || natureResult.isLoading) {
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
            Categorias
          </Text>
        </Flex>
        <Button
          onClick={() => {
            setEditingCategory(null);
            setOpen(true);
          }}
          size="3"
          style={{ cursor: 'pointer' }}
        >
          Nova categoria
        </Button>
      </Flex>

      <Flex direction="column" gap="4" mt="4">
        {categoriesResult.data?.map((category) => (
          <Card key={category.id}>
            <Flex justify="between" align="center">
              <Flex align="center" gap="4">
                <Box
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: category.params ? category.params.color : 'grey',
                  }}
                />

                <Text size="4" weight="medium">
                  {category.name}
                </Text>
              </Flex>
              <Flex align="center" gap="4">
                <Tooltip content="Editar categoria">
                  <IconButton
                    variant="soft"
                    color="green"
                    onClick={() => {
                      setEditingCategory(category);
                      setOpen(true);
                    }}
                    size="3"
                    style={{ cursor: 'pointer' }}
                  >
                    <Pencil1Icon width={20} height={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip content="Excluir categoria">
                  <IconButton
                    variant="soft"
                    color="red"
                    onClick={() => setDeleteTarget(category)}
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
      </Flex>
      <CategoryDialog
        key={open ? (editingCategory?.id ?? 'new') : 'closed'}
        open={open}
        onOpenChange={setOpen}
        category={editingCategory}
        transactionNatures={natureResult.data ?? []}
        onSubmit={editingCategory ? handleUpdate : handleCreate}
      />
      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        title="Excluir categoria"
        description={`Deseja realmente excluir a categoria "${deleteTarget?.name}"?`}
        loading={deleteCategory.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Flex>
  );
};

export default CategoriesPage;
