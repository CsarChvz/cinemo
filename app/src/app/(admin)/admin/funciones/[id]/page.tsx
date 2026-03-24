'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Stack,
  Group,
  Button,
  Title,
  Text,
  Paper,
  SimpleGrid,
  Badge,
  Divider,
  ThemeIcon,
  Box,
  rem,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconMovie,
  IconMapPin,
  IconArmchair,
  IconClock,
  IconCalendar,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function DetalleFuncionPage() {
  const { id } = useParams();
  const router = useRouter();

  // Simulación de datos de la función (Esto vendría de tu API de Python)
  const screening = {
    id: id,
    movie: {
      title: 'Interstellar',
      genre: 'Ciencia Ficción',
      duration: '169 min',
      clasification: 'B',
    },
    cinema: 'Cinepolis La Gran Plaza',
    municipality: 'Zapopan, Jalisco',
    location: 'Sala 4',
    start: new Date('2026-03-25T18:30:00'),
    end: new Date('2026-03-25T21:19:00'),
    tickets_remaining: 45,
    total_capacity: 120,
    status: 'Activa',
  };

  const occupancyRate = Math.round(
    ((screening.total_capacity - screening.tickets_remaining) /
      screening.total_capacity) *
      100
  );

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        {/* Header de Navegación */}
        <Group justify="space-between">
          <Button
            variant="subtle"
            color="gray"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => router.back()}
          >
            Volver a funciones
          </Button>

          <Group gap="xs">
            <Tooltip label="Editar función">
              <ActionIcon variant="light" size="lg" color="blue">
                <IconEdit size={20} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Eliminar función">
              <ActionIcon variant="light" size="lg" color="red">
                <IconTrash size={20} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        {/* Título y Estado Principal */}
        <Paper withBorder p="xl" radius="md" shadow="sm">
          <Group justify="space-between" align="flex-start">
            <Stack gap={4}>
              <Group gap="xs">
                <Title order={2}>{screening.movie.title}</Title>
                <Badge
                  variant="filled"
                  color={screening.status === 'Activa' ? 'green' : 'gray'}
                >
                  {screening.status}
                </Badge>
              </Group>
              <Text c="dimmed" size="sm">
                ID de Función: #{id}
              </Text>
            </Stack>

            <Stack align="flex-end" gap={0}>
              <Text fw={700} size="xl" c="blue">
                {occupancyRate}%
              </Text>
              <Text size="xs" c="dimmed" tt="uppercase">
                Ocupación de Sala
              </Text>
            </Stack>
          </Group>

          <Divider my="xl" />

          {/* Grid de Información Detallada */}
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            {/* Columna 1: Horario */}
            <Stack gap="md">
              <Group gap="sm">
                <ThemeIcon variant="light" size="lg" radius="md">
                  <IconCalendar size={20} />
                </ThemeIcon>
                <Text fw={700}>Fecha y Horario</Text>
              </Group>
              <Box pl={rem(40)}>
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
              </Box>
            </Stack>

            {/* Columna 2: Ubicación */}
            <Stack gap="md">
              <Group gap="sm">
                <ThemeIcon variant="light" color="teal" size="lg" radius="md">
                  <IconMapPin size={20} />
                </ThemeIcon>
                <Text fw={700}>Ubicación</Text>
              </Group>
              <Box pl={rem(40)}>
                <Text size="sm" fw={500}>
                  {screening.cinema}
                </Text>
                <Text size="sm" c="dimmed">
                  {screening.municipality}
                </Text>
                <Badge variant="outline" mt={8}>
                  {screening.location}
                </Badge>
              </Box>
            </Stack>

            {/* Columna 3: Disponibilidad */}
            <Stack gap="md">
              <Group gap="sm">
                <ThemeIcon variant="light" color="orange" size="lg" radius="md">
                  <IconArmchair size={20} />
                </ThemeIcon>
                <Text fw={700}>Disponibilidad</Text>
              </Group>
              <Box pl={rem(40)}>
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
                <Text size="xs" c="dimmed" mt={4}>
                  Boletos restantes para la venta
                </Text>
              </Box>
            </Stack>
          </SimpleGrid>
        </Paper>

        {/* Sección de la Película (Resumen) */}
        <Paper withBorder p="lg" radius="md">
          <Group align="center" gap="lg">
            <ThemeIcon
              size={50}
              radius="md"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
            >
              <IconMovie size={30} />
            </ThemeIcon>
            <Stack gap={2}>
              <Text fw={700}>Detalles de la Cinta</Text>
              <Group gap="xs">
                <Text size="sm" c="dimmed">
                  {screening.movie.genre}
                </Text>
                <Text size="sm" c="dimmed">
                  •
                </Text>
                <Text size="sm" c="dimmed">
                  {screening.movie.duration}
                </Text>
                <Text size="sm" c="dimmed">
                  •
                </Text>
                <Badge size="xs" variant="outline">
                  {screening.movie.clasification}
                </Badge>
              </Group>
            </Stack>
            <Button variant="subtle" ml="auto" size="sm">
              Ver ficha completa
            </Button>
          </Group>
        </Paper>
      </Stack>
    </Container>
  );
}
