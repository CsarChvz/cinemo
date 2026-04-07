// components/movie-screenings/ScreeningDetailContent/ScreeningDetailContent.tsx
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
import 'dayjs/locale/es'; // Importante si quieres que los meses salgan en español
import { InfoSection } from '../InfoSection/InfoSection';
import { MovieScreening } from '@/schemas/movie-screening';

interface ScreeningDetailContentProps {
  screening: MovieScreening;
}

export function ScreeningDetailContent({
  screening,
}: ScreeningDetailContentProps) {
  // Calculamos la ocupación de forma segura (evitando división por cero por si acaso)
  const capacity = screening.totalCapacity > 0 ? screening.totalCapacity : 1;
  const occupancyRate = Math.round(
    ((capacity - screening.ticketsRemaining) / capacity) * 100
  );

  return (
    <Paper withBorder p="xl" radius="md" shadow="sm">
      <Group justify="space-between" align="flex-start">
        <Stack gap={4}>
          <Group gap="xs">
            <Title order={2}>{screening.movie.title}</Title>
            <Badge color={screening.status === 'Activo' ? 'green' : 'gray'}>
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
            {/* Formateamos la fecha */}
            {dayjs(screening.start).locale('es').format('DD [de] MMMM, YYYY')}
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
            {/* Rutas anidadas de Zod */}
            {screening.room.cinema.name}
          </Text>
          <Text size="sm" c="dimmed">
            {screening.room.cinema.municipality.name}
          </Text>
          <Badge variant="outline" mt={8}>
            {screening.room.name} ({screening.room.roomType})
          </Badge>
        </InfoSection>

        <InfoSection icon={IconArmchair} color="orange" title="Disponibilidad">
          <Text
            size="lg"
            fw={800}
            c={screening.ticketsRemaining < 20 ? 'red' : 'green'}
          >
            {screening.ticketsRemaining}
            <Text span fw={400} size="sm" c="dimmed">
              {' '}
              / {screening.totalCapacity} asientos
            </Text>
          </Text>
        </InfoSection>
      </SimpleGrid>
    </Paper>
  );
}
