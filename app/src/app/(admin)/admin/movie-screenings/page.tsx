import { Container, Stack, Group, Title, Text } from '@mantine/core';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import ScreeningsTable from '@/components/movie-screenings/ScreeningsTable/ScreeningsTable';
import { BackButton } from '@/components/common/BackButton/BackButton';

export default async function GestionFuncionesPage() {
  const screenings = await api.movieScreening.getAll();

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <Stack gap={0}>
            <Title order={2}>Gestión de Funciones</Title>
            <Text c="dimmed" fz="sm">
              Administra horarios, disponibilidad y complejos.
            </Text>
          </Stack>
          <BackButton href="/dashboard/users" />
        </Group>

        <ScreeningsTable initialData={screenings} />
      </Stack>
    </Container>
  );
}
