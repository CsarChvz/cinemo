import { Container, Stack, Group, Title, Text } from '@mantine/core';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { BackButton } from '@/components/common/BackButton/BackButton';
import CinemasTable from '@/components/locations/Cinema/CinemasTable';
import { IconPlus } from '@tabler/icons-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Cines | Cinemo',
  description:
    'Administra las sucursales, complejos cinematográficos y sus ubicaciones.',
};

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
          <BackButton
            href="/admin/locations/cinemas/create"
            label="Agregar nueva película"
            color="blue"
            icon={<IconPlus size={16} stroke={2.5} />}
          />
        </Group>

        <CinemasTable initialData={cinemas} />
      </Stack>
    </Container>
  );
}
