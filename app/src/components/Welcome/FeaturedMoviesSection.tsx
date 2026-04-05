'use client';

import {
  Container,
  Group,
  Stack,
  Title,
  Text,
  Button,
  SimpleGrid,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { MovieCard } from '@/components/movies/MovieCard/MovieCard';

// Recibimos la data ya procesada por el servidor
interface FeaturedMoviesSectionProps {
  movies: any[]; // Idealmente, usa tu interfaz: Movie[]
}

export function FeaturedMoviesSection({ movies }: FeaturedMoviesSectionProps) {
  return (
    <Container size="xl" py={80}>
      <Group justify="space-between" mb="xl">
        <Stack gap={0}>
          <Title order={2} size="h1">
            Ahora en Cines
          </Title>
          <Text c="dimmed" size="lg">
            No te pierdas las películas de las que todos hablan.
          </Text>
        </Stack>
        <Button
          variant="subtle"
          rightSection={<IconChevronRight size={16} />}
          component={Link}
          href="/movies"
        >
          Ver todo el catálogo
        </Button>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
