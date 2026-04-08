import { Metadata } from 'next';
import { Container, Stack, Title, Text } from '@mantine/core';
import { notFound } from 'next/navigation';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { EditStateForm } from '@/components/locations/State/EditStateForm';

interface EditStatePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EditStatePageProps): Promise<Metadata> {
  const { id } = await params;
  const stateId = Number(id);

  if (isNaN(stateId) || stateId <= 0) {
    return { title: 'Editar Estado | Cinemo' };
  }

  try {
    const state = await api.state.getById({ id: stateId });

    if (!state) {
      return { title: 'Estado no encontrado | Cinemo' };
    }

    return {
      title: `Editar Estado: ${state.name} | Cinemo`,
      description: `Modifica el nombre o configuración regional del estado de ${state.name}.`,
    };
  } catch (error) {
    return { title: 'Editar Estado | Cinemo' };
  }
}

export default async function EditStatePage({ params }: EditStatePageProps) {
  const { id } = await params;

  const stateId = Number(id);
  if (isNaN(stateId) || stateId <= 0) {
    notFound();
  }

  const state = await api.state.getById({ id: stateId });

  if (!state) {
    notFound();
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButton href="/admin/locations/states" />
        <div>
          <Title order={2}>Editar Estado</Title>
          <Text c="dimmed">
            Estado:{' '}
            <Text span fw={700} c="blue">
              {state.name}
            </Text>{' '}
            (ID: #{state.id})
          </Text>
        </div>

        <EditStateForm state={state} />
      </Stack>
    </Container>
  );
}
