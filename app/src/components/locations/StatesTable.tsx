'use client';

import {
  Paper,
  Stack,
  TextInput,
  ActionIcon,
  Tooltip,
  Group,
} from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconSearch, IconX, IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useLocationTableManagement } from '@/hooks/useLocationTablesManagement';

interface StateRecord extends Record<string, any> {
  id: number;
  name: string;
  code: string;
}

interface StatesTableProps {
  initialData: StateRecord[];
}

export default function StatesTable({ initialData }: StatesTableProps) {
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
  } = useLocationTableManagement<StateRecord>({
    initialData,
    defaultSortColumn: 'name',
    pageSize: 10,
    filterFn: (item, q) =>
      item.name.toLowerCase().includes(q.toLowerCase()) ||
      item.code.toLowerCase().includes(q.toLowerCase()),
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
              <div style={{ fontWeight: 600, fontSize: '14px' }}>{name}</div>
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
  );
}
