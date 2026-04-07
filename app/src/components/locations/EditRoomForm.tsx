// components/locations/EditRoomForm.tsx
'use client';

import { api } from '@/trpc/react';
import { Room } from '@/schemas/room'; // Asegúrate de tener esta ruta correcta
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

export interface EditRoomFormValues {
  name: string;
  roomType: string;
  capacity: number;
  cinemaId: string;
  isActive: boolean;
}

interface EditRoomFormProps {
  room: Room;
}

export function EditRoomForm({ room }: EditRoomFormProps) {
  const router = useRouter();

  const form = useForm<EditRoomFormValues>({
    // Llenamos el formulario con los datos que llegaron del servidor
    initialValues: {
      name: room.name,
      roomType: room.roomType,
      capacity: room.capacity,
      isActive: room.isActive,
      // Extraemos el ID del cine de la relación anidada de Zod
      cinemaId: room.cinema.id.toString(),
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Nombre muy corto' : null),
      roomType: (value) => (!value ? 'Selecciona un tipo de sala' : null),
      capacity: (value) =>
        value <= 0 ? 'La capacidad debe ser mayor a 0' : null,
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

  // Mutación para ACTUALIZAR
  const editRoom = api.room.update.useMutation({
    onSuccess: () => {
      router.push('/admin/locations/rooms');
    },
  });

  return (
    <Paper p={40} radius="xl" withBorder shadow="md">
      <Stack gap={5} mb="xl">
        <Title order={2}>Editar Sala</Title>
        <Text c="dimmed" size="sm">
          Modifica el aforo, tipo o disponibilidad de la sala.
        </Text>
      </Stack>

      <form
        onSubmit={form.onSubmit((values) => {
          editRoom.mutate({
            id: room.id,
            data: {
              name: values.name,
              roomType: values.roomType,
              capacity: values.capacity,
              isActive: values.isActive,
              cinemaId: Number(values.cinemaId),
            },
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
            <NumberInput
              label="Aforo (Capacidad)"
              placeholder="Ej. 150"
              withAsterisk
              min={1}
              {...form.getInputProps('capacity')}
            />
          </SimpleGrid>

          <Switch
            label="Sala Activa"
            description="Si se desactiva, se considera en mantenimiento"
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
            loading={editRoom.isPending}
            disabled={isLoadingCinemas}
          >
            Guardar Cambios
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
