import { Container, Stack } from '@mantine/core';
import { MovieScreeningForm } from '@/components/movie-screenings/MovieScreeningForm/MovieScreeningForm';
import { BackButton } from '@/components/common/BackButton/BackButton';

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
