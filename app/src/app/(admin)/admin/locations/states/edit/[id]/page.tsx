import { Container, Stack } from '@mantine/core';
import { notFound } from 'next/navigation';
import { BackButtonStates } from '../../create/BackButtonStates';
import { EditStateForm } from '@/components/locations/EditStateForm';
import { api } from '@/trpc/server';

interface EditStatePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditStatePage({ params }: EditStatePageProps) {
  const { id } = await params;

  const stateId = Number(id);
  if (isNaN(stateId) || stateId <= 0) {
    notFound();
  }

  const state = await api.state.getById({ id: stateId });

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButtonStates />
        <EditStateForm state={state} />
      </Stack>
    </Container>
  );
}
