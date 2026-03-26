'use client';

import { Container, Stack } from '@mantine/core';
import { ImplementationDevTools } from '@/components/common/ImplementationDevTools/ImplementationDevTools';
import { useMovieFilters } from '@/hooks/useMovieFilters';
import { MovieCatalogHeader } from '@/components/movies/MovieCatalogHeader/MovieCatalogHeader';
import { MovieGrid } from '@/components/movies/MovieGrid/MovieGrid';
import { DUMMY_MOVIES } from '@/data/MoviesDummy';


export default function MoviesPage() {
  const { state, actions, filteredMovies } = useMovieFilters(DUMMY_MOVIES);

  return (
    <Container size={'xl'} py={'xl'}>
      <ImplementationDevTools
        isManual={state.isManual}
        onChange={actions.setIsManual}
      />

      <Stack gap={'xl'}>
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
    </Container>
  );
}