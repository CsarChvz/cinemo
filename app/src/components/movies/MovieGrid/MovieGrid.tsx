import { Movie } from "@/interfaces/movie.interface";
import { Center, SimpleGrid, Stack, Text } from "@mantine/core";
import { MovieCard } from "../MovieCard/MovieCard";
import { AdminMovieCard } from '../AdminMovieCard/AdminMovieCard';

interface MovieGridProps {
  movies: Movie[];
  adminView: boolean;
  handleDelete?: (id: number) => void;
  handleToggleStatus?: (id: number) => void;
}

export function MovieGrid({
  movies,
  adminView = false,
  handleToggleStatus,
  handleDelete,
}: MovieGridProps) {
  if (movies.length == 0) {
    return (
      <Center py={'xl'}>
        <Stack align="center">
          <Text fw={700}>No encontramos resultados</Text>
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
            id={movie.id ?? 0}
            title={movie.title}
            posterUrl={movie.posterUrl}
            // @TODO; Cambiar esto o ver que hacer en la request
            isActive={false}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        ) : (
          <MovieCard
            key={movie.id}
            id={movie.id ?? 0}
            title={movie.title}
            genre={movie.genre}
            clasification={movie.clasification}
            duration={movie.duration}
            description={movie.description}
            posterUrl={movie.posterUrl}
            onViewDetails={() => console.log('Ver:', movie.title)}
          />
        )
      )}
    </SimpleGrid>
  );
}
