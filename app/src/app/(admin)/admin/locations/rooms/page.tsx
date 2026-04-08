import { Container, Stack, Group, Title, Text } from '@mantine/core';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { BackButton } from '@/components/common/BackButton/BackButton';
import RoomsTable from '@/components/locations/Room/RoomsTable';
import { IconPlus } from '@tabler/icons-react';

export default async function RoomsListPage() {
  const rooms = await api.room.getAll();

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <Stack gap={0}>
            <Title order={2}>Gestión de Salas</Title>
            <Text c="dimmed" fz="sm">
              Administra el aforo, tipo y disponibilidad de cada sala.
            </Text>
          </Stack>
          <BackButton
            href="/admin/locations/rooms/create"
            label="Agregar nuevo"
            color="blue"
            icon={<IconPlus size={16} stroke={2.5} />}
          />
        </Group>

        <RoomsTable initialData={rooms} />
      </Stack>
    </Container>
  );
}
