'use client';

import { useState, useMemo } from 'react';
import { api } from '@/trpc-folder/trpc-adaptadores/react';
import {
  Stack,
  Text,
  Group,
  Center,
  Loader,
  ThemeIcon,
  Badge,
  Box,
  HoverCard,
  UnstyledButton,
} from '@mantine/core';
import {
  DayView,
  ScheduleHeader,
  DateStringValue,
  ScheduleEventData,
} from '@mantine/schedule';
import { IconMovie, IconClock, IconArmchair } from '@tabler/icons-react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { EventDetails } from '../EventDetails/EventDetails';
import { useRouter } from 'next/navigation';

dayjs.locale('es');

interface ProgramGuideContentProps {
  cinemaId: number;
  movieId?: number;
}

export function ProgramGuideContent({
  cinemaId,
  movieId,
}: ProgramGuideContentProps) {
  const [date, setDate] = useState<DateStringValue>(
    dayjs().format('YYYY-MM-DD') as DateStringValue
  );

  // 1. Obtener datos de tRPC
  const { data: screenings, isLoading } = api.movieScreening.search.useQuery(
    { cinemaId, movieId },
    { enabled: !!cinemaId }
  );


  // 2. Transformar los datos de tRPC al formato de @mantine/schedule
  const scheduleEvents = useMemo(() => {
    if (!screenings || !Array.isArray(screenings)) return [];

    const colors = ['blue', 'cyan', 'grape', 'indigo', 'teal'];

    return screenings.map((event): ScheduleEventData => {
      const colorTheme = colors[(event?.movie?.id ?? 0) % colors.length];

      // 🔥 SOLUCIÓN: Usamos la hora de fin real enviada por el servidor
      // Hacemos un fallback de 2 horas SOLO si el backend manda un 'end' inválido o nulo.
      const endTime = event.end
        ? dayjs(event.end).toISOString()
        : dayjs(event.start).add(2, 'hour').toISOString();

      return {
        id: event.id.toString(), // Asegúrate de que el id sea string si la librería lo requiere
        title: event.movie.title,
        start: dayjs(event.start).toISOString(),
        end: endTime,
        color: colorTheme,
        payload: {
          roomId: event.room.id,
          roomName: event.room.name,
          tickets: event.ticketsRemaining,
          movieId: event.movie.id,
        },
      };
    });
  }, [screenings]);
  const router = useRouter();
  const handleEventClick = (event: ScheduleEventData) => {
    console.log('Abriendo reserva para la función ID:', event.id);

    const movieScreeningId = event.id;
    const roomId = event.payload?.roomId;

    console.log(event);

    if (!roomId) {
      console.error('No se encontró el ID de la sala en el evento');
      return;
    }

    // Redirigimos a la ruta: /funciones/[id]/asientos?roomId=[room]
    router.push(`/movie-screenings/${movieScreeningId}/seats?roomId=${roomId}`);
  };

  if (isLoading) {
    return (
      <Center h={400}>
        <Stack align="center">
          <Loader type="bars" color="blue" />
          <Text c="dimmed">Cargando cartelera...</Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Stack gap="md">
      {/* HEADER PERSONALIZADO */}
      <ScheduleHeader>
        <ScheduleHeader.Previous
          onClick={() =>
            setDate(
              dayjs(date)
                .subtract(1, 'day')
                .format('YYYY-MM-DD') as DateStringValue
            )
          }
        />
        <ScheduleHeader.Control interactive={false} miw={250}>
          <Group gap="xs">
            <IconMovie size={18} />
            <Text fw={700} style={{ textTransform: 'capitalize' }}>
              {dayjs(date).format('dddd, D [de] MMMM')}
            </Text>
          </Group>
        </ScheduleHeader.Control>
        <ScheduleHeader.Next
          onClick={() =>
            setDate(
              dayjs(date).add(1, 'day').format('YYYY-MM-DD') as DateStringValue
            )
          }
        />
        <ScheduleHeader.Today
          onClick={() =>
            setDate(dayjs().format('YYYY-MM-DD') as DateStringValue)
          }
        />
      </ScheduleHeader>

      {/* VISTA DE CALENDARIO */}
      <DayView
        date={date}
        onDateChange={setDate}
        events={scheduleEvents}
        startTime="11:00:00"
        endTime="23:59:59"
        slotLabelFormat="h:mm A"
        locale="es"
        scrollAreaProps={{ mah: 600, type: 'always' }}
        onEventClick={handleEventClick}
        withHeader={false}
        labels={{
          day: 'Día',
          week: 'Semana',
          month: 'Mes',
          year: 'Año',
          timeSlot: 'Franja horaria',
          today: 'Hoy',
          previous: 'Anterior',
          next: 'Siguiente',
        }}
        renderEventBody={(event) => (
          <Stack gap={4} p={2}>
            <Text fz="xs" fw={700} truncate lh={1.2}>
              {event.title}
            </Text>

            <Group gap={4} wrap="nowrap">
              <IconClock size={10} />
              <Text fz={9}>{dayjs(event.start).format('h:mm A')}</Text>
            </Group>

            <Group gap={4} wrap="nowrap">
              <Badge
                size="xs"
                variant="filled"
                color="white"
                c={event.color}
                p={4}
              >
                {event.payload?.roomName}
              </Badge>
              <Group gap={2}>
                <IconArmchair size={10} />
                <Text fz={9} fw={500}>
                  {event.payload?.tickets}
                </Text>
              </Group>
            </Group>
          </Stack>
        )}
        renderEvent={(event, props) => (
          <HoverCard
            width={280}
            position="bottom"
            closeDelay={0}
            transitionProps={{ duration: 0 }}
          >
            <HoverCard.Target>
              <UnstyledButton {...props} />
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <EventDetails event={event} />
            </HoverCard.Dropdown>
          </HoverCard>
        )}
      />

      <Text size="xs" c="dimmed" ta="center">
        * Haz click en una función para iniciar la reserva de boletos.
      </Text>
    </Stack>
  );
}
