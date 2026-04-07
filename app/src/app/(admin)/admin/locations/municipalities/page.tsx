// app/admin/locations/municipalities/page.tsx
import { Container, Stack, Group, Title, Text } from '@mantine/core';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { ButtonNewMunicipality } from '@/components/locations/ButtonNewMunicipality';
import MunicipalitiesTable from '@/components/locations/MunicipalitiesTable';

export default async function MunicipalitiesListPage() {
  const municipalities = await api.municipality.getAll();

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <Stack gap={0}>
            <Title order={2}>Gestión de Municipios</Title>
            <Text c="dimmed" fz="sm">
              Administra el catálogo de municipios y su relación con los
              estados.
            </Text>
          </Stack>
          <ButtonNewMunicipality />
        </Group>

        <MunicipalitiesTable initialData={municipalities} />
      </Stack>
    </Container>
  );
}
