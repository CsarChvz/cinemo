'use client';

import {
  Paper,
  Title,
  Text,
  Stack,
  Select,
  TextInput,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy } from '@tabler/icons-react';

export interface MunicipalityFormValues {
  id?: string | number;
  name: string;
  stateId: string;
}

interface MunicipalityFormProps {
  onSubmit: (values: MunicipalityFormValues) => void;
  initialValues?: MunicipalityFormValues;
  isEditing?: boolean;
}

export function MunicipalityForm({
  onSubmit,
  initialValues,
  isEditing = false,
}: MunicipalityFormProps) {
  const form = useForm<MunicipalityFormValues>({
    initialValues: initialValues || {
      name: '',
      stateId: '',
    },
    validate: {
      name: (value) =>
        value.trim().length < 2
          ? 'El nombre debe tener al menos 2 caracteres'
          : null,
      stateId: (value) => (!value ? 'Debes seleccionar un estado' : null),
    },
  });

  // En un caso real, estos datos vendrían de tu API (ej. SWR o React Query)
  const statesData = [
    { value: '1', label: 'Jalisco' },
    { value: '2', label: 'Ciudad de México' },
    { value: '3', label: 'Nuevo León' },
  ];

  return (
    <Paper p={40} radius="xl" withBorder shadow="md">
      <Stack gap={5} mb="xl">
        <Title order={2}>
          {isEditing ? 'Editar Municipio' : 'Crear Nuevo Municipio'}
        </Title>
        <Text c="dimmed" size="sm">
          {isEditing
            ? 'Modifica los datos del municipio existente.'
            : 'Registra un nuevo municipio y asígnalo a un estado.'}
        </Text>
      </Stack>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Nombre del Municipio"
            placeholder="Ej. Zapopan"
            withAsterisk
            {...form.getInputProps('name')}
          />

          <Select
            label="Estado al que pertenece"
            placeholder="Selecciona un estado..."
            searchable
            withAsterisk
            data={statesData}
            {...form.getInputProps('stateId')}
          />

          <Button
            type="submit"
            size="md"
            mt="xl"
            fullWidth
            leftSection={<IconDeviceFloppy size={20} />}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            {isEditing ? 'Guardar Cambios' : 'Crear Municipio'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
