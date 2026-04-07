// components/movie-screenings/EditMovieScreeningForm.tsx
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
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { MovieScreening } from '@/schemas/movie-screening';

export interface EditMovieScreeningFormValues {
  movieId: string;
  stateId: string;
  municipalityId: string;
  cinemaId: string;
  roomId: string;
  start: Date | null;
}

interface EditMovieScreeningFormProps {
  screening: MovieScreening;
}

export function EditMovieScreeningForm({
  screening,
}: EditMovieScreeningFormProps) {
  const router = useRouter();

  const form = useForm<EditMovieScreeningFormValues>({
    // 🔥 Llenamos el formulario con los datos anidados de la base de datos
    initialValues: {
      movieId: screening?.movie?.id?.toString() ?? "",
      // Usamos ?. por si el backend envió el municipio/estado omitido por DTOs
      stateId: screening.room.cinema.municipality?.state?.id.toString() || '',
      municipalityId: screening.room.cinema.municipality?.id.toString() || '',
      cinemaId: screening.room.cinema.id.toString(),
      roomId: screening.room.id.toString(),
      start: new Date(screening.start),
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
  // 1. CARGA INICIAL
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
  // 2. CASCADAS DINÁMICAS (Se activan solas gracias al initialValues)
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
  // 3. MUTACIÓN (Actualizar Función)
  // ==========================================
  const editScreening = api.movieScreening.update.useMutation({
    onSuccess: () => {
      router.push('/admin/movie-screenings');
    },
    onError: (error) => {
      console.error('Error al actualizar:', error.message);
      alert(`Ocurrió un error al guardar: ${error.message}`);
    },
  });

  const stateProps = form.getInputProps('stateId');
  const municipalityProps = form.getInputProps('municipalityId');
  const cinemaProps = form.getInputProps('cinemaId');

  return (
    <Paper p={40} radius="xl" withBorder shadow="md">
      <Stack gap={5} mb="xl">
        <Title order={2}>Editar Función</Title>
        <Text c="dimmed" size="sm">
          Modifica los detalles de esta proyección.
        </Text>
      </Stack>

      <form
        onSubmit={form.onSubmit((values) => {
          // Cálculos idénticos a la creación para cumplir con tu Swagger
          const selectedMovie = movies?.find(
            (m) => m?.id?.toString() === values.movieId
          );
          const durationMin = selectedMovie?.durationMin || 120;

          const startDate = dayjs(values.start!);
          const endDate = startDate.add(durationMin, 'minute');

          const selectedRoom = rooms?.find(
            (r) => r.id.toString() === values.roomId
          );
          const capacity = selectedRoom?.capacity || screening.totalCapacity; // Fallback al original

          const payload = {
            movieId: Number(values.movieId),
            roomId: Number(values.roomId),
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            totalCapacity: capacity,
            status: screening.status, // Mantenemos el estatus original
          };

          // 🔥 Ejecutamos la mutación de UPDATE pasándole el ID de la función
          editScreening.mutate({
            id: screening.id,
            data: payload,
          });
        })}
      >
        <Stack gap="md">
          <Select
            label="Seleccionar Película"
            placeholder={
              isLoadingMovies ? 'Cargando...' : 'Busca la película...'
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
                stateProps.onChange(val);
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
                  ? 'Cargando...'
                  : 'Selecciona un municipio'
              }
              searchable
              withAsterisk
              data={municipalityOptions}
              disabled={!form.values.stateId || isFetchingMunicipalities}
              loading={isFetchingMunicipalities}
              {...municipalityProps}
              onChange={(val) => {
                municipalityProps.onChange(val);
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
                isFetchingCinemas ? 'Cargando...' : 'Selecciona un cine'
              }
              searchable
              withAsterisk
              data={cinemaOptions}
              disabled={!form.values.municipalityId || isFetchingCinemas}
              loading={isFetchingCinemas}
              {...cinemaProps}
              onChange={(val) => {
                cinemaProps.onChange(val);
                form.setFieldValue('roomId', '');
              }}
            />
            <Select
              clearable
              label="Sala"
              placeholder={
                isFetchingRooms ? 'Cargando...' : 'Selecciona una sala'
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
            loading={editScreening.isPending}
            disabled={
              isLoadingStates ||
              isFetchingMunicipalities ||
              isFetchingCinemas ||
              isFetchingRooms ||
              isLoadingMovies
            }
          >
            Guardar Cambios
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
