'use client';

import {
  Paper,
  Title,
  Text,
  Stack,
  Select,
  SimpleGrid,
  Button,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy } from '@tabler/icons-react';

interface MovieScreeningFormProps {
  onSubmit: (values: any) => void;
  initialValues?: any;
  isEditing?: boolean;
}

export function MovieScreeningForm({
  onSubmit,
  initialValues,
  isEditing = false,
}: MovieScreeningFormProps) {
  const form = useForm({
    initialValues: initialValues || {
      peliculaId: '',
      estadoId: '',
      municipioId: '',
      cineId: '',
      salaId: '',
      horario: null as Date | null,
    },
    validate: {
      peliculaId: (v) => (!v ? 'Selecciona una película' : null),
      horario: (v) => (!v ? 'La fecha es obligatoria' : null),
    },
  });

  return (
    <Paper p={40} radius="xl" withBorder shadow="md">
      <Stack gap={5} mb="xl">
        <Title order={2}>
          {isEditing ? 'Editar Función' : 'Crear Nueva Función'}
        </Title>
        <Text c="dimmed" size="sm">
          {isEditing
            ? 'Modifica los detalles de esta proyección.'
            : 'Asigna una película a una sala y horario específico.'}
        </Text>
      </Stack>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="md">
          <Select
            label="Seleccionar Película"
            placeholder="Busca la película..."
            searchable
            data={['Interstellar', 'Inception', 'Spider-Man']}
            {...form.getInputProps('peliculaId')}
          />

          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Select
              label="Estado"
              data={['Jalisco', 'CDMX']}
              {...form.getInputProps('estadoId')}
            />
            <Select
              label="Municipio"
              data={['Zapopan', 'Guadalajara']}
              {...form.getInputProps('municipioId')}
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Select
              label="Cine"
              data={['Gran Plaza', 'Andares']}
              {...form.getInputProps('cineId')}
            />
            <Select
              label="Sala"
              data={['Sala 01', 'Sala 02', 'VIP']}
              {...form.getInputProps('salaId')}
            />
          </SimpleGrid>

          <DateTimePicker
            label="Fecha y Hora de la función"
            placeholder="Selecciona el momento exacto"
            {...form.getInputProps('horario')}
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
            {isEditing ? 'Guardar Cambios' : 'Publicar Función'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
