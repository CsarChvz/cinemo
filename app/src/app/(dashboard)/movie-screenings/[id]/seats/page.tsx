import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Title, Text } from '@mantine/core';

import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { SeatSelectionView } from '@/components/booking/SelectionView/SelectionView';
import { auth } from '@/app/auth';

interface SeatsPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    roomId?: string;
  }>;
}

// 🔥 1. Metadatos dinámicos para SEO
export async function generateMetadata({
  params,
}: SeatsPageProps): Promise<Metadata> {
  const { id } = await params;
  const screeningId = Number(id);

  if (isNaN(screeningId) || screeningId <= 0) {
    return { title: 'Selección de Asientos | Cinemo' };
  }

  try {
    const screening = await api.movieScreening.getById({ id: screeningId });

    if (!screening) {
      return { title: 'Función no encontrada | Cinemo' };
    }

    return {
      title: `Selección de Asientos - ${screening.movie.title} | Cinemo`,
      description: `Elige tus lugares para ver ${screening.movie.title} en la sala ${screening.room.name}`,
    };
  } catch (error) {
    return { title: 'Selección de Asientos | Cinemo' };
  }
}

export default async function SeatsPage({
  params,
  searchParams,
}: SeatsPageProps) {
  const { id } = await params;
  const { roomId: roomIdQuery } = await searchParams;

  const movieScreeningId = Number(id);
  const roomId = Number(roomIdQuery || 2); // Fallback a 2 si no viene

  // Validación inicial
  if (isNaN(movieScreeningId) || movieScreeningId <= 0) {
    notFound();
  }

  const session = await auth();

  return (
    <Container size="lg" py="xl">
      <SeatSelectionView
        roomId={roomId}
        movieScreeningId={movieScreeningId}
        userId={session?.user.id ? Number(session.user.id) : 0}
      />
    </Container>
  );
}
