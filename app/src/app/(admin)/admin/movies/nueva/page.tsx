import { BackButtonMovies } from '@/components/movies/BackButtonMovies';
import { MovieForm } from '@/components/movies/NewMovieForm/NewMovieForm';
import { Container, Stack } from '@mantine/core';

export default function CreateMoviePage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButtonMovies />
        <MovieForm />
      </Stack>
    </Container>
  );
}
