import { Container, Stack } from '@mantine/core';
import { MovieScreeningForm } from '@/components/movie-screenings/MovieScreeningForm/MovieScreeningForm';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Programar Nueva Función | Cinemo',
  description:
    'Asigna una película a una sala, fecha y horario específicos para publicarla en la cartelera.',
};

export default function NuevaFuncionPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButton href="/admin/movie-screenings" />
        <MovieScreeningForm />
      </Stack>
    </Container>
  );
}
