'use client';

import { api } from '@/trpc-folder/trpc-adaptadores/react';
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
import { useRouter } from 'next/navigation';

export interface MunicipalityFormValues {
  id?: string | number;
  name: string;
  stateId: string;
}

interface MunicipalityFormProps {
  initialValues?: MunicipalityFormValues;
  isEditing?: boolean;
}

export function MunicipalityForm({
  initialValues,
  isEditing = false,
}: MunicipalityFormProps) {
  const router = useRouter();
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

  // 1. Obtenemos la data y el estado de carga desde tRPC
  const {
    data: states,
    isLoading: isLoadingStates,
    isError,
  } = api.state.getAll.useQuery();

  // 2. Mapeamos la data al formato de Mantine: { value: string, label: string }
  const statesData =
    states?.map((state) => ({
      value: state.id.toString(),
      label: state.name,
    })) || [];

  // 3. Definimos la mutación para crear
  const createMunicipality = api.municipality.create.useMutation({
    onSuccess: () => {
      // Corregí el pequeño typo aquí ('municipalities')
      router.push('/admin/locations/municipalities');
    },
  });

  const handleSubmit = (values: MunicipalityFormValues) => {
    createMunicipality.mutate({
      name: values.name,
      stateId: Number(values.stateId),
    });
  };

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

      <form onSubmit={form.onSubmit(handleSubmit)}>
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
              isLoadingStates
                ? 'Cargando estados...'
                : 'Selecciona un estado...'
            }
            searchable
            withAsterisk
            data={statesData}
            disabled={isLoadingStates || isError}
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
            // Agregamos el loading spinner conectado a la mutación de guardado
            loading={createMunicipality.isPending}
            // Deshabilitamos si los estados aún no cargan
            disabled={isLoadingStates}
          >
            {isEditing ? 'Guardar Cambios' : 'Crear Municipio'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
