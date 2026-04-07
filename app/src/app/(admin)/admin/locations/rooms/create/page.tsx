// app/admin/locations/rooms/create/page.tsx
import { Container, Stack } from '@mantine/core';
import { RoomForm } from '@/components/locations/RoomForm';
import { BackButtonRooms } from '@/components/locations/BackButtonRooms';

export default function CreateRoomPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButtonRooms />
        <RoomForm />
      </Stack>
    </Container>
  );
}
