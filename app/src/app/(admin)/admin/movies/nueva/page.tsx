import { NuevaPeliculaForm } from '@/components/movies/NewMovieForm/NewMovieForm';
import { Container } from '@mantine/core';

export default function NuevaPeliculaPage() {
  return (
    <Container size="md" py="xl">
      <NuevaPeliculaForm />
    </Container>
  );
}
