import { Container, Stack, Group, Title, Text, Button } from '@mantine/core';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { BackButton } from '@/components/common/BackButton/BackButton';
import StatesTable from '@/components/locations/State/StatesTable';
import { IconPlus } from '@tabler/icons-react';

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
          <BackButton
            href="/admin/locations/states/create"
            label="Agregar nuevo"
            color="blue"
            icon={<IconPlus size={16} stroke={2.5} />}
          />
        </Group>

        <StatesTable initialData={states} />
      </Stack>
    </Container>
  );
}
