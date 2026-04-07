import { Container, Stack, Group, Title, Text } from '@mantine/core';
import { api } from '@/trpc/server';
import { ButtonNewScreening } from '@/components/movie-screenings/ButtonNewScreening';
import ScreeningsTable from '@/components/movie-screenings/ScreeningsTable';

export default async function GestionFuncionesPage() {
  const screenings = await api.movieScreening.getAll();

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        {/* HEADER SECTION */}
        <Group justify="space-between">
          <Stack gap={0}>
            <Title order={2}>Gestión de Funciones</Title>
            <Text c="dimmed" fz="sm">
              Administra horarios, disponibilidad y complejos.
            </Text>
          </Stack>
          <ButtonNewScreening />
        </Group>

        {/* TABLE SECTION */}
        <ScreeningsTable initialData={screenings} />
      </Stack>
    </Container>
  );
}
