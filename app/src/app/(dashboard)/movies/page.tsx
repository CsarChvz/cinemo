import { Container } from '@mantine/core';
import { Metadata } from 'next';
import { api, HydrateClient } from '@/trpc/server';
import { MoviesClientWrapper } from '@/components/movies/MoviesClientWrapper';
// Importamos el wrapper que acabamos de crear

// 1. Metadatos para SEO
export const metadata: Metadata = {
  title: 'Catálogo de Películas | Cinemo',
  description:
    'Explora nuestra cartelera completa. Filtra por género, clasificación y encuentra tu próxima película favorita.',
};

// 2. Componente de servidor asíncrono
export default async function MoviesPage() {
  const movies = await api.movie.getAllMovies();

  return (
    <HydrateClient>
      <Container size="xl" py="xl">
        <MoviesClientWrapper initialMovies={movies} />
      </Container>
    </HydrateClient>
  );
}
