'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Stack,
  Group,
  Button,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import { IconArrowLeft, IconEdit, IconTrash } from '@tabler/icons-react';
import { MovieScreening } from '@/interfaces/movie_screening.interface';
import { ScreeningDetailContent } from '@/components/movie-screenings/ScreeningDetailContent/ScreeningDetailContent';
import { MovieSummaryCard } from '@/components/movie-screenings/MovieSummaryCard/MovieSummaryCard';
import { MovieClassification, MovieGenre } from '@/schemas/movie';

export default function DetalleFuncionPage() {
  const { id } = useParams();
  const router = useRouter();
  const idNumber = Number(id);
  // En un caso real, aquí usarías un hook como useScreening(id)
  const screening: MovieScreening = {
    id: idNumber,
    movie: {
      title: 'Interstellar',
      genre: MovieGenre.CIENCIA_FICCION,
      durationMin: 169,
      classification: MovieClassification.A,
      posterUrl: '',
      description: '',
      director: '',
      producer: '',
      releaseYear: 0,
      isActive: false,
    },
    cinema: 'Cinepolis La Gran Plaza',
    municipality: 'Zapopan, Jalisco',
    location: 'Sala 4',
    start: new Date('2026-03-25T18:30:00'),
    end: new Date('2026-03-25T21:19:00'),
    tickets_remaining: 45,
    total_capacity: 120,
    status: 'Activa',
    state: '',
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        {/* Barra de Herramientas */}
        <Group justify="space-between">
          <Button
            variant="subtle"
            color="gray"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => router.back()}
          >
            Volver
          </Button>

          <Group gap="xs">
            <Tooltip label="Editar">
              <ActionIcon variant="light" color="blue" size="lg">
                <IconEdit />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Eliminar">
              <ActionIcon variant="light" color="red" size="lg">
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        {/* Contenido Principal */}
        <ScreeningDetailContent screening={screening} />

        {/* Resumen de Película (Componente reutilizable) */}
        <MovieSummaryCard movie={screening.movie} />
      </Stack>
    </Container>
  );
}
