'use client';

import { Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc-folder/trpc-adaptadores/react';

interface ScreeningActionButtonsProps {
  id: number;
}

export function ScreeningActionButtons({ id }: ScreeningActionButtonsProps) {
  const router = useRouter();

  // Mutación para eliminar la función
  const deleteScreening = api.movieScreening.delete.useMutation({
    onSuccess: () => {
      // Redirigimos al catálogo y refrescamos la ruta
      router.push('/admin/movie-screenings');
      router.refresh();
    },
    onError: (error) => {
      alert(`No se pudo eliminar la función: ${error.message}`);
    },
  });

  const handleDelete = () => {
    // Confirmación nativa simple (puedes cambiarla por un Modal de Mantine luego si gustas)
    if (
      confirm(
        '¿Estás seguro de que deseas eliminar esta función? Esta acción no se puede deshacer.'
      )
    ) {
      deleteScreening.mutate({ id });
    }
  };

  return (
    <Group gap="xs">
      <Tooltip label="Editar">
        <ActionIcon
          component={Link}
          href={`/admin/movie-screenings/edit/${id}`}
          variant="light"
          color="blue"
          size="lg"
        >
          <IconEdit />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Eliminar">
        <ActionIcon
          variant="light"
          color="red"
          size="lg"
          onClick={handleDelete}
          loading={deleteScreening.isPending} // Spinner automático
        >
          <IconTrash />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
