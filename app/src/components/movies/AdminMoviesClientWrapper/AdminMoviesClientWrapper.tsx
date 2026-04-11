'use client';

import { Group, Stack, Title, Text, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

import { useMovieFilters } from '@/hooks/useMovieFilters';
import { MovieCatalogHeader } from '@/components/movies/MovieCatalogHeader/MovieCatalogHeader';
import { MovieGrid } from '@/components/movies/MovieGrid/MovieGrid';
import { Movie } from '@/schemas/movie';

interface AdminMoviesClientWrapperProps {
  initialMovies: Movie[];
}

export function AdminMoviesClientWrapper({
  initialMovies,
}: AdminMoviesClientWrapperProps) {
  // El hook useMovieFilters se encarga de la lógica de búsqueda, filtrado y ordenamiento en memoria [cite: 107, 197, 198]
  const { state, actions, filteredMovies } = useMovieFilters(initialMovies);

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-start">
        <Stack gap={0}>
          <Title order={2}>Catálogo de Películas</Title>
          <Text c="dimmed" size="sm">
            Administra la cartelera y visualiza el catálogo disponible.
          </Text>
        </Stack>

        <Button
          component={Link}
          href="/admin/movies/create"
          leftSection={<IconPlus size={18} />}
          size="md"
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
        >
          Nueva Película
        </Button>
      </Group>

      <Stack gap="xl">
        {/* Cabecera que contiene los controles de búsqueda, ordenamiento y filtros de género/clasificación [cite: 286] */}
        <MovieCatalogHeader
          search={state.search}
          onSearchChange={actions.setSearch}
          sort={state.sort}
          onSortChange={actions.setSort}
          genres={state.genres}
          onGenresChange={actions.setGenres}
          clasifications={state.clasifications}
          onClasificationsChange={actions.setClasifications}
        />

        <MovieGrid movies={filteredMovies} adminView={true} />
      </Stack>
    </Stack>
  );
}
