// app/admin/locations/cinemas/edit/[id]/page.tsx
import { Container, Stack } from '@mantine/core';
import { notFound } from 'next/navigation';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { BackButtonCinemas } from '@/components/locations/BackButtonCinemas'; // El botón que creamos antes
import { EditCinemaForm } from '@/components/locations/EditCinemaForm';

interface EditCinemaPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCinemaPage({ params }: EditCinemaPageProps) {
  const { id } = await params;
  const cinemaId = Number(id);

  if (isNaN(cinemaId) || cinemaId <= 0) {
    notFound();
  }

  // Obtenemos los datos actuales del cine desde el servidor
  const cinema = await api.cinema.getById({ id: cinemaId });

  if (!cinema) {
    notFound();
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButtonCinemas />
        <EditCinemaForm cinema={cinema} />
      </Stack>
    </Container>
  );
}
