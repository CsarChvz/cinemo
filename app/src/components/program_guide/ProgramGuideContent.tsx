'use client';
import { useState } from 'react';
import { Stack, Title, Text, Badge, Group, Paper } from '@mantine/core';
import { DateStringValue, DayView, ScheduleEventData, ScheduleHeader } from '@mantine/schedule'; // Asegúrate de tener instalado @mantine/schedule
import dayjs from 'dayjs';
import { ClockIcon, MapPinIcon } from 'lucide-react';

interface ProgramGuideContentProps {
  cine: string;
}

export function ProgramGuideContent({ cine }: ProgramGuideContentProps) {
  const today = dayjs().format('YYYY-MM-DD');
 const [date, setDate] = useState<DateStringValue>(
   dayjs().format('YYYY-MM-DD')
 );

  const movieEvents: ScheduleEventData[] = [
    {
      id: 1,
      title: 'Interstellar',
      start: `${today} 13:00:00`,
      end: `${today} 15:49:00`,
      payload: {
        location: 'Sala 1',
      },
      color: 'blue',
    },
    {
      id: 3,
      title: 'Spider-Man',
      start: `${today} 16:30:00`,
      end: `${today} 19:15:00`,
      payload: {
        location: 'Sala 1',
      },
      color: 'red',
    },
  ];

  return (
    <Stack gap="lg">
      <Paper withBorder p="md" radius="md" bg="gray.0">
        <Group justify="space-between">
          <Stack gap={0}>
            <Title order={3} style={{ textTransform: 'capitalize' }}>
              {cine}
            </Title>
            <Text size="sm" c="dimmed">
              Horarios de proyección para hoy
            </Text>
          </Stack>
          <Badge size="lg" variant="filled">
            Cartelera Activa
          </Badge>
        </Group>
      </Paper>

      {/* El componente de horario visual */}
      <Paper withBorder radius="md" p="sm" style={{ overflow: 'hidden' }}>
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
          <ScheduleHeader.Control interactive={false} miw={200}>
            {dayjs(date).format('dddd, MMMM D, YYYY')}
          </ScheduleHeader.Control>
          <ScheduleHeader.Next
            onClick={() =>
              setDate(
                dayjs(date)
                  .add(1, 'day')
                  .format('YYYY-MM-DD') as DateStringValue
              )
            }
          />
          <ScheduleHeader.Today
            onClick={() =>
              setDate(dayjs().format('YYYY-MM-DD') as DateStringValue)
            }
          />
        </ScheduleHeader>

        <DayView
          date={date}
          onDateChange={setDate}
          events={movieEvents}
          startTime="12:00:00"
          endTime="21:00:00"
          withHeader={false}
          renderEventBody={(event) => (
            <Group>
              <Text fz={18} fw={500}>
                {event.title}
              </Text>
              <Group gap={4}>
                <ClockIcon size={12} />
                <Text fz={10} lh={1}>
                  {dayjs(event.start).format('h:mm A')} -{' '}
                  {dayjs(event.end).format('h:mm A')}
                </Text>
              </Group>

              {event.payload?.location && (
                <Group gap={4}>
                  <MapPinIcon size={12} />
                  <Text fz={10}>{event.payload.location}</Text>
                </Group>
              )}
            </Group>
          )}
        />
      </Paper>

      <Text size="xs" c="dimmed" ta="center">
        * Los horarios están sujetos a cambios sin previo aviso.
      </Text>
    </Stack>
  );
}
