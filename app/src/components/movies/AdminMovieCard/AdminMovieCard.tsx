'use client';

import {
  Card,
  Image,
  Text,
  Group,
  Button,
  ActionIcon,
  Stack,
  Badge,
  Menu,
  rem,
} from '@mantine/core';
import {
  IconEdit,
  IconTrash,
  IconEyeOff,
  IconDotsVertical,
  IconEye,
} from '@tabler/icons-react';
import Link from 'next/link';

interface AdminMovieCardProps {
  id: number;
  title: string;
  posterUrl: string;
  isActive: boolean;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export function AdminMovieCard({
  id,
  title,
  posterUrl,
  isActive,
  onDelete,
  onToggleStatus,
}: AdminMovieCardProps) {
  return (
    <Card withBorder radius="md" p="sm" shadow="sm">
      <Card.Section>
        <Image
          src={posterUrl}
          height={180}
          alt={title}
          fallbackSrc="https://placehold.co/400x200?text=No+Image"
        />
      </Card.Section>

      <Stack gap="xs" mt="md">
        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} lineClamp={1} size="sm" style={{ flex: 1 }}>
            {title}
          </Text>
          <Badge color={isActive ? 'green' : 'gray'} variant="light" size="xs">
            {isActive ? 'Activa' : 'Inactiva'}
          </Badge>
        </Group>

        <Group grow gap="xs">
          <Button
            component={Link}
            href={`/admin/movies/${id}/edit`}
            variant="light"
            size="compact-xs"
            leftSection={<IconEdit size={14} />}
          >
            Editar
          </Button>

          <Menu shadow="md" width={160} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="default" size="sm">
                <IconDotsVertical size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Opciones rápidas</Menu.Label>
              <Menu.Item
                leftSection={
                  isActive ? <IconEyeOff size={14} /> : <IconEye size={14} />
                }
                onClick={() => onToggleStatus(id)}
              >
                {isActive ? 'Desactivar' : 'Activar'}
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={() => onDelete(id)}
              >
                Eliminar película
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Stack>
    </Card>
  );
}
