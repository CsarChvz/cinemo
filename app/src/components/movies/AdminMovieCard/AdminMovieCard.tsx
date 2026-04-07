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
  AspectRatio,
} from '@mantine/core';
import {
  IconEdit,
  IconTrash,
  IconEyeOff,
  IconDotsVertical,
  IconEye,
} from '@tabler/icons-react';
import Link from 'next/link';
import { Movie } from '@/schemas/movie';

interface AdminMovieCardProps {
  movie: Movie;
  onDelete?: (id: number) => void;
  onToggleStatus?: (id: number) => void;
}

export function AdminMovieCard({
  movie,
  onDelete,
  onToggleStatus,
}: AdminMovieCardProps) {
  return (
    <Card withBorder radius="md" p="sm" shadow="sm">
      <Card.Section>
        {/* Aspect Ratio 3:4 (Un poco más compacto para vistas administrativas) */}
        <AspectRatio ratio={4 / 4}>
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fallbackSrc="https://placehold.co/300x400?text=Sin+Imagen"
          />
        </AspectRatio>
      </Card.Section>

      <Stack gap="xs" mt="md">
        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} lineClamp={1} size="sm" style={{ flex: 1 }}>
            {movie.title}
          </Text>
          <Badge
            color={movie.isActive ? 'green' : 'gray'}
            variant="light"
            size="xs"
          >
            {movie.isActive ? 'Activa' : 'Inactiva'}
          </Badge>
        </Group>

        <Group grow gap="xs">
          <Button
            component={Link}
            href={`/admin/movies/edit/${movie.id}`}
            variant="light"
            size="compact-xs"
            leftSection={<IconEdit size={14} />}
          >
            Editar
          </Button>

          <Menu shadow="md" width={180} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="default" size="sm">
                <IconDotsVertical size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Opciones rápidas</Menu.Label>
              <Menu.Item
                leftSection={
                  movie.isActive ? (
                    <IconEyeOff size={14} />
                  ) : (
                    <IconEye size={14} />
                  )
                }
                onClick={() => onToggleStatus?.(movie.id!)}
              >
                {movie.isActive ? 'Desactivar' : 'Activar'}
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={() => onDelete?.(movie.id!)}
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
