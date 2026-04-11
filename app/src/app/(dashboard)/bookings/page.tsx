import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Container, Title } from '@mantine/core';

import { auth } from '@/app/auth';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { BookingsView } from '@/components/booking/BookingsView/BookingsView';

export const metadata: Metadata = {
  title: 'Mis Reservas | Cinemo',
};

export default async function MyBookingsPage() {
  // 1. Validamos la sesión en el servidor
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/api/auth/signin');
  }

  const userId = Number(session.user.id);

  let bookings: any = [];
  try {
    bookings = await api.booking.getMyBookings({ userId });
  } catch (error) {
    console.error('Error obteniendo las reservas:', error);
  }

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="xl">
        Mis Reservas
      </Title>

      <BookingsView initialBookings={bookings} />
    </Container>
  );
}
