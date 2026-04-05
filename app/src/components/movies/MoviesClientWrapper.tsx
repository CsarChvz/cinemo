'use client';

import { Stack } from '@mantine/core';
import { ImplementationDevTools } from '@/components/common/ImplementationDevTools/ImplementationDevTools';
import { useMovieFilters } from '@/hooks/useMovieFilters';
import { MovieCatalogHeader } from '@/components/movies/MovieCatalogHeader/MovieCatalogHeader';
import { MovieGrid } from '@/components/movies/MovieGrid/MovieGrid';
import { Movie } from '@/schemas/movie'; // Importa tu esquema de Zod

interface MoviesClientWrapperProps {
  initialMovies: Movie[];
}

export function MoviesClientWrapper({
  initialMovies,
}: MoviesClientWrapperProps) {
  // Inicializamos tu hook con las películas reales que vienen del servidor
  const { state, actions, filteredMovies } = useMovieFilters(initialMovies);

  return (
    <>
      <ImplementationDevTools
        isManual={state.isManual}
        onChange={actions.setIsManual}
      />

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

        <MovieGrid movies={filteredMovies} adminView={false} />
      </Stack>
    </>
  );
}
