'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Grid,
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
  Center,
} from '@mantine/core';
import {
  IconClock,
  IconArrowLeft,
  IconHeart,
  IconCalendar,
  IconUser,
  IconMovie,
} from '@tabler/icons-react';
import {
  MovieGenre,
  MovieClasification,
  Movie,
} from '@/interfaces/movie.interface';

// 1. Dummy Data actualizado con tu interfaz Movie
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
  {
    id: 2,
    title: 'The Dark Knight',
    genre: MovieGenre.ACCION,
    clasification: MovieClasification.B15,
    duration: '152 min',
    posterUrl:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
    description:
      'Batman se enfrenta al Joker, un criminal que busca sumergir a Ciudad Gótica en el caos absoluto.',
    director: 'Christopher Nolan',
    producer: 'Charles Roven',
    releaseYear: 2008,
  },
];

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();

  const movie = DUMMY_MOVIES.find((m) => m.id === Number(params.id));

  if (!movie) {
    return (
      <Container size="sm" py={100}>
        <Center>
          <Stack align="center">
            <Title order={2}>Película no encontrada</Title>
            <Button variant="light" onClick={() => router.push('/movies')}>
              Volver al catálogo
            </Button>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Button
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        onClick={() => router.back()}
        mb="xl"
        color="gray"
      >
        Volver
      </Button>

      <Grid gap={50}>
        {/* Poster */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper shadow="xl" radius="lg" style={{ overflow: 'hidden' }}>
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              fallbackSrc="https://placehold.co/600x900?text=No+Poster"
            />
          </Paper>
        </Grid.Col>

        {/* Info */}
        <Grid.Col span={{ base: 12, md: 8 }}>
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

            {/* Quick Stats Grid */}
            <SimpleGrid cols={{ base: 1, sm: 3 }} verticalSpacing="md">
              <Group gap="sm">
                <IconClock size={20} color="var(--mantine-color-blue-6)" />
                <div>
                  <Text size="xs" c="dimmed" fw={700}>
                    DURACIÓN
                  </Text>
                  <Text fw={600}>{movie.duration}</Text>
                </div>
              </Group>
              <Group gap="sm">
                <IconMovie size={20} color="var(--mantine-color-blue-6)" />
                <div>
                  <Text size="xs" c="dimmed" fw={700}>
                    GÉNERO
                  </Text>
                  <Text fw={600}>{movie.genre}</Text>
                </div>
              </Group>
              <Group gap="sm">
                <IconCalendar size={20} color="var(--mantine-color-blue-6)" />
                <div>
                  <Text size="xs" c="dimmed" fw={700}>
                    ESTRENO
                  </Text>
                  <Text fw={600}>{movie.releaseYear}</Text>
                </div>
              </Group>
            </SimpleGrid>

            <Divider />

            {/* Sinopsis */}
            <div>
              <Text
                fw={800}
                fz="sm"
                c="dimmed"
                mb={8}
                style={{ letterSpacing: rem(1) }}
              >
                SINOPSIS
              </Text>
              <Text size="lg" lh={1.6}>
                {movie.description}
              </Text>
            </div>

            {/* Ficha Técnica Relevante */}
            <SimpleGrid cols={2} spacing="xl">
              <Stack gap={0}>
                <Group gap={6} mb={4}>
                  <IconUser size={14} color="dimmed" />
                  <Text size="xs" c="dimmed" fw={700}>
                    DIRECTOR
                  </Text>
                </Group>
                <Text fw={600}>{movie.director}</Text>
              </Stack>

              <Stack gap={0}>
                <Group gap={6} mb={4}>
                  <IconUser size={14} color="dimmed" />
                  <Text size="xs" c="dimmed" fw={700}>
                    PRODUCTOR
                  </Text>
                </Group>
                <Text fw={600}>{movie.producer}</Text>
              </Stack>
            </SimpleGrid>

            <Group mt="xl">
              <Button
                size="lg"
                radius="md"
                flex={1}
                gradient={{ from: 'blue', to: 'cyan' }}
                variant="gradient"
              >
                Reservar Boletos
              </Button>
              <Button size="lg" variant="light" radius="md" flex={1}>
                Ver Trailer
              </Button>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
