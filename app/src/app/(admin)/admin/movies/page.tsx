import { Container } from '@mantine/core';
import { Metadata } from 'next';
import { api, HydrateClient } from '@/trpc-folder/trpc-adaptadores/server';
import { AdminMoviesClientWrapper } from '@/components/movies/AdminMoviesClientWrapper';

export const metadata: Metadata = {
  title: 'Administración de Películas | Cinemo',
  description: 'Panel de control para gestionar el catálogo de películas.',
};

export default async function AdminMoviesPage() {
  const movies = await api.movie.getAll();

  return (
    <HydrateClient>
      <Container size="xl" py="xl">
        <AdminMoviesClientWrapper initialMovies={movies} />
      </Container>
    </HydrateClient>
  );
}
