'use client';

import { Paper, TextInput, ActionIcon, Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useScreeningManagement } from '@/hooks/useScreeningManagement';
import {
  ActionButtons,
  DateTimeCell,
} from '@/components/movie-screenings/ScreeningTableCells/ScreeningTableCells';
import { MovieScreening } from '@/schemas/movie-screening';

interface ScreeningsTableProps {
  initialData: MovieScreening[];
}

export default function ScreeningsTable({ initialData }: ScreeningsTableProps) {

  const {
    page,
    setPage,
    query,
    setQuery,
    sortStatus,
    setSortStatus,
    records,
    total,
    pageSize,
  } = useScreeningManagement(initialData);
  return (
    <Paper withBorder radius="md" shadow="xs">
      <DataTable
        idAccessor="id"
        height={550}
        withTableBorder
        records={records}
        totalRecords={total}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={setPage}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        columns={[
          {
            accessor: 'movie.title',
            title: 'Película',
            sortable: true,
            filter: (
              <TextInput
                placeholder="Buscar película..."
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
            render: ({ movie }: MovieScreening) => (
              <Text fw={600} size="sm">
                {movie.title}
              </Text>
            ),
          },
          {
            accessor: 'start',
            title: 'Inicio',
            sortable: true,
            render: ({ start }: MovieScreening) => (
              <DateTimeCell date={start} />
            ),
          },
          {
            accessor: 'end',
            title: 'Fin',
            sortable: true,
            render: ({ end }: MovieScreening) => <DateTimeCell date={end} />,
          },
          {
            accessor: 'room.cinema.name',
            title: 'Cine',
            sortable: true,
          },
          {
            accessor: 'room.cinema.municipality.name',
            title: 'Municipio',
            sortable: true,
          },
          {
            accessor: 'ticketsRemaining',
            title: 'Tickets',
            textAlign: 'right',
            sortable: true,
            render: ({ ticketsRemaining }: MovieScreening) => (
              <Text fw={700} c={ticketsRemaining < 15 ? 'red' : 'green'}>
                {ticketsRemaining}
              </Text>
            ),
          },
          {
            accessor: 'actions',
            title: 'Acciones',
            textAlign: 'right',
            render: (record: MovieScreening) => (
              <ActionButtons
                id={record.id}
                basePath="/admin/movie-screenings"
              />
            ),
          },
        ]}
      />
    </Paper>
  );
}
