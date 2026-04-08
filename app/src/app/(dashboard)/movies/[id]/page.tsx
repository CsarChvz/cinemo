import { notFound } from 'next/navigation';
import { Container } from '@mantine/core';

import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { DetailsOfMovie } from '@/components/movies/DetailsOfMovie/DetailsOfMovie';
import { MovieScreening } from '@/components/movie-screenings/MovieScreenings/MovieScreenings';
import { BackButton } from '@/components/common/BackButton/BackButton';

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
  // 🔥 Leemos los IDs en lugar del texto
  searchParams: Promise<{
    stateId?: string;
    municipalityId?: string;
    cinemaId?: string;
  }>;
}

export default async function MovieDetailPage({
  params,
  searchParams,
}: MovieDetailPageProps) {
  const { id } = await params;
  const { cinemaId } = await searchParams;

  const movieId = Number(id);
  if (isNaN(movieId) || movieId <= 0) {
    notFound();
  }

  let movie;
  try {
    movie = await api.movie.getById({ id: movieId });
  } catch (error) {
    notFound();
  }

  if (!movie) {
    notFound();
  }

  return (
    <Container size="xl" py="xl">
      <BackButton href="/movies" />

      <DetailsOfMovie movie={movie} />

      <MovieScreening
        movie={movie}
        cinemaId={cinemaId ? Number(cinemaId) : undefined}
      />
    </Container>
  );
}
