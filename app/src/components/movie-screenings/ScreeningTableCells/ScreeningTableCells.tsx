import { Group, Stack, Text, ActionIcon, Tooltip } from '@mantine/core';
import {
  IconCalendar,
  IconClock,
  IconEye,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import Link from 'next/link';

export const DateTimeCell = ({ date }: { date: Date | string }) => (
  <Stack gap={0}>
    <Group gap={4} wrap="nowrap">
      <IconCalendar size={14} color="gray" />
      <Text size="sm">{dayjs(date).format('DD/MM/YYYY')}</Text>
    </Group>
    <Group gap={4} wrap="nowrap">
      <IconClock size={14} color="blue" />
      <Text size="xs" c="dimmed" fw={700}>
        {dayjs(date).format('hh:mm A')}
      </Text>
    </Group>
  </Stack>
);

interface ActionButtonsProps {
  id: string | number;
  basePath: string; // Ej: '/admin/movie-screenings' o '/admin/locations/states'
  onDelete?: (id: string | number) => void;
}

export const ActionButtons = ({
  id,
  basePath,
  onDelete,
}: ActionButtonsProps) => (
  <Group gap={4} justify="right" wrap="nowrap">
    <Tooltip label="Ver detalle">
      <ActionIcon
        component={Link}
        href={`${basePath}/${id}`}
        size="sm"
        variant="subtle"
        color="gray"
      >
        <IconEye size={16} />
      </ActionIcon>
    </Tooltip>

    <Tooltip label="Editar">
      <ActionIcon
        component={Link}
        href={`${basePath}/${id}/edit`}
        size="sm"
        variant="subtle"
        color="blue"
      >
        <IconEdit size={16} />
      </ActionIcon>
    </Tooltip>

    <Tooltip label="Eliminar">
      <ActionIcon
        size="sm"
        variant="subtle"
        color="red"
        onClick={() => {
          if (onDelete) {
            onDelete(id);
          } else {
            console.log('Eliminar registro con ID:', id);
          }
        }}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>
  </Group>
);
