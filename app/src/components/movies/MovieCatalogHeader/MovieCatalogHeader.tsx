import { Stack, Title, Text, Group } from '@mantine/core';
import { SearchBar } from '@/components/movies/SearchBar/SearchBar';
import { SortButton } from '@/components/movies/SortButton/SortButton';
import { GenreFilter } from '@/components/movies/GenreFilter/GenreFilter';
import { ClasificationFilter } from '@/components/movies/ClasificactionFilter/ClasificationFilter';

// Importamos los tipos necesarios
import { MovieGenre, MovieClasification } from '@/interfaces/movie.interface';
import { SortOrder } from '@/interfaces/filter.interface';

// 1. Definimos la Interface
interface MovieCatalogHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortOrder;
  onSortChange: (value: SortOrder) => void;
  genres: MovieGenre[];
  onGenresChange: (genres: MovieGenre[]) => void;
  clasifications: MovieClasification[];
  onClasificationsChange: (clasifications: MovieClasification[]) => void;
}

// 2. Aplicamos la interface al componente
export function MovieCatalogHeader({
  search,
  onSearchChange,
  sort,
  onSortChange,
  genres,
  onGenresChange,
  clasifications,
  onClasificationsChange,
}: MovieCatalogHeaderProps) {
  return (
    <header>
      <Stack gap="xs" mb="lg">
        <Title order={1}>Catálogo de Películas</Title>
        <Text c="dimmed">Explora nuestra selección de cine.</Text>
      </Stack>

      <Group justify="space-between" align="flex-end">
        <SearchBar
          value={search}
          onChange={(e) => onSearchChange(e.currentTarget.value)}
          style={{ flex: 1 }}
        />

        <Group gap="xs">
          <SortButton value={sort} onChange={onSortChange} />

          <GenreFilter value={genres} onApply={onGenresChange} />

          <ClasificationFilter
            value={clasifications}
            onApply={onClasificationsChange}
          />
        </Group>
      </Group>
    </header>
  );
}
