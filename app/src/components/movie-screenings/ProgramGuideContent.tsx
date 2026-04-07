// components/movie-screenings/ProgramGuideContent.tsx
'use client';
import { useState, useMemo } from 'react';
import { api } from '@/trpc/react';
import {
  Stack,
  Title,
  Text,
  Badge,
  Group,
  Paper,
  ActionIcon,
  Tooltip,
  Divider,
  ThemeIcon,
  ScrollArea,
  Button,
  Center,
  Loader,
} from '@mantine/core';
import {
  IconSortAscendingNumbers,
  IconSortDescendingNumbers,
  IconClock,
  IconMovie,
  IconChevronLeft,
  IconChevronRight,
  IconCalendar,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

interface ProgramGuideContentProps {
  cinemaId: number;
}

export function ProgramGuideContent({ cinemaId }: ProgramGuideContentProps) {
  const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // 1. OBTENER LAS FUNCIONES DEL CINE SELECCIONADO
  const { data: screenings, isLoading } = api.movieScreening.search.useQuery(
    { cinemaId },
    { enabled: !!cinemaId }
  );

  // 2. FILTRAR POR FECHA Y ORDENAR
  const processedEvents = useMemo(() => {
    if (!screenings || !Array.isArray(screenings)) return [];

    // Filtramos las funciones que coincidan con el día seleccionado
    const filtered = screenings.filter((event) =>
      dayjs(event.start).isSame(selectedDate, 'day')
    );

    // Ordenamos por hora de inicio
    return filtered.sort((a, b) => {
      const diff = dayjs(a.start).diff(dayjs(b.start));
      return order === 'ASC' ? diff : -diff;
    });
  }, [screenings, order, selectedDate]);

  // Manejadores de Fecha
  const nextDay = () => setSelectedDate((prev) => prev.add(1, 'day'));
  const prevDay = () => setSelectedDate((prev) => prev.subtract(1, 'day'));
  const setToday = () => setSelectedDate(dayjs());

  // Extremos el nombre del cine desde el primer screening para ponerlo de título
  const cinemaName =
    screenings && screenings.length > 0
      ? screenings[0].room.cinema.name
      : 'Cartelera del Cine';

  if (isLoading) {
    return (
      <Center h={400}>
        <Stack align="center">
          <Loader type="bars" color="blue" />
          <Text c="dimmed">Buscando funciones...</Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Stack gap="lg">
      <Paper withBorder p="md" radius="md" shadow="sm">
        <Stack gap="md">
          <Group justify="space-between">
            <Stack gap={0}>
              <Title order={3}>{cinemaName}</Title>
              <Text size="sm" c="dimmed" fw={500}>
                {selectedDate.format('dddd, D [de] MMMM [de] YYYY')}
              </Text>
            </Stack>

            <Group gap="xs">
              <Text size="xs" fw={700} c="dimmed" visibleFrom="xs">
                ORDENAR HORA:
              </Text>
              <ActionIcon.Group>
                <Tooltip label="Más temprano primero">
                  <ActionIcon
                    variant={order === 'ASC' ? 'filled' : 'light'}
                    onClick={() => setOrder('ASC')}
                    size="lg"
                  >
                    <IconSortAscendingNumbers size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Más tarde primero">
                  <ActionIcon
                    variant={order === 'DESC' ? 'filled' : 'light'}
                    onClick={() => setOrder('DESC')}
                    size="lg"
                  >
                    <IconSortDescendingNumbers size={20} />
                  </ActionIcon>
                </Tooltip>
              </ActionIcon.Group>
            </Group>
          </Group>

          <Divider />

          <Group justify="center">
            <Button.Group>
              <Button
                variant="default"
                onClick={prevDay}
                leftSection={<IconChevronLeft size={16} />}
              >
                Anterior
              </Button>
              <Button
                variant="default"
                onClick={setToday}
                leftSection={<IconCalendar size={16} />}
              >
                Hoy
              </Button>
              <Button
                variant="default"
                onClick={nextDay}
                rightSection={<IconChevronRight size={16} />}
              >
                Siguiente
              </Button>
            </Button.Group>
          </Group>
        </Stack>
      </Paper>

      <ScrollArea h={500} offsetScrollbars>
        <Stack gap="md" pr="md">
          {processedEvents.length > 0 ? (
            processedEvents.map((event) => {
              // Determinamos color de la película basándonos en su ID para que sea consistente
              const colors = ['blue', 'cyan', 'grape', 'indigo', 'teal'];
              const colorTheme = colors[event?.movie?.id ?? 0 % colors.length];

              return (
                <Paper
                  key={event.id}
                  withBorder
                  p="sm"
                  radius="md"
                  style={{
                    borderLeft: `6px solid var(--mantine-color-${colorTheme}-filled)`,
                  }}
                >
                  <Group justify="space-between" align="center">
                    <Group gap="md">
                      <ThemeIcon variant="light" size="xl" color={colorTheme}>
                        <IconMovie size={24} />
                      </ThemeIcon>
                      <Stack gap={0}>
                        <Title order={4}>{event.movie.title}</Title>
                        <Group gap="xs">
                          <Badge size="xs" variant="outline" color={colorTheme}>
                            {event.room.name}
                          </Badge>
                          <Group gap={4}>
                            <IconClock size={14} color="dimmed" />
                            <Text size="sm" fw={700}>
                              {dayjs(event.start).format('h:mm A')}
                            </Text>
                          </Group>
                        </Group>
                      </Stack>
                    </Group>
                    <Button variant="light" color={colorTheme} radius="xl">
                      Boletos ({event.ticketsRemaining})
                    </Button>
                  </Group>
                </Paper>
              );
            })
          ) : (
            <Paper
              p="xl"
              withBorder
              radius="md"
              style={{ borderStyle: 'dashed' }}
            >
              <Stack align="center" gap="xs">
                <IconCalendar size={40} color="gray" />
                <Text c="dimmed">
                  No hay funciones programadas para este día.
                </Text>
                <Button variant="subtle" size="xs" onClick={setToday}>
                  Volver a hoy
                </Button>
              </Stack>
            </Paper>
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
