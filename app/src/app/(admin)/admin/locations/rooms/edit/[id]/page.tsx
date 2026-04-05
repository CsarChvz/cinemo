'use client';

import { Button, Container, Stack, Loader, Center } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { RoomForm, RoomFormValues } from '@/components/locations/RoomForm';

export default function EditRoomPage() {
  const params = useParams();
  const id = params.id as string;

  const [initialData, setInitialData] = useState<RoomFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de fetch a tu API para obtener los datos de la sala
    setTimeout(() => {
      setInitialData({
        id: id,
        name: 'Sala 01',
        roomType: 'Estándar',
        capacity: 150,
        cinemaId: '1', // Cinemo Andares
        isActive: true,
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSubmit = (values: RoomFormValues) => {
    console.log(`Enviando a la API para ACTUALIZAR sala ${id}:`, values);
    // Aquí harías tu fetch PUT /api/rooms/{id}
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

        {loading ? (
          <Center h={200}>
            <Loader color="teal" />
          </Center>
        ) : (
          <RoomForm
            initialValues={initialData!}
            onSubmit={handleSubmit}
            isEditing
          />
        )}
      </Stack>
    </Container>
  );
}
