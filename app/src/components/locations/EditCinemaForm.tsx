// components/locations/EditCinemaForm.tsx
'use client';

import { api } from '@/trpc/react';
import { Cinema } from '@/schemas/cinema'; // Tu tipo Zod
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
import { useRouter } from 'next/navigation';

export interface EditCinemaFormValues {
  name: string;
  address: string;
  stateId: string;
  municipalityId: string;
}

interface EditCinemaFormProps {
  cinema: Cinema; // Recibimos los datos iniciales desde el servidor
}

export function EditCinemaForm({ cinema }: EditCinemaFormProps) {
  const router = useRouter();

  // Inicializamos el formulario con los datos del cine
  const form = useForm<EditCinemaFormValues>({
    initialValues: {
      name: cinema.name,
      address: cinema.address,
      // Extraemos el ID del estado desde la relación anidada
      stateId: cinema.municipality.state.id.toString(),
      municipalityId: cinema.municipality.id.toString(),
    },
    validate: {
      name: (value) => (value.trim().length < 3 ? 'Nombre muy corto' : null),
      address: (value) =>
        value.trim().length < 5 ? 'Dirección muy corta' : null,
      stateId: (value) => (!value ? 'Selecciona un estado' : null),
      municipalityId: (value) => (!value ? 'Selecciona un municipio' : null),
    },
  });

  // 1. Obtenemos los catálogos para los Selects
  const { data: states, isLoading: isLoadingStates } =
    api.state.getAll.useQuery();
  const { data: municipalities, isLoading: isLoadingMunicipalities } =
    api.municipality.getAll.useQuery();

  // 2. Mapeamos los estados
  const statesData = useMemo(() => {
    return (
      states?.map((state) => ({
        value: state.id.toString(),
        label: state.name,
      })) || []
    );
  }, [states]);

  // 3. Filtramos municipios dinámicamente según el estado seleccionado
  const availableMunicipalities = useMemo(() => {
    if (!form.values.stateId || !municipalities) return [];

    return municipalities
      .filter((m) => m.state.id.toString() === form.values.stateId)
      .map((m) => ({
        value: m.id.toString(),
        label: m.name,
      }));
  }, [form.values.stateId, municipalities]);

  // 4. Definimos la mutación interna para ACTUALIZAR
  const editCinema = api.cinema.update.useMutation({
    onSuccess: () => {
      router.push('/admin/locations/cinemas');
    },
  });

  return (
    <Paper p={40} radius="xl" withBorder shadow="md">
      <Stack gap={5} mb="xl">
        <Title order={2}>Editar Complejo</Title>
        <Text c="dimmed" size="sm">
          Actualiza la información del cine existente.
        </Text>
      </Stack>

      <form
        onSubmit={form.onSubmit((values) => {
          editCinema.mutate({
            id: cinema.id, // Pasamos el ID del cine que estamos editando
            data: {
              name: values.name,
              address: values.address,
              municipalityId: Number(values.municipalityId),
            },
          });
        })}
      >
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
              placeholder={
                isLoadingStates ? 'Cargando...' : 'Selecciona el estado'
              }
              searchable
              withAsterisk
              data={statesData}
              disabled={isLoadingStates}
              {...form.getInputProps('stateId')}
              onChange={(val) => {
                form.setFieldValue('stateId', val || '');
                // Si el usuario cambia de estado manualmente, borramos el municipio actual
                form.setFieldValue('municipalityId', '');
              }}
            />
            <Select
              label="Municipio"
              placeholder={
                isLoadingMunicipalities
                  ? 'Cargando municipios...'
                  : form.values.stateId
                    ? 'Selecciona un municipio'
                    : 'Primero selecciona un estado'
              }
              searchable
              withAsterisk
              disabled={!form.values.stateId || isLoadingMunicipalities}
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
            loading={editCinema.isPending} // Spinner automático durante el PUT/PATCH
            disabled={isLoadingStates || isLoadingMunicipalities}
          >
            Guardar Cambios
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
