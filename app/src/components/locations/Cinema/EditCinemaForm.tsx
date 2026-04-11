// components/locations/Cinema/EditCinemaForm.tsx
'use client';

import { api } from '@/trpc-folder/trpc-adaptadores/react';
import { Cinema } from '@/schemas/cinema';
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
  latitude: number | '';
  longitude: number | '';
}

interface EditCinemaFormProps {
  cinema: Cinema;
}

export function EditCinemaForm({ cinema }: EditCinemaFormProps) {
  const router = useRouter();

  const form = useForm<EditCinemaFormValues>({
    initialValues: {
      name: cinema.name,
      address: cinema.address,
      stateId: cinema.municipality.state.id.toString(),
      municipalityId: cinema.municipality.id.toString(),
      latitude: cinema.latitude,
      longitude: cinema.longitude,
    },
    validate: {
      name: (value) => (value.trim().length < 3 ? 'Nombre muy corto' : null),
      address: (value) =>
        value.trim().length < 5 ? 'Dirección muy corta' : null,
      stateId: (value) => (!value ? 'Selecciona un estado' : null),
      municipalityId: (value) => (!value ? 'Selecciona un municipio' : null),
      // 🔥 Validaciones para coordenadas
      latitude: (value) =>
        value === ''
          ? 'Requerido'
          : value < -90 || value > 90
            ? 'Latitud inválida (-90 a 90)'
            : null,
      longitude: (value) =>
        value === ''
          ? 'Requerido'
          : value < -180 || value > 180
            ? 'Longitud inválida (-180 a 180)'
            : null,
    },
  });

  // 1. Obtenemos TODOS los estados
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

  // 2. Obtenemos los municipios por estado
  const stateIdNum = Number(form.values.stateId);
  const { data: municipalities, isFetching: isFetchingMunicipalities } =
    api.municipality.getByStateId.useQuery(
      { stateId: stateIdNum },
      { enabled: !!form.values.stateId && !isNaN(stateIdNum) }
    );

  const availableMunicipalities = useMemo(() => {
    if (!municipalities || !Array.isArray(municipalities)) return [];
    return municipalities.map((m) => ({
      value: m.id.toString(),
      label: m.name,
    }));
  }, [municipalities]);

  // 3. Mutación para ACTUALIZAR
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
          Actualiza la información técnica y la ubicación geográfica del cine.
        </Text>
      </Stack>

      <form
        onSubmit={form.onSubmit((values) => {
          editCinema.mutate({
            id: cinema.id,
            data: {
              name: values.name,
              address: values.address,
              municipalityId: Number(values.municipalityId),
              // 🔥 Enviamos las coordenadas convertidas a Number
              latitude: Number(values.latitude),
              longitude: Number(values.longitude),
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
              placeholder={isLoadingStates ? 'Cargando...' : 'Selecciona'}
              searchable
              withAsterisk
              data={statesData}
              disabled={isLoadingStates}
              {...form.getInputProps('stateId')}
              onChange={(val) => {
                form.setFieldValue('stateId', val || '');
                form.setFieldValue('municipalityId', '');
              }}
            />
            <Select
              label="Municipio"
              placeholder="Selecciona municipio"
              searchable
              withAsterisk
              disabled={!form.values.stateId || isFetchingMunicipalities}
              data={availableMunicipalities}
              {...form.getInputProps('municipalityId')}
            />
          </SimpleGrid>

          {/* 🔥 Sección de Coordenadas agregada */}
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <NumberInput
              label="Latitud"
              placeholder="Ej. 20.6820"
              decimalScale={6}
              fixedDecimalScale
              withAsterisk
              {...form.getInputProps('latitude')}
            />
            <NumberInput
              label="Longitud"
              placeholder="Ej. -103.4617"
              decimalScale={6}
              fixedDecimalScale
              withAsterisk
              {...form.getInputProps('longitude')}
            />
          </SimpleGrid>
          <Text size="xs" c="dimmed" mt="sm">
            Asegúrate de que las coordenadas coincidan con la ubicación real
            para el cálculo de distancias.
          </Text>

          <Button
            type="submit"
            size="md"
            mt="xl"
            fullWidth
            leftSection={<IconDeviceFloppy size={20} />}
            variant="gradient"
            gradient={{ from: 'violet', to: 'purple' }}
            loading={editCinema.isPending}
            disabled={isLoadingStates || isFetchingMunicipalities}
          >
            Guardar Cambios
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
