import { Metadata } from 'next';
import { Container, Stack } from '@mantine/core';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { MovieForm } from '@/components/movies/NewMovieForm/NewMovieForm';

export const metadata: Metadata = {
  title: 'Registrar Nueva Película | Cinemo',
  description:
    'Añade una nueva película al catálogo del sistema para poder programar sus funciones en cartelera.',
};

export default function CreateMoviePage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButton href="/admin/movies" />
        <MovieForm />
      </Stack>
    </Container>
  );
}
