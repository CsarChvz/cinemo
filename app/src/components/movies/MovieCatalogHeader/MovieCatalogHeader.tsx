import { Stack, Title, Text, Group } from '@mantine/core';
import { SearchBar } from '@/components/movies/SearchBar/SearchBar';
import { SortButton } from '@/components/movies/SortButton/SortButton';
import { GenreFilter } from '@/components/movies/GenreFilter/GenreFilter';

// Importamos los tipos necesarios
import { SortOrder } from '@/interfaces/filter.interface';
import { MovieClassification, MovieGenre } from '@/schemas/movie';
import { ClassificationFilter } from '../ClasificactionFilter/ClasificationFilter';

// 1. Definimos la Interface
interface MovieCatalogHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortOrder;
  onSortChange: (value: SortOrder) => void;
  genres: MovieGenre[];
  onGenresChange: (genres: MovieGenre[]) => void;
  clasifications: MovieClassification[];
  onClasificationsChange: (clasifications: MovieClassification[]) => void;
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

          <ClassificationFilter
            value={clasifications}
            onApply={onClasificationsChange}
          />
        </Group>
      </Group>
    </header>
  );
}
