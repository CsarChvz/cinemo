import { useState, useMemo, useEffect } from 'react';
import { DataTableSortStatus } from 'mantine-datatable';
import { useDebouncedValue } from '@mantine/hooks';
import sortBy from 'lodash/sortBy';
import { MovieScreening } from '@/interfaces/movie_screening.interface';

export function useScreeningManagement(initialData: MovieScreening[]) {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);

  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<MovieScreening>
  >({
    columnAccessor: 'start',
    direction: 'asc',
  });

  // Resetear página al buscar
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const { records, total } = useMemo(() => {
    // 1. Filtrar
    let result = initialData.filter(({ movie, cinema, municipality }) => {
      const searchStr =
        `${movie.title} ${cinema} ${municipality}`.toLowerCase();
      return searchStr.includes(debouncedQuery.trim().toLowerCase());
    });

    // 2. Ordenar
    result = sortBy(result, sortStatus.columnAccessor);
    if (sortStatus.direction === 'desc') result.reverse();

    // 3. Paginar
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    return {
      records: result.slice(from, to),
      total: result.length,
    };
  }, [debouncedQuery, sortStatus, page, pageSize, initialData]);

  return {
    page,
    setPage,
    query,
    setQuery,
    sortStatus,
    setSortStatus,
    records,
    total,
    pageSize,
  };
}
