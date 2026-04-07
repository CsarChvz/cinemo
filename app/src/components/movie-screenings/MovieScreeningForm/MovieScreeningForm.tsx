// components/movie-screenings/MovieScreeningForm.tsx
'use client';

import { api } from '@/trpc-folder/trpc-adaptadores/react';
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
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export interface MovieScreeningFormValues {
  movieId: string;
  stateId: string;
  municipalityId: string;
  cinemaId: string;
  roomId: string;
  start: Date | null;
}

interface MovieScreeningFormProps {
  isEditing?: boolean;
}

export function MovieScreeningForm({
  isEditing = false,
}: MovieScreeningFormProps) {
  const router = useRouter();

  const form = useForm<MovieScreeningFormValues>({
    initialValues: {
      movieId: '',
      stateId: '',
      municipalityId: '',
      cinemaId: '',
      roomId: '',
      start: null,
    },
    validate: {
      movieId: (v) => (!v ? 'Selecciona una película' : null),
      stateId: (v) => (!v ? 'Selecciona un estado' : null),
      municipalityId: (v) => (!v ? 'Selecciona un municipio' : null),
      cinemaId: (v) => (!v ? 'Selecciona un cine' : null),
      roomId: (v) => (!v ? 'Selecciona una sala' : null),
      start: (v) => (!v ? 'La fecha y hora es obligatoria' : null),
    },
  });

  // ==========================================
  // 1. CARGA INICIAL: Películas y Estados
  // ==========================================
  const { data: movies, isLoading: isLoadingMovies } =
    api.movie.getAll.useQuery();
  const { data: states, isLoading: isLoadingStates } =
    api.state.getAll.useQuery();

  const movieOptions = useMemo(() => {
    return (
      movies?.map((m) => ({
        value: m?.id?.toString() ?? '',
        label: m.title,
      })) || []
    );
  }, [movies]);

  const stateOptions = useMemo(() => {
    return (
      states?.map((s) => ({ value: s.id.toString(), label: s.name })) || []
    );
  }, [states]);

  // ==========================================
  // 2. CASCADA: Municipios (Depende de Estado)
  // ==========================================
  const stateIdNum = Number(form.values.stateId);
  const { data: municipalities, isFetching: isFetchingMunicipalities } =
    api.municipality.getByStateId.useQuery(
      { stateId: stateIdNum },
      { enabled: !!form.values.stateId && !isNaN(stateIdNum) }
    );

  const municipalityOptions = useMemo(() => {
    if (!municipalities || !Array.isArray(municipalities)) return [];
    return municipalities.map((m) => ({
      value: m.id.toString(),
      label: m.name,
    }));
  }, [municipalities]);

  // ==========================================
  // 3. CASCADA: Cines (Depende de Municipio)
  // ==========================================
  const municipalityIdNum = Number(form.values.municipalityId);
  const { data: cinemas, isFetching: isFetchingCinemas } =
    api.cinema.getByMunicipalityId.useQuery(
      { municipalityId: municipalityIdNum },
      { enabled: !!form.values.municipalityId && !isNaN(municipalityIdNum) }
    );

  const cinemaOptions = useMemo(() => {
    if (!cinemas || !Array.isArray(cinemas)) return [];
    return cinemas.map((c) => ({ value: c.id.toString(), label: c.name }));
  }, [cinemas]);

  // ==========================================
  // 4. CASCADA: Salas (Depende de Cine)
  // ==========================================
  const cinemaIdNum = Number(form.values.cinemaId);
  const { data: rooms, isFetching: isFetchingRooms } =
    api.room.getByCinemaId.useQuery(
      { cinemaId: cinemaIdNum },
      { enabled: !!form.values.cinemaId && !isNaN(cinemaIdNum) }
    );

  const roomOptions = useMemo(() => {
    if (!rooms || !Array.isArray(rooms)) return [];
    return rooms.map((r) => ({
      value: r.id.toString(),
      label: `${r.name} (${r.roomType} - Cap: ${r.capacity})`,
    }));
  }, [rooms]);

  // ==========================================
  // 5. MUTACIÓN (Guardar Función)
  // ==========================================
  const createScreening = api.movieScreening.create.useMutation({
    onSuccess: () => {
      console.log('Success');
      router.push('/admin/movie-screenings');
    },
    // 🔥 NUEVO: Manejo de errores para saber si falló el backend
    onError: (error) => {
      console.error('Error desde el backend/tRPC:', error.message);
      alert(`Ocurrió un error al guardar: ${error.message}`);
    },
  });

  // Extraemos los props de Mantine para no perder la magia de los errores
  const stateProps = form.getInputProps('stateId');
  const municipalityProps = form.getInputProps('municipalityId');
  const cinemaProps = form.getInputProps('cinemaId');

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

      <form
        onSubmit={form.onSubmit(
          (values) => {
            console.log('Todo válido. Calculando datos extra...');

            // 1. Buscamos la película seleccionada para saber cuánto dura
            const selectedMovie = movies?.find(
              (m) => m?.id?.toString() === values.movieId
            );
            // Si por algo no tiene duración, le ponemos 120 min por defecto
            const durationMin = selectedMovie?.durationMin || 120;

            // 2. Calculamos el "end" usando dayjs (que ya tenías importado)
            const startDate = dayjs(values.start!);
            const endDate = startDate.add(durationMin, 'minute');

            // 3. Buscamos la sala seleccionada para sacar su capacidad
            const selectedRoom = rooms?.find(
              (r) => r.id.toString() === values.roomId
            );
            const capacity = selectedRoom?.capacity || 0;

            const payload = {
              movieId: Number(values.movieId),
              roomId: Number(values.roomId),
              start: startDate.toISOString(),
              end: endDate.toISOString(),
              totalCapacity: capacity,
              status: 'Activo', // o el status que requieras
            };

            console.log('Enviando al backend:', payload);
            createScreening.mutate(payload);
          },
          (validationErrors) => {
            console.error('El formulario tiene errores:', validationErrors);
          }
        )}
      >
        <Stack gap="md">
          <Select
            label="Seleccionar Película"
            placeholder={
              isLoadingMovies ? 'Cargando películas...' : 'Busca la película...'
            }
            searchable
            withAsterisk
            data={movieOptions}
            disabled={isLoadingMovies}
            loading={isLoadingMovies}
            {...form.getInputProps('movieId')}
          />

          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Select
              clearable
              label="Estado"
              placeholder={
                isLoadingStates ? 'Cargando...' : 'Selecciona un estado'
              }
              searchable
              withAsterisk
              data={stateOptions}
              disabled={isLoadingStates}
              loading={isLoadingStates}
              {...stateProps}
              onChange={(val) => {
                stateProps.onChange(val); // Deja que Mantine registre el cambio
                form.setFieldValue('municipalityId', '');
                form.setFieldValue('cinemaId', '');
                form.setFieldValue('roomId', '');
              }}
            />
            <Select
              clearable
              label="Municipio"
              placeholder={
                isFetchingMunicipalities
                  ? 'Cargando municipios...'
                  : form.values.stateId
                    ? 'Selecciona un municipio'
                    : 'Primero selecciona un estado'
              }
              searchable
              withAsterisk
              data={municipalityOptions}
              disabled={!form.values.stateId || isFetchingMunicipalities}
              loading={isFetchingMunicipalities}
              {...municipalityProps}
              onChange={(val) => {
                municipalityProps.onChange(val); // Deja que Mantine registre el cambio
                form.setFieldValue('cinemaId', '');
                form.setFieldValue('roomId', '');
              }}
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Select
              clearable
              label="Cine"
              placeholder={
                isFetchingCinemas
                  ? 'Cargando cines...'
                  : form.values.municipalityId
                    ? 'Selecciona un cine'
                    : 'Primero selecciona un municipio'
              }
              searchable
              withAsterisk
              data={cinemaOptions}
              disabled={!form.values.municipalityId || isFetchingCinemas}
              loading={isFetchingCinemas}
              {...cinemaProps}
              onChange={(val) => {
                cinemaProps.onChange(val); // Deja que Mantine registre el cambio
                form.setFieldValue('roomId', '');
              }}
            />
            <Select
              clearable
              label="Sala"
              placeholder={
                isFetchingRooms
                  ? 'Cargando salas...'
                  : form.values.cinemaId
                    ? 'Selecciona una sala'
                    : 'Primero selecciona un cine'
              }
              searchable
              withAsterisk
              data={roomOptions}
              disabled={!form.values.cinemaId || isFetchingRooms}
              loading={isFetchingRooms}
              {...form.getInputProps('roomId')}
            />
          </SimpleGrid>

          <DateTimePicker
            label="Fecha y Hora de la función"
            placeholder="Selecciona el momento exacto"
            withAsterisk
            dropdownType="popover"
            {...form.getInputProps('start')}
          />

          <Button
            type="submit"
            size="md"
            mt="xl"
            fullWidth
            leftSection={<IconDeviceFloppy size={20} />}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            loading={createScreening.isPending}
            disabled={
              isLoadingStates ||
              isFetchingMunicipalities ||
              isFetchingCinemas ||
              isFetchingRooms ||
              isLoadingMovies
            }
          >
            {isEditing ? 'Guardar Cambios' : 'Publicar Función'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
