import { notFound } from 'next/navigation';
import { Container, Button } from '@mantine/core';

import { api } from '@/trpc/server';
import { MovieNotFound } from '@/components/movies/MovieNotFound/MovieNotFound';
import { DetailsOfMovie } from '@/components/movies/DetailsOfMovie/DetailsOfMovie';
import MovieScreening from '@/components/movie-screenings/MovieScreenings/MovieScreenings';
import { BackButton } from '@/components/common/BackButton';

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ cine?: string }>;
}

/**
 * Página de detalle de película - Server Component
 * Obtiene los datos del servidor usando tRPC
 */
export default async function MovieDetailPage({
  params,
  searchParams,
}: MovieDetailPageProps) {
  const { id } = await params;
  const { cine } = await searchParams;

  // Convertir y validar que el ID sea un número válido
  const movieId = Number(id);
  if (isNaN(movieId) || movieId <= 0) {
    notFound();
  }

  // Obtener la película del servidor
  let movie;
  try {
    movie = await api.movie.getMovieById(movieId);
  } catch (error) {
    // Si la película no existe o hay error, mostrar 404
    notFound();
  }

  return (
    <Container size="xl" py="xl">
      {/* Header de Navegación */}
      <BackButton />

      {/* Detalle de la película */}
      <DetailsOfMovie movie={movie} />

      {/* Sección de Funciones */}
      <MovieScreening movie={movie} cinema={cine ?? ''} />
    </Container>
  );
}
