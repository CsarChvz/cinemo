import { Container, Stack, Title, Text } from '@mantine/core';
import { notFound } from 'next/navigation';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { EditMovieForm } from '@/components/movies/EditMovieForm/EditMovieForm';

interface EditarPeliculaPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarPeliculaPage({
  params,
}: EditarPeliculaPageProps) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId) || movieId <= 0) {
    notFound();
  }

  // Obtenemos los datos reales de la película desde el servidor
  const movie = await api.movie.getById({ id: movieId });

  if (!movie) {
    notFound();
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButton href="/admin/movies" />

        <div>
          <Title order={2}>Editar Película</Title>
          <Text c="dimmed">
            ID de sistema:{' '}
            <Text span fw={700} c="blue">
              #{movie.id}
            </Text>
          </Text>
        </div>

        <EditMovieForm movie={movie} />
      </Stack>
    </Container>
  );
}
