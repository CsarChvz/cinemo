import { Container, Stack } from '@mantine/core';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { CinemaForm } from '@/components/locations/Cinema/CinemaForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registrar Nuevo Cine | Cinemo',
  description:
    'Añade una nueva sucursal o complejo cinematográfico al catálogo del sistema.',
};

export default function CreateCinemaPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButton href="/admin/locations/cinemas" />
        <CinemaForm />
      </Stack>
    </Container>
  );
}
