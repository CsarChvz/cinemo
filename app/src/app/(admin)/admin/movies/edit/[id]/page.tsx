import { Metadata } from 'next'; // 🔥 1. Importamos Metadata
import { Container, Stack, Title, Text } from '@mantine/core';
import { notFound } from 'next/navigation';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { EditMovieForm } from '@/components/movies/EditMovieForm/EditMovieForm';

interface EditarPeliculaPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EditarPeliculaPageProps): Promise<Metadata> {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId) || movieId <= 0) {
    return { title: 'Editar Película | Cinemo' };
  }

  try {
    // Buscamos los datos de la película
    const movie = await api.movie.getById({ id: movieId });

    if (!movie) {
      return { title: 'Película no encontrada | Cinemo' };
    }

    return {
      title: `Editar: ${movie.title} | Cinemo`,
      description: `Panel de administración para editar la información de ${movie.title}.`,
    };
  } catch (error) {
    return { title: 'Editar Película | Cinemo' };
  }
}

export default async function EditarPeliculaPage({
  params,
}: EditarPeliculaPageProps) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId) || movieId <= 0) {
    notFound();
  }

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
