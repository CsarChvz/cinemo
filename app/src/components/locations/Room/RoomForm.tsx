'use client';

import { api } from '@/trpc-folder/trpc-adaptadores/react';
import {
  Paper,
  Title,
  Text,
  Stack,
  TextInput,
  Button,
  SimpleGrid,
  Select,
  NumberInput,
  Switch,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export interface RoomFormValues {
  name: string;
  roomType: string;
  capacity: number;
  columnsPerRow: number; // 🔥 Agregado
  cinemaId: string;
  isActive: boolean;
}

export function RoomForm() {
  const router = useRouter();

  const form = useForm<RoomFormValues>({
    initialValues: {
      name: '',
      roomType: '',
      capacity: 0,
      columnsPerRow: 10, // 🔥 Valor inicial sugerido
      cinemaId: '',
      isActive: true,
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Nombre muy corto' : null),
      roomType: (value) => (!value ? 'Selecciona un tipo de sala' : null),
      capacity: (value) =>
        value <= 0 ? 'La capacidad debe ser mayor a 0' : null,
      columnsPerRow: (value) => (value <= 0 ? 'Mínimo 1 columna' : null), // 🔥 Validación
      cinemaId: (value) => (!value ? 'Selecciona un cine' : null),
    },
  });

  const { data: cinemas, isLoading: isLoadingCinemas } =
    api.cinema.getAll.useQuery();

  const cinemaOptions =
    cinemas?.map((cinema) => ({
      value: cinema.id.toString(),
      label: cinema.name,
    })) || [];

  const createRoom = api.room.create.useMutation({
    onSuccess: () => {
      router.push('/admin/locations/rooms');
    },
  });

  return (
    <Paper p={40} radius="xl" withBorder shadow="md">
      <Stack gap={5} mb="xl">
        <Title order={2}>Crear Nueva Sala</Title>
        <Text c="dimmed" size="sm">
          Registra una nueva sala y define su distribución de asientos.
        </Text>
      </Stack>

      <form
        onSubmit={form.onSubmit((values) => {
          createRoom.mutate({
            name: values.name,
            roomType: values.roomType,
            capacity: values.capacity,
            columnsPerRow: values.columnsPerRow,
            isActive: values.isActive,
            cinemaId: Number(values.cinemaId),
          });
        })}
      >
        <Stack gap="md">
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput
              label="Nombre de la Sala"
              placeholder="Ej. Sala 01"
              withAsterisk
              {...form.getInputProps('name')}
            />
            <Select
              label="Cine al que pertenece"
              placeholder={
                isLoadingCinemas ? 'Cargando cines...' : 'Selecciona un cine'
              }
              searchable
              withAsterisk
              data={cinemaOptions}
              disabled={isLoadingCinemas}
              {...form.getInputProps('cinemaId')}
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Select
              label="Tipo de Sala"
              placeholder="Selecciona el formato"
              withAsterisk
              data={['Estándar', 'VIP', 'IMAX', '4DX', 'MacroXE']}
              {...form.getInputProps('roomType')}
            />
            {/* Agrupamos Capacidad y Columnas por fila */}
            <SimpleGrid cols={2}>
              <NumberInput
                label="Aforo"
                placeholder="150"
                withAsterisk
                min={1}
                {...form.getInputProps('capacity')}
              />
              <NumberInput
                label="Asientos por fila"
                placeholder="10"
                withAsterisk
                min={1}
                {...form.getInputProps('columnsPerRow')}
              />
            </SimpleGrid>
          </SimpleGrid>

          <Switch
            label="Sala Activa"
            description="Si se desactiva, no se podrán programar funciones"
            mt="sm"
            {...form.getInputProps('isActive', { type: 'checkbox' })}
          />

          <Button
            type="submit"
            size="md"
            mt="xl"
            fullWidth
            leftSection={<IconDeviceFloppy size={20} />}
            variant="gradient"
            gradient={{ from: 'teal', to: 'green' }}
            loading={createRoom.isPending}
            disabled={isLoadingCinemas}
          >
            Crear Sala
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
