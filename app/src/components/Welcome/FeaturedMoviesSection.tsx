// components/Welcome/FeaturedMoviesSection.tsx
'use client';

import { SimpleGrid, Container, Title } from '@mantine/core';
import { MovieCard } from '@/components/movies/MovieCard/MovieCard'; // Ajusta la ruta si es necesario
import { Movie } from '@/schemas/movie';

interface FeaturedMoviesSectionProps {
  movies: Movie[];
}

export function FeaturedMoviesSection({ movies }: FeaturedMoviesSectionProps) {
  const activeMovies = movies.filter((m) => m.isActive).slice(0, 4);

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="lg">
        Estrenos Destacados
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        {activeMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
