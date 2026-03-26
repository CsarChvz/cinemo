// components/screenings/ScreeningDetail/ScreeningDetailContent.tsx
import {
  Paper,
  Group,
  Stack,
  Title,
  Badge,
  Text,
  Divider,
  SimpleGrid,
} from '@mantine/core';
import {
  IconCalendar,
  IconClock,
  IconMapPin,
  IconArmchair,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { MovieScreening } from '@/interfaces/movie_screening.interface';
import { InfoSection } from '../InfoSection/InfoSection';

export function ScreeningDetailContent({
  screening,
}: {
  screening: MovieScreening;
}) {
  const occupancyRate = Math.round(
    ((screening.total_capacity - screening.tickets_remaining) /
      screening.total_capacity) *
      100
  );

  return (
    <Paper withBorder p="xl" radius="md" shadow="sm">
      <Group justify="space-between" align="flex-start">
        <Stack gap={4}>
          <Group gap="xs">
            <Title order={2}>{screening.movie.title}</Title>
            <Badge color={screening.status === 'Activa' ? 'green' : 'gray'}>
              {screening.status}
            </Badge>
          </Group>
          <Text c="dimmed" size="sm">
            ID de Función: #{screening.id}
          </Text>
        </Stack>

        <Stack align="flex-end" gap={0}>
          <Text fw={700} size="xl" c="blue">
            {occupancyRate}%
          </Text>
          <Text size="xs" c="dimmed" tt="uppercase">
            Ocupación
          </Text>
        </Stack>
      </Group>

      <Divider my="xl" />

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
        <InfoSection icon={IconCalendar} title="Fecha y Horario">
          <Text size="sm" fw={500}>
            {dayjs(screening.start).format('DD [de] MMMM, YYYY')}
          </Text>
          <Group gap={5} mt={4}>
            <IconClock size={14} color="gray" />
            <Text size="sm" c="dimmed">
              {dayjs(screening.start).format('hh:mm A')} -{' '}
              {dayjs(screening.end).format('hh:mm A')}
            </Text>
          </Group>
        </InfoSection>

        <InfoSection icon={IconMapPin} color="teal" title="Ubicación">
          <Text size="sm" fw={500}>
            {screening.cinema}
          </Text>
          <Text size="sm" c="dimmed">
            {screening.municipality}
          </Text>
          <Badge variant="outline" mt={8}>
            {screening.location}
          </Badge>
        </InfoSection>

        <InfoSection icon={IconArmchair} color="orange" title="Disponibilidad">
          <Text
            size="lg"
            fw={800}
            c={screening.tickets_remaining < 20 ? 'red' : 'green'}
          >
            {screening.tickets_remaining}
            <Text span fw={400} size="sm" c="dimmed">
              {' '}
              / {screening.total_capacity} asientos
            </Text>
          </Text>
        </InfoSection>
      </SimpleGrid>
    </Paper>
  );
}
