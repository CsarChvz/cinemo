import { Container, Stack } from '@mantine/core';
import { BackButtonScreenings } from '@/components/movie-screenings/BackButtonScreenings';
import { MovieScreeningForm } from '@/components/movie-screenings/MovieScreeningForm/MovieScreeningForm';

export default function NuevaFuncionPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButtonScreenings />
        <MovieScreeningForm />
      </Stack>
    </Container>
  );
}
