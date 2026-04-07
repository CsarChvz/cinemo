'use client';

import { api } from '@/trpc-folder/trpc-adaptadores/react';
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

export interface CinemaFormValues {
  id?: string | number;
  name: string;
  address: string;
  stateId: string;
  municipalityId: string;
}

interface CinemaFormProps {
  isEditing?: boolean;
}

export function CinemaForm({ isEditing = false }: CinemaFormProps) {
  const router = useRouter();

  const form = useForm<CinemaFormValues>({
    initialValues: {
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

  // 1. Obtenemos TODOS los estados para el primer Select
  const { data: states, isLoading: isLoadingStates } =
    api.state.getAll.useQuery();

  const statesData = useMemo(() => {
    return (
      states?.map((state) => ({
        value: state.id.toString(),
        label: state.name,
      })) || []
    );
  }, [states]);

  // 2. Obtenemos los municipios DINÁMICAMENTE según el estado seleccionado
  const stateIdNum = Number(form.values.stateId);
  const { data: municipalities, isFetching: isFetchingMunicipalities } =
    api.municipality.getByStateId.useQuery(
      { stateId: stateIdNum },
      {
        // Solo ejecuta la petición a la API si hay un stateId seleccionado válido
        enabled: !!form.values.stateId && !isNaN(stateIdNum),
      }
    );

  // 3. Mapeamos directamente la respuesta de la API (ya vienen filtrados)
  const availableMunicipalities = useMemo(() => {
    // Verificamos que sea un array (por si acaso la API devuelve error o null)
    if (!municipalities || !Array.isArray(municipalities)) return [];

    return municipalities.map((m) => ({
      value: m.id.toString(),
      label: m.name,
    }));
  }, [municipalities]);

  // 4. Mutación para crear el cine
  const createCinema = api.cinema.create.useMutation({
    onSuccess: () => {
      router.push('/admin/locations/cinemas');
    },
  });

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

      <form
        onSubmit={form.onSubmit((values) => {
          createCinema.mutate({
            name: values.name,
            address: values.address,
            municipalityId: Number(values.municipalityId),
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
                form.setFieldValue('municipalityId', ''); // Magia de la cascada
              }}
            />
            <Select
              label="Municipio"
              placeholder={
                // Usamos isFetching porque queremos que muestre cargando
                // cada vez que el estado cambia y hace una nueva petición
                isFetchingMunicipalities
                  ? 'Cargando municipios...'
                  : form.values.stateId
                    ? 'Selecciona un municipio'
                    : 'Primero selecciona un estado'
              }
              searchable
              withAsterisk
              // Bloqueamos mientras carga la petición
              disabled={!form.values.stateId || isFetchingMunicipalities}
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
            loading={createCinema.isPending}
            disabled={isLoadingStates || isFetchingMunicipalities}
          >
            {isEditing ? 'Guardar Cambios' : 'Crear Cine'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
