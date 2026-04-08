// components/locations/CinemasTable.tsx
'use client';

import {
  Paper,
  TextInput,
  ActionIcon,
  Tooltip,
  Group,
  Text,
} from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import {
  IconSearch,
  IconX,
  IconEdit,
  IconTrash,
  IconMapPin,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useLocationTableManagement } from '@/hooks/useLocationTablesManagement';
import { Cinema } from '@/schemas/cinema'; // Importamos tu nuevo tipo Zod

interface CinemasTableProps {
  initialData: Cinema[];
}

export default function CinemasTable({ initialData }: CinemasTableProps) {
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
  } = useLocationTableManagement<Cinema>({
    initialData,
    defaultSortColumn: 'name',
    pageSize: 10,
    // Actualizado para buscar dentro de los objetos anidados
    filterFn: (item, q) =>
      item.name.toLowerCase().includes(q.toLowerCase()) ||
      item.municipality.name.toLowerCase().includes(q.toLowerCase()) ||
      item.municipality.state.name.toLowerCase().includes(q.toLowerCase()),
  });

  return (
    <Paper withBorder radius="md" shadow="xs">
      <DataTable
        idAccessor="id"
        withTableBorder
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
            render: ({ name }: any) => (
              <Text fw={600} size="sm">
                {name}
              </Text>
            ),
          },
          {
            accessor: 'municipality.name', // Usamos dot-notation para ordenar
            title: 'Ubicación',
            sortable: true,
            // Extraemos municipality y su estado anidado
            render: ({ municipality }: any) => (
              <Group gap="xs">
                <IconMapPin size={16} color="gray" />
                <Text size="sm">
                  {municipality?.name}, {municipality?.state?.name}
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
                {/* <Tooltip label="Eliminar">
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="red"
                    onClick={() => console.log('Eliminar ID:', id)}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Tooltip> */}
              </Group>
            ),
          },
        ]}
      />
    </Paper>
  );
}
