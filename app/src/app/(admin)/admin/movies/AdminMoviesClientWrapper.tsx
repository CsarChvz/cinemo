'use client';

import { Group, Stack, Title, Text, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

import { useMovieFilters } from '@/hooks/useMovieFilters';
import { MovieCatalogHeader } from '@/components/movies/MovieCatalogHeader/MovieCatalogHeader';
import { MovieGrid } from '@/components/movies/MovieGrid/MovieGrid';

// Definimos la interfaz para las props que recibe del servidor
interface AdminMoviesClientWrapperProps {
  initialMovies: any[]; // Idealmente, cambia 'any[]' por tu tipo exacto (ej: Movie[])
}

export function AdminMoviesClientWrapper({
  initialMovies,
}: AdminMoviesClientWrapperProps) {
  // Inicializamos tus filtros con los datos que vinieron del servidor
  const { state, actions, filteredMovies } = useMovieFilters(initialMovies);

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-start">
        <div>

        </div>

        <Button
          component={Link}
          href="/admin/movies/nueva"
          leftSection={<IconPlus size={18} />}
          size="md"
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
        >
          Nueva Película
        </Button>
      </Group>

      <Stack gap="xl">
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

        {/* Pasamos filteredMovies al grid, manteniendo tu vista de admin */}
        <MovieGrid movies={filteredMovies} adminView={true} />
      </Stack>
    </Stack>
  );
}
