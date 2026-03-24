'use client';

import { useEffect, useMemo, useState } from 'react';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import {
  TextInput,
  MultiSelect,
  Group,
  Title,
  Text,
  Container,
  Button,
  ActionIcon,
  Stack,
  Badge,
  Paper,
  Box,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import {
  IconSearch,
  IconX,
  IconPlus,
  IconEye,
  IconEdit,
  IconTrash,
  IconCalendar,
  IconClock,
} from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';
import dayjs from 'dayjs'; // Recomendado para manejar fechas
import { MovieScreening } from '@/interfaces/movie_screening.interface';
import { MovieGenre } from '@/interfaces/movie.interface';

// 1. Datos de prueba con los nuevos campos de Fecha/Hora
const DUMMY_SCREENINGS: MovieScreening[] = [
  {
    movie: {
      id: 1,
      title: 'Interstellar',
      genre: MovieGenre.CIENCIA_FICCION,
      posterUrl: '',
      duration: '169 min',
      description: '',
      director: '',
      producer: '',
      clasification: 'B' as any,
      releaseYear: 2014,
    },
    state: 'Jalisco',
    municipality: 'Zapopan',
    cinema: 'Cinepolis La Gran Plaza',
    location: 'Sala 4',
    start: new Date('2026-03-25T18:30:00'),
    end: new Date('2026-03-25T21:19:00'),
    tickets_remaining: 45,
  },
  {
    movie: {
      id: 2,
      title: 'The Dark Knight',
      genre: MovieGenre.ACCION,
      posterUrl: '',
      duration: '152 min',
      description: '',
      director: '',
      producer: '',
      clasification: 'B15' as any,
      releaseYear: 2008,
    },
    state: 'CDMX',
    municipality: 'Coyoacán',
    cinema: 'Cinemex Oasis Lumina',
    location: 'Sala VIP 1',
    start: new Date('2026-03-25T21:00:00'),
    end: new Date('2026-03-25T23:32:00'),
    tickets_remaining: 12,
  },
];

const PAGE_SIZE = 10;

export default function GestionFuncionesPage() {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState<MovieScreening[]>([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Estado de Ordenamiento actualizado
  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<MovieScreening>
  >({
    columnAccessor: 'start', // Ordenar por fecha por defecto
    direction: 'asc',
  });

  useEffect(() => {
    // A. Filtrar
    let filteredData = DUMMY_SCREENINGS.filter(
      ({ movie, cinema, municipality }) => {
        if (
          debouncedQuery !== '' &&
          !`${movie.title} ${cinema} ${municipality}`
            .toLowerCase()
            .includes(debouncedQuery.trim().toLowerCase())
        )
          return false;
        if (selectedGenres.length && !selectedGenres.includes(movie.genre))
          return false;
        return true;
      }
    );

    // B. Ordenar (sortBy de lodash funciona bien con fechas/objetos Date)
    const sortedData = sortBy(filteredData, sortStatus.columnAccessor);
    const finalData =
      sortStatus.direction === 'desc' ? sortedData.reverse() : sortedData;

    // C. Paginar
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(finalData.slice(from, to));
  }, [debouncedQuery, selectedGenres, sortStatus, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, selectedGenres]);

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <Stack gap={0}>
            <Title order={2}>Gestión de Funciones</Title>
            <Text c="dimmed" fz="sm">
              Administra horarios, disponibilidad y complejos.
            </Text>
          </Stack>
          <Button leftSection={<IconPlus size={18} />} variant="filled">
            Nueva Función
          </Button>
        </Group>

        <Paper withBorder radius="md" shadow="xs">
          <DataTable
            height={550}
            withTableBorder
            withColumnBorders
            striped
            highlightOnHover
            idAccessor={(record) =>
              record.movie.id?.toString() || record.movie.title
            }
            records={records}
            totalRecords={DUMMY_SCREENINGS.length}
            recordsPerPage={PAGE_SIZE}
            page={page}
            onPageChange={setPage}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            columns={[
              {
                accessor: 'movie.title',
                title: 'Película',
                sortable: true,
                render: ({ movie }) => (
                  <Text fw={600} size="sm">
                    {movie.title}
                  </Text>
                ),
                filter: (
                  <TextInput
                    label="Buscar película"
                    placeholder="Título, cine o municipio..."
                    leftSection={<IconSearch size={16} />}
                    rightSection={
                      <ActionIcon
                        size="sm"
                        variant="transparent"
                        onClick={() => setQuery('')}
                      >
                        <IconX size={14} />
                      </ActionIcon>
                    }
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                  />
                ),
                filtering: query !== '',
              },

              {
                accessor: 'start',
                title: 'Inicio',
                sortable: true,
                render: ({ start }) => (
                  <Stack gap={0}>
                    <Group gap={4} wrap="nowrap">
                      <IconCalendar size={14} color="gray" />
                      <Text size="sm">{dayjs(start).format('DD/MM/YYYY')}</Text>
                    </Group>
                    <Group gap={4} wrap="nowrap">
                      <IconClock size={14} color="blue" />
                      <Text size="xs" c="dimmed" fw={700}>
                        {dayjs(start).format('hh:mm A')}
                      </Text>
                    </Group>
                  </Stack>
                ),
              },
              {
                accessor: 'end',
                title: 'Fin',
                sortable: true,
                render: ({ end }) => (
                  <Stack gap={0}>
                    <Group gap={4} wrap="nowrap">
                      <IconCalendar size={14} color="gray" />
                      <Text size="sm">{dayjs(end).format('DD/MM/YYYY')}</Text>
                    </Group>
                    <Group gap={4} wrap="nowrap">
                      <IconClock size={14} color="blue" />
                      <Text size="xs" c="dimmed" fw={700}>
                        {dayjs(end).format('hh:mm A')}
                      </Text>
                    </Group>
                  </Stack>
                ),
              },

              { accessor: 'cinema', title: 'Cine', sortable: true },
              { accessor: 'municipality', title: 'Municipio', sortable: true },
              { accessor: 'location', title: 'Sala', sortable: true },
              {
                accessor: 'tickets_remaining',
                title: 'Tickets',
                textAlign: 'right',
                sortable: true,
                render: ({ tickets_remaining }) => (
                  <Text fw={700} c={tickets_remaining < 15 ? 'red' : 'green'}>
                    {tickets_remaining}
                  </Text>
                ),
              },
              {
                accessor: 'actions',
                title: <Box mr={6}>Acciones</Box>,
                textAlign: 'right',
                render: (screening) => (
                  <Group gap={4} justify="right" wrap="nowrap">
                    <ActionIcon size="sm" variant="subtle" color="green">
                      <IconEye size={16} />
                    </ActionIcon>
                    <ActionIcon size="sm" variant="subtle" color="blue">
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon size="sm" variant="subtle" color="red">
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                ),
              },
            ]}
          />
        </Paper>
      </Stack>
    </Container>
  );
}
