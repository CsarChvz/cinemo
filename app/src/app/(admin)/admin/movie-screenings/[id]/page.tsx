import { Metadata } from 'next';
import { Container, Stack, Group, Button } from '@mantine/core';
import { notFound } from 'next/navigation';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { ScreeningDetailContent } from '@/components/movie-screenings/ScreeningDetailContent/ScreeningDetailContent';
import { MovieSummaryCard } from '@/components/movie-screenings/MovieSummaryCard/MovieSummaryCard';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { ScreeningActionButtons } from '@/components/movie-screenings/ScreeningActionButtons/ScreeningActionButtons';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

interface DetalleFuncionPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: DetalleFuncionPageProps): Promise<Metadata> {
  const { id } = await params;
  const screeningId = Number(id);

  if (isNaN(screeningId) || screeningId <= 0) {
    return { title: 'Detalles de la Función | Cinemo' };
  }

  try {
    const screening = await api.movieScreening.getById({ id: screeningId });

    if (!screening) {
      return { title: 'Función no encontrada | Cinemo' };
    }

    const fechaFormateada = dayjs(screening.start)
      .locale('es')
      .format('D [de] MMMM, HH:mm');

    return {
      title: `Función: ${screening.movie.title} - ${screening.room.name} | Cinemo`,
      description: `Detalles completos de la función #${screening.id} programada para el ${fechaFormateada}.`,
    };
  } catch (error) {
    return { title: 'Detalles de la Función | Cinemo' };
  }
}

export default async function DetalleFuncionPage({
  params,
}: DetalleFuncionPageProps) {
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
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <BackButton href="/admin/movie-screenings" />
          <ScreeningActionButtons id={screening.id} />
        </Group>

        <ScreeningDetailContent screening={screening} />

        <MovieSummaryCard movie={screening.movie} />
      </Stack>
    </Container>
  );
}
