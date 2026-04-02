'use client';

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
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy } from '@tabler/icons-react';

export interface RoomFormValues {
  id?: string | number;
  name: string;
  roomType: string;
  capacity: number | '';
  cinemaId: string;
  isActive: boolean;
}

interface RoomFormProps {
  onSubmit: (values: RoomFormValues) => void;
  initialValues?: RoomFormValues;
  isEditing?: boolean;
}

// Datos falsos de Cines (Simulando la BD)
const MOCK_CINEMAS = [
  { value: '1', label: 'Cinemo Andares' },
  { value: '2', label: 'Cinemo Galerías' },
  { value: '3', label: 'Cinemo Punto Valle' },
];

export function RoomForm({
  onSubmit,
  initialValues,
  isEditing = false,
}: RoomFormProps) {
  const form = useForm<RoomFormValues>({
    initialValues: initialValues || {
      name: '',
      roomType: '',
      capacity: '',
      cinemaId: '',
      isActive: true,
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Nombre muy corto' : null),
      roomType: (value) => (!value ? 'Selecciona el tipo de sala' : null),
      capacity: (value) =>
        !value || Number(value) <= 0 ? 'Capacidad inválida' : null,
      cinemaId: (value) => (!value ? 'Selecciona un complejo' : null),
    },
  });

  return (
    <Paper p={40} radius="xl" withBorder shadow="md">
      <Stack gap={5} mb="xl">
        <Group justify="space-between" align="flex-start">
          <Stack gap={5}>
            <Title order={2}>
              {isEditing ? 'Editar Sala' : 'Crear Nueva Sala'}
            </Title>
            <Text c="dimmed" size="sm">
              Define el aforo, tipo y estado de la sala para la venta de
              boletos.
            </Text>
          </Stack>

          <Switch
            label="Sala Activa"
            description="Apagar si está en mantenimiento"
            size="md"
            color="green"
            {...form.getInputProps('isActive', { type: 'checkbox' })}
          />
        </Group>
      </Stack>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="md">
          <Select
            label="Complejo (Cine)"
            placeholder="¿A qué cine pertenece esta sala?"
            searchable
            withAsterisk
            data={MOCK_CINEMAS}
            {...form.getInputProps('cinemaId')}
          />

          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput
              label="Nombre de la Sala"
              placeholder="Ej. Sala 01"
              withAsterisk
              {...form.getInputProps('name')}
            />
            <Select
              label="Tipo de Sala"
              placeholder="Ej. VIP, 3D"
              withAsterisk
              data={['Estándar', '3D', '4DX', 'IMAX', 'VIP', 'MacroXE']}
              {...form.getInputProps('roomType')}
            />
            <NumberInput
              label="Capacidad (Aforo)"
              placeholder="Ej. 120"
              withAsterisk
              min={1}
              max={500}
              {...form.getInputProps('capacity')}
            />
          </SimpleGrid>

          <Button
            type="submit"
            size="md"
            mt="xl"
            fullWidth
            leftSection={<IconDeviceFloppy size={20} />}
            variant="gradient"
            gradient={{ from: 'teal', to: 'green' }}
          >
            {isEditing ? 'Guardar Cambios' : 'Crear Sala'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
