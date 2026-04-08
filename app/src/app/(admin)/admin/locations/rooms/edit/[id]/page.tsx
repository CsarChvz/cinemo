import { Metadata } from 'next'; // 🔥 1. Importamos Metadata
import { Container, Stack, Title, Text } from '@mantine/core';
import { notFound } from 'next/navigation';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { EditRoomForm } from '@/components/locations/Room/EditRoomForm';

interface EditRoomPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EditRoomPageProps): Promise<Metadata> {
  const { id } = await params;
  const roomId = Number(id);

  if (isNaN(roomId) || roomId <= 0) {
    return { title: 'Editar Sala | Cinemo' };
  }

  try {
    const room = await api.room.getById({ id: roomId });

    if (!room) {
      return { title: 'Sala no encontrada | Cinemo' };
    }

    return {
      title: `Editar Sala: ${room.name} | Cinemo`,
      description: `Configura el aforo y detalles técnicos de la sala ${room.name}.`,
    };
  } catch (error) {
    return { title: 'Editar Sala | Cinemo' };
  }
}

export default async function EditRoomPage({ params }: EditRoomPageProps) {
  const { id } = await params;
  const roomId = Number(id);

  if (isNaN(roomId) || roomId <= 0) {
    notFound();
  }

  const room = await api.room.getById({ id: roomId });

  if (!room) {
    notFound();
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButton href="/admin/locations/rooms" />

        <div>
          <Title order={2}>Editar Sala</Title>
          <Text c="dimmed">
            Sala:{' '}
            <Text span fw={700} c="blue">
              {room.name}
            </Text>{' '}
            (ID: #{room.id})
          </Text>
        </div>

        <EditRoomForm room={room} />
      </Stack>
    </Container>
  );
}
