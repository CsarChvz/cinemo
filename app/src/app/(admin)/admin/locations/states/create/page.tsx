import { Container, Stack } from '@mantine/core';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { StateForm } from '@/components/locations/State/StateForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registrar Nuevo Estado | Cinemo',
  description:
    'Añade un nuevo estado al catálogo para organizar tus complejos cinematográficos.',
};

export default function CreateStatePage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButton href="/admin/locations/states" />
        <StateForm />
      </Stack>
    </Container>
  );
}
