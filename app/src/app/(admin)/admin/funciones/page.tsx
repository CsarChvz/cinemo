'use client';

import {
  Container,
  Stack,
  Group,
  Title,
  Text,
  Button,
  Paper,
  TextInput,
  ActionIcon,
} from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconPlus, IconSearch, IconX } from '@tabler/icons-react';
import { useScreeningManagement } from '@/hooks/useScreeningManagement';
import { DUMMY_SCREENINGS } from '@/data/MoviesDummy';
import {
  ActionButtons,
  DateTimeCell,
} from '@/components/movie-screenings/ScreeningTableCells/ScreeningTableCells';


export default function GestionFuncionesPage() {
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
  } = useScreeningManagement(DUMMY_SCREENINGS);

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        {/* HEADER SECTION */}
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

        {/* TABLE SECTION */}
        <Paper withBorder radius="md" shadow="xs">
          <DataTable
            idAccessor={(record) =>
              record.movie.id?.toString() || record.movie.title
            }
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
                    placeholder="Buscar..."
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
                render: ({ movie }) => (
                  <Text fw={600} size="sm">
                    {movie.title}
                  </Text>
                ),
              },
              {
                accessor: 'start',
                title: 'Inicio',
                sortable: true,
                render: ({ start }) => <DateTimeCell date={start} />,
              },
              {
                accessor: 'end',
                title: 'Fin',
                sortable: true,
                render: ({ end }) => <DateTimeCell date={end} />,
              },
              { accessor: 'cinema', title: 'Cine', sortable: true },
              { accessor: 'municipality', title: 'Municipio', sortable: true },
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
                title: 'Acciones',
                textAlign: 'right',
                render: () => <ActionButtons />,
              },
            ]}
          />
        </Paper>
      </Stack>
    </Container>
  );
}
