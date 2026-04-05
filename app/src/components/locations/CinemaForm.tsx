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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useMemo } from 'react';

export interface CinemaFormValues {
  id?: string | number;
  name: string;
  address: string;
  stateId: string;
  municipalityId: string;
}

interface CinemaFormProps {
  onSubmit: (values: CinemaFormValues) => void;
  initialValues?: CinemaFormValues;
  isEditing?: boolean;
}

// Datos falsos simulando lo que vendría de tu API
const MOCK_STATES = [
  { value: '1', label: 'Jalisco' },
  { value: '2', label: 'Nuevo León' },
];

const MOCK_MUNICIPALITIES = [
  { value: '101', label: 'Zapopan', stateId: '1' },
  { value: '102', label: 'Guadalajara', stateId: '1' },
  { value: '201', label: 'Monterrey', stateId: '2' },
  { value: '202', label: 'San Pedro Garza García', stateId: '2' },
];

export function CinemaForm({
  onSubmit,
  initialValues,
  isEditing = false,
}: CinemaFormProps) {
  const form = useForm<CinemaFormValues>({
    initialValues: initialValues || {
      name: '',
      address: '',
      stateId: '',
      municipalityId: '',
    },
    validate: {
      name: (value) => (value.trim().length < 3 ? 'Nombre muy corto' : null),
      address: (value) =>
        value.trim().length < 5 ? 'Dirección muy corta' : null,
      stateId: (value) => (!value ? 'Selecciona un estado' : null),
      municipalityId: (value) => (!value ? 'Selecciona un municipio' : null),
    },
  });

  // Filtrar municipios basándonos en el estado seleccionado actualmente en el form
  const availableMunicipalities = useMemo(() => {
    if (!form.values.stateId) return [];
    return MOCK_MUNICIPALITIES.filter((m) => m.stateId === form.values.stateId);
  }, [form.values.stateId]);

  return (
    <Paper p={40} radius="xl" withBorder shadow="md">
      <Stack gap={5} mb="xl">
        <Title order={2}>
          {isEditing ? 'Editar Complejo' : 'Crear Nuevo Complejo'}
        </Title>
        <Text c="dimmed" size="sm">
          {isEditing
            ? 'Actualiza la información del cine.'
            : 'Registra un nuevo cine especificando su ubicación exacta.'}
        </Text>
      </Stack>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="md">
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput
              label="Nombre del Cine"
              placeholder="Ej. Cinemo Andares"
              withAsterisk
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Dirección Completa"
              placeholder="Ej. Blvd. Puerta de Hierro 4965"
              withAsterisk
              {...form.getInputProps('address')}
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Select
              label="Estado"
              placeholder="Selecciona el estado"
              searchable
              withAsterisk
              data={MOCK_STATES}
              // Sobrescribimos el onChange para limpiar el municipio si el estado cambia
              {...form.getInputProps('stateId')}
              onChange={(val) => {
                form.setFieldValue('stateId', val || '');
                form.setFieldValue('municipalityId', ''); // <--- Magia de la cascada
              }}
            />
            <Select
              label="Municipio"
              placeholder={
                form.values.stateId
                  ? 'Selecciona un municipio'
                  : 'Primero selecciona un estado'
              }
              searchable
              withAsterisk
              disabled={!form.values.stateId} // Se deshabilita si no hay estado
              data={availableMunicipalities}
              {...form.getInputProps('municipalityId')}
            />
          </SimpleGrid>

          <Button
            type="submit"
            size="md"
            mt="xl"
            fullWidth
            leftSection={<IconDeviceFloppy size={20} />}
            variant="gradient"
            gradient={{ from: 'violet', to: 'purple' }}
          >
            {isEditing ? 'Guardar Cambios' : 'Crear Cine'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
