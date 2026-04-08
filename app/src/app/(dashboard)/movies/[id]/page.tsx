// app/movies/[id]/page.tsx
import { Metadata } from 'next'; // 🔥 1. Importamos Metadata
import { notFound } from 'next/navigation';
import { Container } from '@mantine/core';

import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { DetailsOfMovie } from '@/components/movies/DetailsOfMovie/DetailsOfMovie';
import { MovieScreening } from '@/components/movie-screenings/MovieScreenings/MovieScreenings';
import { BackButton } from '@/components/common/BackButton/BackButton';

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    stateId?: string;
    municipalityId?: string;
    cinemaId?: string;
  }>;
}

// 🔥 2. Agregamos la función generateMetadata
export async function generateMetadata({
  params,
}: MovieDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId) || movieId <= 0) {
    return { title: 'Película no encontrada | Cinemo' };
  }

  try {
    // Buscamos la película en el servidor
    const movie = await api.movie.getById({ id: movieId });

    if (!movie) {
      return { title: 'Película no encontrada | Cinemo' };
    }

    // Retornamos los metadatos dinámicos armados con la info de la BD
    return {
      title: `${movie.title} - Boletos y Horarios | Cinemo`,
      description: movie.description.slice(0, 150) + '...', // Cortamos la descripción para SEO
      // Opcional: Puedes agregar la imagen para cuando compartan el link en WhatsApp/Twitter
      openGraph: {
        title: movie.title,
        description: movie.description,
        images: [movie.posterUrl],
      },
    };
  } catch (error) {
    return { title: 'Detalle de Película | Cinemo' };
  }
}

// 3. Tu componente de página se queda exactamente igual
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
