// app/admin/locations/cinemas/page.tsx
import { Container, Stack, Group, Title, Text } from '@mantine/core';
import { api } from '@/trpc/server';
import CinemasTable from '@/components/locations/CinemasTable';
import { ButtonNewCinema } from '@/components/locations/ButtonNewCinema';

export default async function CinemasListPage() {
  // Obtenemos los cines desde el servidor
  const cinemas = await api.cinema.getAll();

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <Stack gap={0}>
            <Title order={2}>Catálogo de Cines</Title>
            <Text c="dimmed" fz="sm">
              Administra las sucursales y sus ubicaciones.
            </Text>
          </Stack>
          <ButtonNewCinema />
        </Group>

        {/* Componente que maneja filtrado, búsqueda, paginación y tabla */}
        <CinemasTable initialData={cinemas} />
      </Stack>
    </Container>
  );
}
