import { useState, useMemo, useEffect } from 'react';
import { DataTableSortStatus } from 'mantine-datatable';

interface useLocationTableManagementProps<T> {
  initialData: T[];
  filterFn: (item: T, query: string) => boolean;
  defaultSortColumn: keyof T;
  pageSize?: number; // Opcional, por defecto será 10
}

export function useLocationTableManagement<T>({
  initialData,
  filterFn,
  defaultSortColumn,
  pageSize = 10,
}: useLocationTableManagementProps<T>) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: defaultSortColumn as string,
    direction: 'asc',
  });

  // Resetear a la página 1 cada vez que el usuario escribe en el buscador
  useEffect(() => {
    setPage(1);
  }, [query]);

  // 1. Lógica de Filtrado
  const filteredData = useMemo(() => {
    //if (!query.trim()) return initialData;
    return initialData.filter((item) => filterFn(item, query));
  }, [initialData, query, filterFn]);

  // 2. Lógica de Ordenamiento
  const sortedData = useMemo(() => {
    const data = [...filteredData];

    data.sort((a, b) => {
      const valueA = a[sortStatus.columnAccessor as keyof T];
      const valueB = b[sortStatus.columnAccessor as keyof T];

      if (valueA == null) return sortStatus.direction === 'asc' ? 1 : -1;
      if (valueB == null) return sortStatus.direction === 'asc' ? -1 : 1;

      if (valueA < valueB) return sortStatus.direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortStatus.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [filteredData, sortStatus]);

  // 3. Lógica de Paginación (Corta el arreglo ordenado)
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, page, pageSize]);

  return {
    query,
    setQuery,
    sortStatus,
    setSortStatus,
    page,
    setPage,
    pageSize,
    totalRecords: sortedData.length,
    records: paginatedData, 
  };
}
