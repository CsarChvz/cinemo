import { Movie } from "@/interfaces/movie.interface";
import { Center, SimpleGrid, Stack, Text } from "@mantine/core";
import { MovieCard } from "../MovieCard/MovieCard";

interface MovieGridProps {
    movies: Movie[]
}

export function MovieGrid({movies}: MovieGridProps){
    if(movies.length == 0){
        return (
        <Center py={"xl"}>
            <Stack align="center">
                <Text fw={700}>
                    No encontramos resultados
                </Text>
            </Stack>
        </Center>)
    }

    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {movies.map((movie: Movie) => (
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
        ))}
      </SimpleGrid>
    );
}
