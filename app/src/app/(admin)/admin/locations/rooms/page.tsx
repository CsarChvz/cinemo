// app/admin/locations/rooms/page.tsx
import { Container, Stack, Group, Title, Text } from '@mantine/core';
import { api } from '@/trpc/server';
import RoomsTable from '@/components/locations/RoomsTable';
import { ButtonNewRoom } from '@/components/locations/ButtonNewRoom';

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
          <ButtonNewRoom />
        </Group>

        <RoomsTable initialData={rooms} />
      </Stack>
    </Container>
  );
}
