'use client';

import {
  Container,
  Stack,
  Group,
  Title,
  Text,
  Button,
  Paper,
  ActionIcon,
  Tooltip,
  Badge,
  Select,
} from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { useLocationTableManagement } from '@/hooks/useLocationTablesManagement';

// 1. Extendemos Record<string, any>
interface RoomRecord extends Record<string, any> {
  id: string;
  name: string;
  roomType: string;
  capacity: number;
  cinemaId: string;
  cinemaName: string;
  isActive: boolean;
}

const DUMMY_ROOMS: RoomRecord[] = [
  {
    id: '1',
    name: 'Sala 01',
    roomType: 'Estándar',
    capacity: 150,
    cinemaId: '1',
    cinemaName: 'Cinemo Andares',
    isActive: true,
  },
  {
    id: '2',
    name: 'Sala VIP',
    roomType: 'VIP',
    capacity: 45,
    cinemaId: '1',
    cinemaName: 'Cinemo Andares',
    isActive: true,
  },
  {
    id: '3',
    name: 'Sala IMAX',
    roomType: 'IMAX',
    capacity: 200,
    cinemaId: '2',
    cinemaName: 'Cinemo Galerías',
    isActive: false,
  },
  {
    id: '4',
    name: 'Sala 02',
    roomType: 'Estándar',
    capacity: 120,
    cinemaId: '1',
    cinemaName: 'Cinemo Andares',
    isActive: true,
  },
  {
    id: '5',
    name: 'Sala 4DX',
    roomType: '4DX',
    capacity: 80,
    cinemaId: '2',
    cinemaName: 'Cinemo Galerías',
    isActive: true,
  },
  {
    id: '6',
    name: 'Sala MacroXE',
    roomType: 'MacroXE',
    capacity: 250,
    cinemaId: '1',
    cinemaName: 'Cinemo Andares',
    isActive: true,
  },
];

const MOCK_CINEMAS = [
  { value: '1', label: 'Cinemo Andares' },
  { value: '2', label: 'Cinemo Galerías' },
];

export default function RoomsListPage() {
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);

  // 2. Usamos el Hook
  const {
    records,
    sortStatus,
    setSortStatus,
    page,
    setPage,
    totalRecords,
    pageSize,
  } = useLocationTableManagement<RoomRecord>({
    initialData: DUMMY_ROOMS,
    defaultSortColumn: 'name',
    pageSize: 5,
    // 3. Modificamos la función de filtro para que escuche al Select externo
    filterFn: (item) => {
      // Si hay un cine seleccionado, solo pasamos las salas de ese cine
      if (selectedCinema) {
        return item.cinemaId === selectedCinema;
      }
      return true; // Si no hay cine seleccionado, mostramos todas
    },
  });

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        {/* HEADER SECTION */}
        <Group justify="space-between">
          <Stack gap={0}>
            <Title order={2}>Gestión de Salas</Title>
            <Text c="dimmed" fz="sm">
              Administra el aforo, tipo y disponibilidad de cada sala.
            </Text>
          </Stack>
          <Button
            component={Link}
            href="/admin/locations/rooms/create"
            leftSection={<IconPlus size={18} />}
            variant="filled"
            color="teal"
          >
            Nueva Sala
          </Button>
        </Group>

        {/* FILTERS */}
        <Paper p="md" withBorder shadow="sm" radius="md">
          <Select
            label="Filtrar por Complejo"
            placeholder="Todos los cines"
            data={MOCK_CINEMAS}
            value={selectedCinema}
            onChange={(val) => {
              setSelectedCinema(val);
              setPage(1); // Regresamos a la página 1 al cambiar de cine
            }}
            clearable
            searchable
            maw={400}
          />
        </Paper>

        {/* TABLE SECTION */}
        <Paper withBorder radius="md" shadow="xs">
          <DataTable
            idAccessor="id"
            height={550}
            withTableBorder
            // 4. Conectamos datos y paginación
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
                render: ({ name }: any) => (
                  <Text fw={600} size="sm">
                    {name}
                  </Text>
                ),
              },
              { accessor: 'cinemaName', title: 'Cine', sortable: true },
              {
                accessor: 'roomType',
                title: 'Tipo',
                sortable: true,
                render: ({ roomType }: any) => (
                  <Badge color="gray" variant="light">
                    {roomType}
                  </Badge>
                ),
              },
              {
                accessor: 'capacity',
                title: 'Aforo',
                textAlign: 'right',
                sortable: true,
              },
              {
                accessor: 'isActive',
                title: 'Estado',
                textAlign: 'center',
                render: ({ isActive }: any) => (
                  <Badge color={isActive ? 'green' : 'red'} variant="dot">
                    {isActive ? 'Activa' : 'Mantenimiento'}
                  </Badge>
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
                        href={`/admin/locations/rooms/edit/${id}`}
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
