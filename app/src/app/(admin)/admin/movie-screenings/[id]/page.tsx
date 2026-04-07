// app/admin/movie-screenings/[id]/page.tsx
import { Container, Stack, Group, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/trpc/server'; // Cliente de tRPC para el servidor
import { ScreeningDetailContent } from '@/components/movie-screenings/ScreeningDetailContent/ScreeningDetailContent';
import { MovieSummaryCard } from '@/components/movie-screenings/MovieSummaryCard/MovieSummaryCard';
import { ScreeningActionButtons } from '@/components/movie-screenings/ScreeningActionButtons';
import { BackButtonScreenings } from '@/components/movie-screenings/BackButtonScreenings';

interface DetalleFuncionPageProps {
  // En Next.js App Router, params ahora es una Promesa
  params: Promise<{ id: string }>;
}

export default async function DetalleFuncionPage({
  params,
}: DetalleFuncionPageProps) {
  const { id } = await params;
  const screeningId = Number(id);

  if (isNaN(screeningId) || screeningId <= 0) {
    notFound(); // Redirige a la página 404 si el ID no es válido
  }

  // Obtenemos los datos reales desde el backend
  const screening = await api.movieScreening.getById({ id: screeningId });

  if (!screening) {
    notFound();
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <BackButtonScreenings />

          <ScreeningActionButtons id={screening.id} />
        </Group>

        <ScreeningDetailContent screening={screening} />

        <MovieSummaryCard movie={screening.movie} />
      </Stack>
    </Container>
  );
}
