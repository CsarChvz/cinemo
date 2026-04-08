'use client';

import { State } from '@/schemas/states';
import { api } from '@/trpc-folder/trpc-adaptadores/react';
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
import { useRouter } from 'next/navigation';

export interface EditStateFormValues {
  id?: string | number;
  name: string;
  code: string;
}


interface EditStateFormProps{
  state: State
}


export function EditStateForm({
  state
}: EditStateFormProps) {
  const router = useRouter();
  const form = useForm<EditStateFormValues>({
    initialValues:  {
      name: state.name,
      code: state.code,
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

  const editState = api.state.update.useMutation({
    onSuccess: () => {
      router.push('/admin/locations/states');
    },
  });

  return (
    <Paper p={40} radius="xl" withBorder shadow="md">
      <Stack gap={5} mb="xl">
        <Title order={2}>
          Editar Estado
        </Title>
        <Text c="dimmed" size="sm">
           Modifica los datos del estado existente.
        </Text>
      </Stack>

      <form
        onSubmit={form.onSubmit((values) => {
          editState.mutate({
            id: state.id,
            data: {
              ...values,
            },
          });
        })}
      >
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
            Guardar Cambios
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
