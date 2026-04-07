import { Container, Stack, Group, Title, Text, Button } from '@mantine/core';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import StatesTable from '@/components/locations/StatesTable';
import { ButtonNewState } from '@/components/locations/ButtonNewState';

export default async function StatesListPage() {
  const states = await api.state.getAll();

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <Stack gap={0}>
            <Title order={2}>Catálogo de Estados</Title>
            <Text c="dimmed" fz="sm">
              Administra los estados donde tienes presencia.
            </Text>
          </Stack>
          <ButtonNewState />
        </Group>

        <StatesTable initialData={states} />
      </Stack>
    </Container>
  );
}
