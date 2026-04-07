import { BackButton } from '@/components/common/BackButton/BackButton';
import { MovieForm } from '@/components/movies/NewMovieForm/NewMovieForm';
import { Container, Stack } from '@mantine/core';

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
