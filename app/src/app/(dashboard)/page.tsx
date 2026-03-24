'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  BackgroundImage,
  Overlay,
  Box,
  SimpleGrid,
  Paper,
} from '@mantine/core';
import {
  IconTicket,
  IconChevronRight,
  IconPlayerPlay,
} from '@tabler/icons-react';
import Link from 'next/link';
import { MovieCard } from '@/components/movies/MovieCard/MovieCard';
import { MovieGenre, MovieClasification } from '@/interfaces/movie.interface';

// Dummy data para el "Ahora en Cines"
const FEATURED_MOVIES = [
  {
    id: 1,
    title: 'Interstellar',
    genre: MovieGenre.CIENCIA_FICCION,
    clasification: MovieClasification.B,
    duration: '169 min',
    posterUrl:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
    description:
      'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio.',
  },
  {
    id: 5,
    title: 'Inception',
    genre: MovieGenre.CIENCIA_FICCION,
    clasification: MovieClasification.B,
    duration: '148 min',
    posterUrl:
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800',
    description: 'Un ladrón que roba secretos a través del subconsciente.',
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
      'Batman se enfrenta al Joker en una lucha por el alma de Gotham.',
  },
  {
    id: 3,
    title: 'Spider-Man',
    genre: MovieGenre.ANIMACION,
    clasification: MovieClasification.A,
    duration: '140 min',
    posterUrl:
      'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800',
    description: 'Miles Morales se lanza a través del Multiverso.',
  },
];

export default function HomePage() {
  return (
    <Stack gap={0}>
      {/* 1. HERO SECTION: El impacto visual inicial */}
      <Box style={{ position: 'relative' }}>
        <BackgroundImage
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070" // Imagen de sala de cine
          h={{ base: 400, md: 600 }}
        >
          <Overlay
            gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.95) 100%)"
            opacity={0.85}
            zIndex={1}
          />
          <Container
            size="xl"
            h="100%"
            style={{ position: 'relative', zIndex: 2 }}
          >
            <Center h="100%">
              <Stack align="center" gap="xl" ta="center">
                <Title
                  size={60}
                  fw={900}
                  c="white"
                  style={{ lineHeight: 1, letterSpacing: -2 }}
                >
                  TU CINE,{' '}
                  <Text
                    span
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                    inherit
                  >
                    TU MOMENTO
                  </Text>
                </Title>
                <Text c="gray.3" size="xl" maw={600} fw={500}>
                  Descubre los estrenos más esperados, reserva tus asientos
                  favoritos y vive la magia de la gran pantalla en Cinemo.
                </Text>
                <Group>
                  <Button
                    size="xl"
                    radius="md"
                    leftSection={<IconTicket size={24} />}
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                    component={Link}
                    href="/program-guide"
                  >
                    Ver Cartelera
                  </Button>
                </Group>
              </Stack>
            </Center>
          </Container>
        </BackgroundImage>
      </Box>

      {/* 2. SECCIÓN DE ESTRENOS: Reutilizamos tus MovieCards */}
      <Container size="xl" py={80}>
        <Group justify="space-between" mb="xl">
          <Stack gap={0}>
            <Title order={2} size="h1">
              Ahora en Cines
            </Title>
            <Text c="dimmed" size="lg">
              No te pierdas las películas de las que todos hablan.
            </Text>
          </Stack>
          <Button
            variant="subtle"
            rightSection={<IconChevronRight size={16} />}
            component={Link}
            href="/movies"
          >
            Ver todo el catálogo
          </Button>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
          {FEATURED_MOVIES.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </SimpleGrid>
      </Container>

      {/* 3. CALL TO ACTION: Membresía o Registro */}
      <Box bg="blue.9" py={60}>
        <Container size="xl">
          <Paper
            p="xl"
            radius="lg"
            bg="blue.8"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <Group justify="space-between">
              <Stack gap="xs">
                <Title order={2} c="white">
                  ¿Listo para la función?
                </Title>
                <Text c="blue.1">
                  Regístrate hoy y obtén beneficios exclusivos en tus boletos.
                </Text>
              </Stack>
              <Button
                size="lg"
                radius="md"
                color="white"
                c="blue.9"
                component={Link}
                href="/register"
              >
                Crear Cuenta Gratuita
              </Button>
            </Group>
          </Paper>
        </Container>
      </Box>
    </Stack>
  );
}

// Helper para centrar (si no lo tienes importado de Mantine)
function Center({ children, h }: { children: React.ReactNode; h?: any }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: h,
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}
