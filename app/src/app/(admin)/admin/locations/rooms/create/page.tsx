'use client';

import { Button, Container, Stack } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { RoomForm, RoomFormValues } from '@/components/locations/RoomForm';

export default function CreateRoomPage() {
  const handleSubmit = (values: RoomFormValues) => {
    console.log('Enviando a la API para CREAR sala:', values);
    // Aquí harías tu fetch POST /api/rooms
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Button
          component={Link}
          href="/admin/locations/rooms"
          variant="subtle"
          color="gray"
          leftSection={<IconArrowLeft size={16} />}
          w="fit-content"
        >
          Volver a la lista
        </Button>

        <RoomForm onSubmit={handleSubmit} />
      </Stack>
    </Container>
  );
}
