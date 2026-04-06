// components/locations/MunicipalitiesTable.tsx
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
import { IconSearch, IconX, IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useLocationTableManagement } from '@/hooks/useLocationTablesManagement';
import { Municipality } from '@/schemas/municipality';

export interface MunicipalityRecord extends Record<string, any>, Municipality {
}

interface MunicipalitiesTableProps {
  initialData: MunicipalityRecord[];
}

export default function MunicipalitiesTable({
  initialData,
}: MunicipalitiesTableProps) {
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
    initialData,
    defaultSortColumn: 'name',
    pageSize: 10,
    filterFn: (item, q) =>
      item.name.toLowerCase().includes(q.toLowerCase()) ||
      item.state.name.toLowerCase().includes(q.toLowerCase()),
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
            render: ({ name }: any) => (
              <Text fw={600} size="sm">
                {name}
              </Text>
            ),
          },
          {
            accessor: 'state.name',
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
  );
}
