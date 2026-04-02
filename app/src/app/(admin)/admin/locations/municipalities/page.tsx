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
} from '@tabler/icons-react';
import Link from 'next/link';
import { useLocationTableManagement } from '@/hooks/useLocationTablesManagement';

// 1. Extendemos Record<string, any>
interface MunicipalityRecord extends Record<string, any> {
  id: string;
  name: string;
  state: string;
}

const DUMMY_MUNICIPALITIES: MunicipalityRecord[] = [
  { id: '1', name: 'Zapopan', state: 'Jalisco' },
  { id: '2', name: 'Guadalajara', state: 'Jalisco' },
  { id: '3', name: 'Monterrey', state: 'Nuevo León' },
  { id: '4', name: 'San Pedro Garza García', state: 'Nuevo León' },
  { id: '5', name: 'Tlaquepaque', state: 'Jalisco' },
  { id: '6', name: 'San Nicolás de los Garza', state: 'Nuevo León' },
];

export default function MunicipalitiesListPage() {
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
  } = useLocationTableManagement<MunicipalityRecord>({
    initialData: DUMMY_MUNICIPALITIES,
    defaultSortColumn: 'name',
    pageSize: 5,
    filterFn: (item, q) =>
      item.name.toLowerCase().includes(q.toLowerCase()) ||
      item.state.toLowerCase().includes(q.toLowerCase()),
  });

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <Stack gap={0}>
            <Title order={2}>Gestión de Municipios</Title>
            <Text c="dimmed" fz="sm">
              Administra el catálogo de municipios y su relación con los
              estados.
            </Text>
          </Stack>
          <Button
            component={Link}
            href="/admin/locations/municipalities/create"
            leftSection={<IconPlus size={18} />}
            variant="filled"
          >
            Nuevo Municipio
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
                title: 'Municipio',
                sortable: true,
                filter: (
                  <TextInput
                    placeholder="Buscar municipio o estado..."
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
                accessor: 'state',
                title: 'Estado',
                sortable: true,
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
                        href={`/admin/locations/municipalities/edit/${id}`}
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
