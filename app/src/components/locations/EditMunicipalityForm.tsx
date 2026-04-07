// components/locations/EditMunicipalityForm.tsx
'use client';

import { Municipality } from '@/schemas/municipality'; // Ajusta la ruta a tu esquema
import { api } from '@/trpc/react';
import {
  Paper,
  Title,
  Text,
  Stack,
  TextInput,
  Button,
  Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export interface EditMunicipalityFormValues {
  name: string;
  stateId: string;
}

interface EditMunicipalityFormProps {
  municipality: Municipality;
}

export function EditMunicipalityForm({
  municipality,
}: EditMunicipalityFormProps) {
  const router = useRouter();

  // Inicializamos el formulario con los datos que llegaron del servidor
  const form = useForm<EditMunicipalityFormValues>({
    initialValues: {
      name: municipality.name,
      // Convertimos el ID del estado a string para el Select de Mantine
      stateId: municipality.state.id.toString(),
    },
    validate: {
      name: (value) =>
        value.trim().length < 2
          ? 'El nombre debe tener al menos 2 caracteres'
          : null,
      stateId: (value) => (!value ? 'Debes seleccionar un estado' : null),
    },
  });

  // Obtenemos los estados para el Select
  const { data: states, isLoading, isError } = api.state.getAll.useQuery();

  const statesData =
    states?.map((state) => ({
      value: state.id.toString(),
      label: state.name,
    })) || [];

  // Mutación para actualizar
  const editMunicipality = api.municipality.update.useMutation({
    onSuccess: () => {
      router.push('/admin/locations/municipalities');
    },
  });

  return (
    <Paper p={40} radius="xl" withBorder shadow="md">
      <Stack gap={5} mb="xl">
        <Title order={2}>Editar Municipio</Title>
        <Text c="dimmed" size="sm">
          Modifica los datos del municipio existente.
        </Text>
      </Stack>

      <form
        onSubmit={form.onSubmit((values) => {
          editMunicipality.mutate({
            id: municipality.id, // El ID que venía desde la base de datos
            data: {
              name: values.name,
              stateId: Number(values.stateId), // Lo convertimos de vuelta a número para la API
            },
          });
        })}
      >
        <Stack gap="md">
          <TextInput
            label="Nombre del Municipio"
            placeholder="Ej. Zapopan"
            withAsterisk
            {...form.getInputProps('name')}
          />

          <Select
            label="Estado al que pertenece"
            placeholder={
              isLoading ? 'Cargando estados...' : 'Selecciona un estado...'
            }
            searchable
            withAsterisk
            data={statesData}
            disabled={isLoading || isError}
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
            loading={editMunicipality.isPending} // Muestra spinner mientras guarda
            disabled={isLoading}
          >
            Guardar Cambios
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
