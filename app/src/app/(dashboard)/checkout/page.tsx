import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Container } from '@mantine/core';

import { auth } from '@/app/auth';
import { CheckoutView } from '@/components/booking/CheckoutView/CheckoutView';
import { api } from '@/trpc-folder/trpc-adaptadores/server';

interface CheckoutPageProps {
  searchParams: Promise<{
    functionId?: string;
    seatIds?: string;
    seatLabels?: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Checkout y Pago | Cinemo',
};

export default async function CheckoutPage({
  searchParams,
}: CheckoutPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin');
  }

  const params = await searchParams;
  const functionId = Number(params.functionId);
  const seatIds = params.seatIds ? params.seatIds.split(',').map(Number) : [];
  const seatLabels = params.seatLabels ? params.seatLabels.split(',') : [];

  if (isNaN(functionId) || seatIds.length === 0) {
    redirect('/');
  }

  let screening;
  try {
    screening = await api.movieScreening.getById({ id: functionId });
  } catch (error) {
    console.error('Error obteniendo detalles de la función:', error);
    redirect('/');
  }

  // Validación extra por si devuelve null o undefined
  if (!screening) {
    redirect('/');
  }

  return (
    <Container size="md" py="xl">
      <CheckoutView
        userId={Number(session.user.id)}
        functionId={functionId}
        seatStatusIds={seatIds}
        seatLabels={seatLabels}
        movieTitle={screening.movie.title}
        time={String(screening.movie.durationMin)}
        roomName={screening.room.name}
        basePrice={120} 
      />
    </Container>
  );
}
