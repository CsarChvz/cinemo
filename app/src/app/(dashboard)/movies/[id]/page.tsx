'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  Container,
  Grid,
  GridCol,
  Image,
  Badge,
  Title,
  Text,
  Group,
  Stack,
  Button,
  ActionIcon,
  Paper,
  Divider,
  rem,
  SimpleGrid,
  Box,
  Center,
} from '@mantine/core';
import {
  IconClock,
  IconArrowLeft,
  IconHeart,
  IconCalendar,
  IconUser,
  IconMovie,
  IconMapPin,
} from '@tabler/icons-react';

// Componentes de la Guía de Programación
import { LocationSidebar } from '@/components/program_guide/LocationSidebar';
import { ProgramGuideContent } from '@/components/program_guide/ProgramGuideContent';
import {
  MovieGenre,
  MovieClasification,
  Movie,
} from '@/interfaces/movie.interface';
import { useEffect, useState } from 'react';
import { ImplementationDevTools } from '@/components/common/ImplementationDevTools/ImplementationDevTools';

// Dummy Data
const DUMMY_MOVIES: Movie[] = [
  {
    id: 1,
    title: 'Interstellar',
    genre: MovieGenre.CIENCIA_FICCION,
    clasification: MovieClasification.B,
    duration: '169 min',
    posterUrl:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
    description:
      'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por asegurar la supervivencia de la humanidad.',
    director: 'Christopher Nolan',
    producer: 'Emma Thomas',
    releaseYear: 2014,
  },
];

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const cine = searchParams.get('cine');
  const movie = DUMMY_MOVIES.find((m) => m.id === Number(params.id));

  const [isManual, setIsManual] = useState(false);

  // Cargar estado inicial del LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('manual-implementation');
    if (saved !== null) setIsManual(JSON.parse(saved));
  }, []);

  if (!movie) {
    return (
      <Container size="sm" py={100}>
        <Center>
          <Stack>
            <Title order={2}>Película no encontrada</Title>
            <Button onClick={() => router.push('/movies')}>Volver</Button>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <ImplementationDevTools isManual={isManual} onChange={setIsManual} />

      {/* @TODO: Implementar las funciones manuales de ordenamiento */}

      {/* 1. Header de Navegación */}
      <Button
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        onClick={() => router.push('/movies')}
        mb="xl"
        color="gray"
      >
        Volver al catálogo
      </Button>

      {/* 2. Sección de Información Principal */}
      <Grid gap={50} mb={60}>
        <GridCol span={{ base: 12, md: 4 }}>
          <Paper shadow="xl" radius="lg" style={{ overflow: 'hidden' }}>
            <Image src={movie.posterUrl} alt={movie.title} />
          </Paper>
        </GridCol>

        <GridCol span={{ base: 12, md: 8 }}>
          <Stack gap="lg">
            <header>
              <Group justify="space-between" align="flex-start">
                <Stack gap={4}>
                  <Title order={1} fz={rem(42)} fw={900} lh={1.1}>
                    {movie.title}
                  </Title>
                  <Group gap="xs">
                    <Text c="dimmed" fz="lg" fw={500}>
                      {movie.releaseYear}
                    </Text>
                    <Text c="dimmed">•</Text>
                    <Badge size="lg" variant="dot">
                      {movie.clasification}
                    </Badge>
                  </Group>
                </Stack>
                <ActionIcon variant="outline" color="red" size="xl" radius="md">
                  <IconHeart size={24} />
                </ActionIcon>
              </Group>
            </header>

            <SimpleGrid cols={{ base: 1, sm: 3 }}>
              <Group gap="sm">
                <IconClock size={20} color="blue.6" />
                <div>
                  <Text size="xs" c="dimmed" fw={700}>
                    DURACIÓN
                  </Text>
                  <Text fw={600}>{movie.duration}</Text>
                </div>
              </Group>
              <Group gap="sm">
                <IconMovie size={20} color="blue.6" />
                <div>
                  <Text size="xs" c="dimmed" fw={700}>
                    GÉNERO
                  </Text>
                  <Text fw={600}>{movie.genre}</Text>
                </div>
              </Group>
              <Group gap="sm">
                <IconCalendar size={20} color="blue.6" />
                <div>
                  <Text size="xs" c="dimmed" fw={700}>
                    ESTRENO
                  </Text>
                  <Text fw={600}>{movie.releaseYear}</Text>
                </div>
              </Group>
            </SimpleGrid>

            <Divider />
            <Text size="lg" lh={1.6} c="gray.7">
              {movie.description}
            </Text>

            <SimpleGrid cols={2}>
              <Stack gap={0}>
                <Text size="xs" c="dimmed" fw={700}>
                  DIRECTOR
                </Text>
                <Text fw={600}>{movie.director}</Text>
              </Stack>
              <Stack gap={0}>
                <Text size="xs" c="dimmed" fw={700}>
                  PRODUCTOR
                </Text>
                <Text fw={600}>{movie.producer}</Text>
              </Stack>
            </SimpleGrid>
          </Stack>
        </GridCol>
      </Grid>

      {/* 3. Sección de Funciones (Separada) */}
      <Box mt={80}>
        <Stack gap="xs" mb="xl" align="center">
          <Badge color="blue" variant="filled" size="lg" radius="sm">
            HORARIOS DISPONIBLES
          </Badge>
          <Title order={2} fz={rem(32)}>
            Funciones de esta película
          </Title>
          <Text c="dimmed">
            Selecciona una ubicación para consultar salas y horarios de
            proyección
          </Text>
        </Stack>

        <Paper withBorder p="xl" radius="lg" shadow="xs" bg="gray.0">
          <Grid gap="xl">
            {/* Filtros de Ubicación */}
            <GridCol span={{ base: 12, md: 3 }}>
              <LocationSidebar />
            </GridCol>

            {/* Resultado de Horarios */}
            <GridCol span={{ base: 12, md: 9 }}>
              {cine ? (
                <ProgramGuideContent cine={cine} />
              ) : (
                <Center
                  p={60}
                  style={{
                    border: '2px dashed #cbd5e1',
                    borderRadius: 12,
                    height: '100%',
                  }}
                >
                  <Stack align="center" gap="sm">
                    <IconMapPin size={48} color="#94a3b8" stroke={1.5} />
                    <Text c="dimmed" fw={500} ta="center">
                      Por favor, selecciona un estado, municipio y complejo{' '}
                      <br />
                      en el panel izquierdo para ver las funciones de{' '}
                      <b>{movie.title}</b>.
                    </Text>
                  </Stack>
                </Center>
              )}
            </GridCol>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}
