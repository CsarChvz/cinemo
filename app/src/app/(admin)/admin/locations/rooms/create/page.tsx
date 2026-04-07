import { Container, Stack } from '@mantine/core';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { RoomForm } from '@/components/locations/Room/RoomForm';

export default function CreateRoomPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButton href="/dashboard/users" />
        <RoomForm />
      </Stack>
    </Container>
  );
}
