'use client';
import { useState, useMemo } from 'react';
import { 
  Stack, Title, Text, Badge, Group, Paper, ActionIcon, 
  Tooltip, Divider, ThemeIcon, ScrollArea, Button, SegmentedControl
} from '@mantine/core';
import { 
  IconSortAscendingNumbers, 
  IconSortDescendingNumbers, 
  IconClock, 
  IconArmchair,
  IconMovie,
  IconChevronLeft,
  IconChevronRight,
  IconCalendar
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

interface MovieEvent {
  id: number;
  title: string;
  start: string; 
  end: string;
  sala: string;
  color: string;
}

export function ProgramGuideContent({ cine }: { cine: string }) {
  // --- ESTADOS ---
  const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Día seleccionado

  // --- DUMMY DATA (Diferentes días) ---
  const movieEvents: MovieEvent[] = [
    {
      id: 1, title: 'Interstellar',
      start: dayjs().hour(13).minute(0).format('YYYY-MM-DD HH:mm:ss'),
      end: dayjs().hour(15).minute(49).format('YYYY-MM-DD HH:mm:ss'),
      sala: 'Sala 1', color: 'blue',
    },
    {
      id: 2, title: 'Inception',
      start: dayjs().hour(10).minute(0).format('YYYY-MM-DD HH:mm:ss'),
      end: dayjs().hour(12).minute(30).format('YYYY-MM-DD HH:mm:ss'),
      sala: 'Sala 1', color: 'cyan',
    },
    {
      id: 3, title: 'Spider-Man',
      start: dayjs().add(1, 'day').hour(16).minute(0).format('YYYY-MM-DD HH:mm:ss'),
      end: dayjs().add(1, 'day').hour(18).minute(0).format('YYYY-MM-DD HH:mm:ss'),
      sala: 'Sala 2', color: 'red',
    }
  ];

  // --- LÓGICA DE FILTRADO Y ORDENAMIENTO ---
  const processedEvents = useMemo(() => {
    // 1. Primero filtramos por el día seleccionado
    const filtered = movieEvents.filter(event => 
      dayjs(event.start).isSame(selectedDate, 'day')
    );

    // 2. Luego ordenamos por hora
    return filtered.sort((a, b) => {
      const diff = dayjs(a.start).diff(dayjs(b.start));
      return order === 'ASC' ? diff : -diff;
    });
  }, [order, selectedDate]);

  // Manejadores de Fecha
  const nextDay = () => setSelectedDate(prev => prev.add(1, 'day'));
  const prevDay = () => setSelectedDate(prev => prev.subtract(1, 'day'));
  const setToday = () => setSelectedDate(dayjs());

  return (
    <Stack gap="lg">
      <Paper withBorder p="md" radius="md" shadow="sm">
        <Stack gap="md">
          <Group justify="space-between">
            <Stack gap={0}>
              <Title order={3}>{cine}</Title>
              <Text size="sm" c="dimmed" fw={500}>
                {selectedDate.format('dddd, D [de] MMMM [de] YYYY')}
              </Text>
            </Stack>

            {/* CONTROLES DE ORDEN (POR HORA) */}
            <Group gap="xs">
              <Text size="xs" fw={700} c="dimmed" visibleFrom="xs">ORDENAR HORA:</Text>
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

          {/* NAVEGACIÓN POR DÍAS (ORDENAR/CAMBIAR DÍA) */}
          <Group justify="center">
            <Button.Group>
              <Button variant="default" onClick={prevDay} leftSection={<IconChevronLeft size={16}/>}>
                Anterior
              </Button>
              <Button variant="default" onClick={setToday} leftSection={<IconCalendar size={16}/>}>
                Hoy
              </Button>
              <Button variant="default" onClick={nextDay} rightSection={<IconChevronRight size={16}/>}>
                Siguiente
              </Button>
            </Button.Group>
          </Group>
        </Stack>
      </Paper>

      {/* LISTA FILTRADA Y ORDENADA */}
      <ScrollArea h={450} offsetScrollbars>
        <Stack gap="md" pr="md">
          {processedEvents.length > 0 ? (
            processedEvents.map((event) => (
              <Paper 
                key={event.id} 
                withBorder 
                p="sm" 
                radius="md" 
                style={{ borderLeft: `6px solid var(--mantine-color-${event.color}-filled)` }}
              >
                <Group justify="space-between">
                  <Group gap="md">
                    <ThemeIcon variant="light" size="xl" color={event.color}>
                      <IconMovie size={24} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Title order={4}>{event.title}</Title>
                      <Group gap="xs">
                        <Badge size="xs" variant="outline">{event.sala}</Badge>
                        <Group gap={4}>
                          <IconClock size={14} />
                          <Text size="sm" fw={700}>
                            {dayjs(event.start).format('h:mm A')}
                          </Text>
                        </Group>
                      </Group>
                    </Stack>
                  </Group>
                  <Button variant="light" color={event.color} radius="xl">Boletos</Button>
                </Group>
              </Paper>
            ))
          ) : (
            <Paper p="xl" withBorder radius="md" style={{ borderStyle: 'dashed' }}>
              <Stack align="center" gap="xs">
                <IconCalendar size={40} color="gray" />
                <Text c="dimmed">No hay funciones programadas para este día.</Text>
                <Button variant="subtle" size="xs" onClick={setToday}>Volver a hoy</Button>
              </Stack>
            </Paper>
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}