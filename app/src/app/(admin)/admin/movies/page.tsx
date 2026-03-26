'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Container,
  SimpleGrid,
  Stack,
  Group,
  Title,
  Text,
  Center,
  Button,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

// Componentes de filtrado (Reutilizados)
import { SearchBar } from '@/components/movies/SearchBar/SearchBar';
import { SortButton } from '@/components/movies/SortButton/SortButton';
import { GenreFilter } from '@/components/movies/GenreFilter/GenreFilter';
import { ClasificationFilter } from '@/components/movies/ClasificactionFilter/ClasificationFilter';
import { ImplementationDevTools } from '@/components/common/ImplementationDevTools/ImplementationDevTools';

// El nuevo componente de Admin
import { AdminMovieCard } from '@/components/movies/AdminMovieCard/AdminMovieCard';

// Interfaces y Enums
import { MovieGenre, MovieClasification } from '@/interfaces/movie.interface';
import { SortOrder } from '@/interfaces/filter.interface';
import { DUMMY_MOVIES } from '@/data/MoviesDummy';
import { MovieGrid } from '@/components/movies/MovieGrid/MovieGrid';
import { useMovieFilters } from '@/hooks/useMovieFilters';
import { MovieCatalogHeader } from '@/components/movies/MovieCatalogHeader/MovieCatalogHeader';


export default function AdminMoviesDashboard() {
  // 2. Estados para los filtros
  const { state, actions, filteredMovies } = useMovieFilters(DUMMY_MOVIES);

  // Handlers para las acciones de Admin
  const handleDelete = (id: number) => console.log('Eliminando película:', id);
  const handleToggleStatus = (id: number) =>
    console.log('Cambiando estado de:', id);

  return (
    <Container size="xl" py="xl">
      <ImplementationDevTools
        isManual={state.isManual}
        onChange={actions.setIsManual}
      />

      <Stack gap="xl">
        <Group justify="space-between" align="flex-start">
          <div>
            <Title order={1}>Gestión de Películas</Title>
            <Text c="dimmed">Administra las peliculas que se tienen</Text>
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

          <MovieGrid movies={filteredMovies} adminView={true} />
        </Stack>
      </Stack>
    </Container>
  );
}
