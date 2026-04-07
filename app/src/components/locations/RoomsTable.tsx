// components/locations/RoomsTable.tsx
'use client';

import {
  Paper,
  ActionIcon,
  Tooltip,
  Group,
  Text,
  Badge,
  Select,
  Stack,
} from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useLocationTableManagement } from '@/hooks/useLocationTablesManagement';
import { api } from '@/trpc-folder/trpc-adaptadores/react';
import { Room } from '@/schemas/room'; // Tu nuevo esquema Zod

interface RoomsTableProps {
  initialData: Room[];
}

export default function RoomsTable({ initialData }: RoomsTableProps) {
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);

  // 1. Obtenemos los cines reales para el filtro superior
  const { data: cinemas, isLoading: isLoadingCinemas } =
    api.cinema.getAll.useQuery();

  const cinemaOptions = useMemo(() => {
    return (
      cinemas?.map((cinema) => ({
        value: cinema.id.toString(),
        label: cinema.name,
      })) || []
    );
  }, [cinemas]);

  // 2. Usamos el Hook de gestión de tabla
  const {
    records,
    sortStatus,
    setSortStatus,
    page,
    setPage,
    totalRecords,
    pageSize,
  } = useLocationTableManagement<Room>({
    initialData,
    defaultSortColumn: 'name',
    pageSize: 10,
    filterFn: (item) => {
      // Usamos item.cinema.id por la estructura anidada de Zod
      if (selectedCinema) {
        return item.cinema.id.toString() === selectedCinema;
      }
      return true;
    },
  });

  return (
    <Stack gap="lg">
      {/* FILTROS */}
      <Paper p="md" withBorder shadow="sm" radius="md">
        <Select
          label="Filtrar por Complejo"
          placeholder={
            isLoadingCinemas ? 'Cargando cines...' : 'Todos los cines'
          }
          data={cinemaOptions}
          disabled={isLoadingCinemas}
          value={selectedCinema}
          onChange={(val) => {
            setSelectedCinema(val);
            setPage(1); // Regresamos a la primera página al filtrar
          }}
          clearable
          searchable
          maw={400}
        />
      </Paper>

      {/* TABLA */}
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
              title: 'Nombre',
              sortable: true,
            },
            {
              // Accedemos al nombre del cine anidado
              accessor: 'cinema.name',
              title: 'Cine',
              sortable: true,
            },
            {
              accessor: 'roomType',
              title: 'Tipo',
              sortable: true,
            },
            {
              accessor: 'capacity',
              title: 'Aforo',
              textAlign: 'right',
              sortable: true,
            },
            {
              accessor: 'isActive',
              title: 'Status',
              textAlign: 'center',
              render: ({ isActive }) => <Text>{String(isActive)}</Text>,
            },
            {
              accessor: 'actions',
              title: 'Acciones',
              textAlign: 'right',
              render: ({ id }) => (
                <Group gap={4} justify="right" wrap="nowrap">
                  <Tooltip label="Editar">
                    <ActionIcon
                      component={Link}
                      href={`/admin/locations/rooms/edit/${id}`}
                      size="sm"
                      variant="subtle"
                      color="blue"
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                  </Tooltip>
                  {/* <Tooltip label="Eliminar">
                    <ActionIcon size="sm" variant="subtle" color="red">
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Tooltip> */}
                </Group>
              ),
            },
          ]}
        />
      </Paper>
    </Stack>
  );
}
