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
  Tooltip,
} from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import {
  IconPlus,
  IconSearch,
  IconX,
  IconEdit,
  IconTrash,
  IconMapPin,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useLocationTableManagement } from '@/hooks/useLocationTablesManagement';

// 1. Extendemos Record<string, any>
interface CinemaRecord extends Record<string, any> {
  id: string;
  name: string;
  address: string;
  municipality: string;
  state: string;
}

const DUMMY_CINEMAS: CinemaRecord[] = [
  {
    id: '1',
    name: 'Cinemo Andares',
    address: 'Blvd. Puerta de Hierro',
    municipality: 'Zapopan',
    state: 'Jalisco',
  },
  {
    id: '2',
    name: 'Cinemo Galerías',
    address: 'Av. Rafael Sanzio',
    municipality: 'Zapopan',
    state: 'Jalisco',
  },
  {
    id: '3',
    name: 'Cinemo Punto Valle',
    address: 'Rio Missouri',
    municipality: 'San Pedro Garza García',
    state: 'Nuevo León',
  },
  {
    id: '4',
    name: 'Cinemo Centro',
    address: 'Av. Juárez',
    municipality: 'Guadalajara',
    state: 'Jalisco',
  },
  {
    id: '5',
    name: 'Cinemo Fundidora',
    address: 'Av. Madero',
    municipality: 'Monterrey',
    state: 'Nuevo León',
  },
  {
    id: '6',
    name: 'Cinemo Forum',
    address: 'Blvd. Marcelino García',
    municipality: 'Tlaquepaque',
    state: 'Jalisco',
  },
];

export default function CinemasListPage() {
  // 2. Usamos el Hook
  const {
    records,
    query,
    setQuery,
    sortStatus,
    setSortStatus,
    page,
    setPage,
    totalRecords,
    pageSize,
  } = useLocationTableManagement<CinemaRecord>({
    initialData: DUMMY_CINEMAS,
    defaultSortColumn: 'name',
    pageSize: 5,
    filterFn: (item, q) =>
      item.name.toLowerCase().includes(q.toLowerCase()) ||
      item.municipality.toLowerCase().includes(q.toLowerCase()) ||
      item.state.toLowerCase().includes(q.toLowerCase()),
  });

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <Stack gap={0}>
            <Title order={2}>Catálogo de Cines</Title>
            <Text c="dimmed" fz="sm">
              Administra las sucursales y sus ubicaciones.
            </Text>
          </Stack>
          <Button
            component={Link}
            href="/admin/locations/cinemas/create"
            leftSection={<IconPlus size={18} />}
            variant="filled"
            color="violet"
          >
            Nuevo Cine
          </Button>
        </Group>

        <Paper withBorder radius="md" shadow="xs">
          <DataTable
            idAccessor="id"
            height={550}
            withTableBorder
            // 3. Conectamos los datos y paginación
            records={records}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            totalRecords={totalRecords}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={setPage}
            columns={[
              {
                accessor: 'name',
                title: 'Nombre del Complejo',
                sortable: true,
                filter: (
                  <TextInput
                    placeholder="Buscar cine o ubicación..."
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
                // 4. Tipamos los render
                render: ({ name }: any) => (
                  <Text fw={600} size="sm">
                    {name}
                  </Text>
                ),
              },
              {
                accessor: 'location',
                title: 'Ubicación',
                render: ({ municipality, state }: any) => (
                  <Group gap="xs">
                    <IconMapPin size={16} color="gray" />
                    <Text size="sm">
                      {municipality}, {state}
                    </Text>
                  </Group>
                ),
              },
              {
                accessor: 'address',
                title: 'Dirección',
                render: ({ address }: any) => (
                  <Text size="sm" c="dimmed" truncate="end" maw={250}>
                    {address}
                  </Text>
                ),
              },
              {
                accessor: 'actions',
                title: 'Acciones',
                textAlign: 'right',
                render: ({ id }: any) => (
                  <Group gap={4} justify="right" wrap="nowrap">
                    <Tooltip label="Editar">
                      <ActionIcon
                        component={Link}
                        href={`/admin/locations/cinemas/edit/${id}`}
                        size="sm"
                        variant="subtle"
                        color="blue"
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Eliminar">
                      <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="red"
                        onClick={() => console.log('Eliminar ID:', id)}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Tooltip>
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
