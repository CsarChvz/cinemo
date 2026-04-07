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
  const { state, actions, filteredMovies } = useMovieFilters(initialMovies);

  const handleDelete = (id: number) => console.log('Eliminando', id);
  const handleToggleStatus = (id: number) =>
    console.log('Cambiando status', id);

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-start">
        {/* Llenamos el div vacío para darle contexto a la pantalla */}
        <div>
          <Title order={2}>Catálogo de Películas</Title>
          <Text c="dimmed" size="sm">
            Administra la cartelera, activa o desactiva películas.
          </Text>
        </div>

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

        <MovieGrid
          movies={filteredMovies}
          adminView={true}
          handleDelete={handleDelete}
          handleToggleStatus={handleToggleStatus}
        />
      </Stack>
    </Stack>
  );
}
