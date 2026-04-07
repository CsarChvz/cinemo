import { Container, Stack } from '@mantine/core';
import { notFound } from 'next/navigation';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { BackButtonScreenings } from '@/components/movie-screenings/BackButtonScreenings';
import { EditMovieScreeningForm } from '@/components/movie-screenings/EditMovieScreeningForm';

interface EditarFuncionPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarFuncionPage({
  params,
}: EditarFuncionPageProps) {
  const { id } = await params;
  const screeningId = Number(id);

  if (isNaN(screeningId) || screeningId <= 0) {
    notFound();
  }

  const screening = await api.movieScreening.getById({ id: screeningId });

  if (!screening) {
    notFound();
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButtonScreenings />
        <EditMovieScreeningForm screening={screening} />
      </Stack>
    </Container>
  );
}
