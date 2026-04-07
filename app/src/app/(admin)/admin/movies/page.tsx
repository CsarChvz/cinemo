import { Container } from '@mantine/core';
import { Metadata } from 'next';
import { api, HydrateClient } from '@/trpc/server';
import { AdminMoviesClientWrapper } from '../../../../components/movies/AdminMoviesClientWrapper';
// ^ Ajusta esta ruta a donde guardes el componente de abajo

export const metadata: Metadata = {
  title: 'Administración de Películas | Cinemo',
  description: 'Panel de control para gestionar el catálogo de películas.',
};

export default async function AdminMoviesPage() {
  // Obtenemos los datos reales en el servidor en lugar del DUMMY_MOVIES
  const movies = await api.movie.getAll();

  return (
    <HydrateClient>
      <Container size="xl" py="xl">
        <AdminMoviesClientWrapper initialMovies={movies} />
      </Container>
    </HydrateClient>
  );
}
