import { Metadata } from 'next';
import { Container, Stack, Title, Text } from '@mantine/core';
import { notFound } from 'next/navigation';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { EditCinemaForm } from '@/components/locations/Cinema/EditCinemaForm';
import { BackButton } from '@/components/common/BackButton/BackButton';

interface EditCinemaPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EditCinemaPageProps): Promise<Metadata> {
  const { id } = await params;
  const cinemaId = Number(id);

  if (isNaN(cinemaId) || cinemaId <= 0) {
    return { title: 'Editar Cine | Cinemo' };
  }

  try {
    const cinema = await api.cinema.getById({ id: cinemaId });

    if (!cinema) {
      return { title: 'Cine no encontrado | Cinemo' };
    }

    return {
      title: `Editar: ${cinema.name} | Cinemo`,
      description: `Actualiza la información, municipio y estado de la sucursal ${cinema.name}.`,
    };
  } catch (error) {
    return { title: 'Editar Cine | Cinemo' };
  }
}

export default async function EditCinemaPage({ params }: EditCinemaPageProps) {
  const { id } = await params;
  const cinemaId = Number(id);

  if (isNaN(cinemaId) || cinemaId <= 0) {
    notFound();
  }

  const cinema = await api.cinema.getById({ id: cinemaId });

  if (!cinema) {
    notFound();
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButton href="/admin/locations/cinemas" />

        {/* 🔥 4. Agregamos el encabezado para mantener la consistencia con las otras vistas de edición */}
        <div>
          <Title order={2}>Editar Cine</Title>
          <Text c="dimmed">
            Complejo:{' '}
            <Text span fw={700} c="blue">
              {cinema.name}
            </Text>{' '}
            (ID: #{cinema.id})
          </Text>
        </div>

        <EditCinemaForm cinema={cinema} />
      </Stack>
    </Container>
  );
}
