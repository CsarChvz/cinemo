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

// 1. Dummy Data (Podemos agregar el estado 'isActive')
const DUMMY_MOVIES = [
  {
    id: 1,
    title: 'Interstellar',
    genre: MovieGenre.CIENCIA_FICCION,
    clasification: MovieClasification.B,
    duration: '169 min',
    posterUrl:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
    isActive: true,
  },
  {
    id: 2,
    title: 'The Dark Knight',
    genre: MovieGenre.ACCION,
    clasification: MovieClasification.B15,
    duration: '152 min',
    posterUrl:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
    isActive: true,
  },
  {
    id: 3,
    title: 'Spider-Man: Across the Spider-Verse',
    genre: MovieGenre.ANIMACION,
    clasification: MovieClasification.A,
    duration: '140 min',
    posterUrl:
      'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800',
    isActive: false,
  },
];

export default function AdminMoviesDashboard() {
  // 2. Estados para los filtros
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOrder>(SortOrder.DEFAULT);
  const [genres, setGenres] = useState<MovieGenre[]>([]);
  const [clasifications, setClasifications] = useState<MovieClasification[]>(
    []
  );
  const [isManual, setIsManual] = useState(false);

  // Cargar estado inicial del LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('manual-implementation');
    if (saved !== null) setIsManual(JSON.parse(saved));
  }, []);

  // 3. Lógica de filtrado (Misma que la de usuario)
  const filteredMovies = useMemo(() => {
    let result = [...DUMMY_MOVIES];

    if (!isManual) {
      if (search) {
        result = result.filter((m) =>
          m.title.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (genres.length > 0) {
        result = result.filter((m) => genres.includes(m.genre));
      }
      if (clasifications.length > 0) {
        result = result.filter((m) => clasifications.includes(m.clasification));
      }
      if (sort === SortOrder.ASCENDING) {
        result.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sort === SortOrder.DESCENDING) {
        result.sort((a, b) => b.title.localeCompare(a.title));
      }
    }
    return result;
  }, [search, sort, genres, clasifications, isManual]);

  // Handlers para las acciones de Admin
  const handleDelete = (id: number) => console.log('Eliminando película:', id);
  const handleToggleStatus = (id: number) =>
    console.log('Cambiando estado de:', id);

  return (
    <Container size="xl" py="xl">
      <ImplementationDevTools isManual={isManual} onChange={setIsManual} />

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

        {/* Toolbar de Filtros Reutilizada */}
        <Group justify="space-between">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            style={{ flex: 1 }}
          />
          <Group gap="xs">
            <SortButton value={sort} onChange={setSort} />
            <GenreFilter value={genres} onApply={setGenres} />
            <ClasificationFilter
              value={clasifications}
              onApply={setClasifications}
            />
          </Group>
        </Group>

        {/* Grid de Películas con AdminMovieCard */}
        {filteredMovies.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
            {filteredMovies.map((movie) => (
              <AdminMovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                isActive={movie.isActive}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Center py={100}>
            <Stack align="center" gap="xs">
              <Text fw={700} fz="lg">
                No hay películas que coincidan
              </Text>
              <Text c="dimmed">Prueba limpiando los filtros de búsqueda.</Text>
            </Stack>
          </Center>
        )}
      </Stack>
    </Container>
  );
}
