import { Container, Stack } from '@mantine/core';
import { notFound } from 'next/navigation';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { BackButtonRooms } from '@/components/locations/BackButtonRooms';
import { EditRoomForm } from '@/components/locations/EditRoomForm';

interface EditRoomPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRoomPage({ params }: EditRoomPageProps) {
  const { id } = await params;
  const roomId = Number(id);

  if (isNaN(roomId) || roomId <= 0) {
    notFound();
  }

  // Obtenemos los datos actuales de la sala
  const room = await api.room.getById({ id: roomId });

  if (!room) {
    notFound();
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButtonRooms />
        <EditRoomForm room={room} />
      </Stack>
    </Container>
  );
}
