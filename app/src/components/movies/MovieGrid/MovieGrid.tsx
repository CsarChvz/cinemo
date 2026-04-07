import { Movie } from '@/schemas/movie';
import { Center, SimpleGrid, Stack, Text } from '@mantine/core';
import { MovieCard } from '../MovieCard/MovieCard';
import { AdminMovieCard } from '../AdminMovieCard/AdminMovieCard';

interface MovieGridProps {
  movies: Movie[];
  adminView?: boolean;
  handleDelete?: (id: number) => void;
  handleToggleStatus?: (id: number) => void;
}

export function MovieGrid({
  movies,
  adminView = false,
  handleToggleStatus,
  handleDelete,
}: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <Center py="xl" h={200}>
        <Stack align="center" gap="xs">
          <Text fw={700} size="lg" c="dimmed">
            No encontramos resultados
          </Text>
          <Text size="sm" c="dimmed">
            Intenta ajustando los filtros de búsqueda.
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
      {movies.map((movie: Movie) =>
        adminView ? (
          <AdminMovieCard
            key={movie.id}
            movie={movie}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        ) : (
          <MovieCard key={movie.id} movie={movie} />
        )
      )}
    </SimpleGrid>
  );
}
