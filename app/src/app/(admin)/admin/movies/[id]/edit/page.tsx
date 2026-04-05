'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Loader,
  Center,
  Group,
  Alert,
} from '@mantine/core';
import { IconArrowLeft, IconAlertCircle } from '@tabler/icons-react';
import { NuevaPeliculaForm } from '@/components/movies/NewMovieForm/NewMovieForm';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Movie, MovieClassification } from '@/schemas/movie';

export default function EditarPeliculaPage() {
  const params = useParams();
  // Forzamos que el ID sea string para evitar errores de tipo
  const id = typeof params.id === 'string' ? params.id : '';

  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    // Simulación de fetch a tu API de Python
    const fetchMovie = async () => {
      try {
        setLoading(true);
        // Aquí iría: const res = await fetch(`http://localhost:8000/movies/${id}`);

        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulación delay

        const mockData: Movie = {
          id: Number(id),
          title: 'Inception',
          posterUrl: 'https://ejemplo.com/poster.jpg',
          genre: 'Ciencia Ficcion' as any, // Cast temporal para el enum
          durationMin: 148,
          description: 'Un ladrón que roba secretos corporativos...',
          director: 'Christopher Nolan',
          producer: 'Warner Bros',
          classification: MovieClassification.B,
          releaseYear: 2010,
          isActive: true,
        };

        setMovieData(mockData);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <Center h={400}>
        <Loader color="blue" size="xl" type="bars" />
      </Center>
    );
  }

  if (error || !movieData) {
    return (
      <Container size="sm" py="xl">
        <Alert
          variant="light"
          color="red"
          title="Error"
          icon={<IconAlertCircle />}
        >
          No se pudo encontrar la película con el ID especificado o hubo un
          error de conexión.
        </Alert>
        <Button component={Link} href="/admin/movies" mt="md" variant="subtle">
          Volver a la lista
        </Button>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Group>
          <Button
            component={Link}
            href="/admin/movies"
            variant="subtle"
            color="gray"
            leftSection={<IconArrowLeft size={16} />}
          >
            Volver a la lista
          </Button>
        </Group>

        <div>
          <Title order={2}>Editar Película</Title>
          {/* El ID siempre es string aquí por la validación inicial */}
          <Text c="dimmed">
            ID de sistema:{' '}
            <Text span fw={700} c="blue">
              #{id}
            </Text>
          </Text>
        </div>

        <NuevaPeliculaForm
          initialValues={movieData}
          isEditing={true}
          onSubmit={(values) => {
            console.log('Enviando cambios a Python API:', values);
            // Aquí llamarías a fetch con método PUT
          }}
        />
      </Stack>
    </Container>
  );
}
