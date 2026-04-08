import { Container, Stack } from '@mantine/core';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { RoomForm } from '@/components/locations/Room/RoomForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registrar Nueva Sala | Cinemo',
  description:
    'Configura una nueva sala, definiendo su capacidad y especificaciones técnicas.',
};

export default function CreateRoomPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButton href="/admin/locations/rooms" />
        <RoomForm />
      </Stack>
    </Container>
  );
}
