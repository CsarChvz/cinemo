'use client';

import {
  Paper,
  Title,
  Text,
  Stack,
  TextInput,
  Button,
  SimpleGrid,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy } from '@tabler/icons-react';

export interface StateFormValues {
  id?: string | number;
  name: string;
  code: string;
}

interface StateFormProps {
  onSubmit: (values: StateFormValues) => void;
  initialValues?: StateFormValues;
  isEditing?: boolean;
}

export function StateForm({
  onSubmit,
  initialValues,
  isEditing = false,
}: StateFormProps) {
  const form = useForm<StateFormValues>({
    initialValues: initialValues || {
      name: '',
      code: '',
    },
    validate: {
      name: (value) =>
        value.trim().length < 3
          ? 'El nombre debe tener al menos 3 caracteres'
          : null,
      code: (value) =>
        value.trim().length < 2
          ? 'Ingresa una abreviatura válida (ej. JAL)'
          : null,
    },
  });

  return (
    <Paper p={40} radius="xl" withBorder shadow="md">
      <Stack gap={5} mb="xl">
        <Title order={2}>
          {isEditing ? 'Editar Estado' : 'Crear Nuevo Estado'}
        </Title>
        <Text c="dimmed" size="sm">
          {isEditing
            ? 'Modifica los datos del estado existente.'
            : 'Registra un nuevo estado en el catálogo.'}
        </Text>
      </Stack>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="md">
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput
              label="Nombre del Estado"
              placeholder="Ej. Jalisco"
              withAsterisk
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Abreviatura / Código"
              placeholder="Ej. JAL"
              withAsterisk
              {...form.getInputProps('code')}
            />
          </SimpleGrid>

          <Button
            type="submit"
            size="md"
            mt="xl"
            fullWidth
            leftSection={<IconDeviceFloppy size={20} />}
            variant="gradient"
            gradient={{ from: 'indigo', to: 'blue' }}
          >
            {isEditing ? 'Guardar Cambios' : 'Crear Estado'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
