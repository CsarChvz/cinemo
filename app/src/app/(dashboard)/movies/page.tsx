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
} from '@mantine/core';

// Componentes que creamos
import { SearchBar } from '@/components/movies/SearchBar/SearchBar';
import { SortButton } from '@/components/movies/SortButton/SortButton';
import { GenreFilter } from '@/components/movies/GenreFilter/GenreFilter';
import { MovieCard } from '@/components/movies/MovieCard/MovieCard';

// Interfaces y Enums
import { MovieGenre, MovieClasification } from '@/interfaces/movie.interface';
import { SortOrder } from '@/interfaces/filter.interface';
import { ClasificationFilter } from '@/components/movies/ClasificactionFilter/ClasificationFilter';
import { ImplementationDevTools } from '@/components/common/ImplementationDevTools/ImplementationDevTools';

// 1. Dummy Data
const DUMMY_MOVIES = [
  {
    id: 1,
    title: 'Interstellar',
    genre: MovieGenre.CIENCIA_FICCION,
    clasification: MovieClasification.B,
    duration: '169 min',
    posterUrl:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
    description:
      'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio.',
  },
  {
    id: 2,
    title: 'The Dark Knight',
    genre: MovieGenre.ACCION,
    clasification: MovieClasification.B15,
    duration: '152 min',
    posterUrl:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
    description:
      'Batman se enfrenta al Joker en una lucha por el alma de Gotham.',
  },
  {
    id: 3,
    title: 'Spider-Man: Across the Spider-Verse',
    genre: MovieGenre.ANIMACION,
    clasification: MovieClasification.A,
    duration: '140 min',
    posterUrl:
      'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800',
    description: 'Miles Morales se lanza a través del Multiverso.',
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    genre: MovieGenre.DRAMA,
    clasification: MovieClasification.C,
    duration: '154 min',
    posterUrl:
      'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800',
    description:
      'Las vidas de dos asesinos a sueldo, un boxeador y una mujer se entrelazan.',
  },
  {
    id: 5,
    title: 'Inception',
    genre: MovieGenre.CIENCIA_FICCION,
    clasification: MovieClasification.B,
    duration: '148 min',
    posterUrl:
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800',
    description: 'Un ladrón que roba secretos a través del subconsciente.',
  },
  {
    id: 6,
    title: 'Shrek',
    genre: MovieGenre.COMEDIA,
    clasification: MovieClasification.AA,
    duration: '90 min',
    posterUrl:
      'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=800',
    description:
      'Un ogro cuya soledad es interrumpida por personajes de cuentos de hadas.',
  },
];

export default function MoviesPage() {
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

  // 2. Lógica de filtrado con "Bypass" manual
  const filteredMovies = useMemo(() => {
    let result = [...DUMMY_MOVIES];

    // SI LA IMPLEMENTACIÓN MANUAL ESTÁ DESACTIVADA, USAMOS EL FILTRADO AUTO
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
    } else {
      // AQUÍ ES DONDE TÚ PODRÁS METER MANO A LA VARIABLE 'result'
      // Por ahora devuelve todo, pero aquí es tu zona de juegos.
      console.log(
        'Modo manual activo: Los filtros automáticos están ignorados.'
      );

      /** * TODO: César, aquí puedes implementar tus propios algoritmos:
       * 1. Algoritmos de búsqueda (Búsqueda lineal, binaria, etc.)
       * 2. Algoritmos de ordenamiento (QuickSort, BubbleSort, MergeSort, etc.)
       */
    }

    return result;
  }, [search, sort, genres, clasifications, isManual]);
  return (
    <Container size="xl" py="xl">
      <ImplementationDevTools isManual={isManual} onChange={setIsManual} />
      <Stack gap="xl">
        <header>
          <Title order={1} mb="xs">
            Catálogo de Películas
          </Title>
          <Text c="dimmed" mb="lg">
            Explora nuestra selección de cine.
          </Text>

          {/* Toolbar: Search [Sort] [Filters] */}
          <Group justify="space-between" align="flex-end">
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
        </header>

        {/* 4. Grid Responsive 4x4 (4 columnas en desktop, menos en móvil) */}
        {filteredMovies.length > 0 ? (
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
            spacing="lg"
            verticalSpacing="xl"
          >
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
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
        ) : (
          <Center py="xl">
            <Stack align="center" gap="xs">
              <Text fw={700} fz="lg">
                No encontramos resultados
              </Text>
              <Text c="dimmed">
                Intenta ajustando los filtros o la búsqueda.
              </Text>
            </Stack>
          </Center>
        )}
      </Stack>
    </Container>
  );
}
