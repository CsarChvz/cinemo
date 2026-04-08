import { Metadata } from 'next';
import { Container, Stack, Title, Text } from '@mantine/core';
import { notFound } from 'next/navigation';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { EditMovieScreeningForm } from '@/components/movie-screenings/EditMovieScreeningForm/EditMovieScreeningForm';

interface EditarFuncionPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EditarFuncionPageProps): Promise<Metadata> {
  const { id } = await params;
  const screeningId = Number(id);

  if (isNaN(screeningId) || screeningId <= 0) {
    return { title: 'Editar Función | Cinemo' };
  }

  try {
    const screening = await api.movieScreening.getById({ id: screeningId });

    if (!screening) {
      return { title: 'Función no encontrada | Cinemo' };
    }

    return {
      title: `Editar Función: ${screening.movie.title} | Cinemo`,
      description: `Modifica el horario, sala y disponibilidad de la función #${screening.id}.`,
    };
  } catch (error) {
    return { title: 'Editar Función | Cinemo' };
  }
}

export default async function EditarFuncionPage({
  params,
}: EditarFuncionPageProps) {
  const { id } = await params;
  const screeningId = Number(id);

  if (isNaN(screeningId) || screeningId <= 0) {
    notFound();
  }

  const screening = await api.movieScreening.getById({ id: screeningId });

  if (!screening) {
    notFound();
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButton href="/admin/movie-screenings" />

        <div>
          <Title order={2}>Editar Función</Title>
          <Text c="dimmed">
            Película:{' '}
            <Text span fw={700} c="blue">
              {screening.movie.title}
            </Text>{' '}
            (ID: #{screening.id})
          </Text>
        </div>

        <EditMovieScreeningForm screening={screening} />
      </Stack>
    </Container>
  );
}
