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
  Badge,
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

interface StateRecord extends Record<string, any> {
  id: string;
  name: string;
  code: string;
}


// Puedes duplicar estos datos falsos para que veas cómo funciona la paginación (si pones 12, verás 2 páginas)
const DUMMY_STATES: StateRecord[] = [
  { id: '1', name: 'Jalisco', code: 'JAL' },
  { id: '2', name: 'Ciudad de México', code: 'CDMX' },
  { id: '3', name: 'Nuevo León', code: 'NL' },
  { id: '4', name: 'Querétaro', code: 'QRO' },
  { id: '5', name: 'Puebla', code: 'PUE' },
  { id: '6', name: 'Yucatán', code: 'YUC' },
  { id: '7', name: 'Quintana Roo', code: 'QROO' },
  { id: '8', name: 'Sonora', code: 'SON' },
  { id: '9', name: 'Chihuahua', code: 'CHIH' },
  { id: '10', name: 'Sinaloa', code: 'SIN' },
  { id: '11', name: 'Baja California', code: 'BC' },
  { id: '12', name: 'Guanajuato', code: 'GTO' },
];

export default function StatesListPage() {
  const {
    records,
    query,
    setQuery,
    sortStatus,
    setSortStatus,
    // ¡Extraemos la paginación!
    page,
    setPage,
    totalRecords,
    pageSize,
  } = useLocationTableManagement<StateRecord>({
    initialData: DUMMY_STATES,
    defaultSortColumn: 'name',
    pageSize: 5, // Le decimos que muestre 5 por página para probar la paginación rápido
    filterFn: (item, q) =>
      item.name.toLowerCase().includes(q.toLowerCase()) ||
      item.code.toLowerCase().includes(q.toLowerCase()),
  });

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <Stack gap={0}>
            <Title order={2}>Catálogo de Estados</Title>
            <Text c="dimmed" fz="sm">
              Administra los estados donde tienes presencia.
            </Text>
          </Stack>
          <Button
            component={Link}
            href="/admin/locations/states/create"
            leftSection={<IconPlus size={18} />}
            variant="filled"
            color="indigo"
          >
            Nuevo Estado
          </Button>
        </Group>

        <Paper withBorder radius="md" shadow="xs">
          <DataTable
            idAccessor="id"
            height={550}
            withTableBorder
            // 1. Datos y Ordenamiento
            records={records}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            // 2. Paginación mágica
            totalRecords={totalRecords}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={setPage}
            columns={[
              {
                accessor: 'name',
                title: 'Estado',
                sortable: true,
                filter: (
                  <TextInput
                    placeholder="Buscar estado..."
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
                render: ({ name }: any) => (
                  <Text fw={600} size="sm">
                    {name}
                  </Text>
                ),
              },
              { accessor: 'code', title: 'Código', sortable: true },
              {
                accessor: 'actions',
                title: 'Acciones',
                textAlign: 'right',
                render: ({ id }) => (
                  <Group gap={4} justify="right" wrap="nowrap">
                    <Tooltip label="Editar">
                      <ActionIcon
                        component={Link}
                        href={`/admin/locations/states/edit/${id}`}
                        size="sm"
                        variant="subtle"
                        color="blue"
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Eliminar">
                      <ActionIcon size="sm" variant="subtle" color="red">
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
