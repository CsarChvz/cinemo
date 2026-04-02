'use client';

import { Button, Container, Stack, Loader, Center } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  CinemaForm,
  CinemaFormValues,
} from '@/components/locations/CinemaForm';

export default function EditCinemaPage() {
  const params = useParams();
  const id = params.id as string;

  const [initialData, setInitialData] = useState<CinemaFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de fetch a tu API para obtener el cine a editar
    setTimeout(() => {
      setInitialData({
        id: id,
        name: 'Cinemo Andares',
        address: 'Blvd. Puerta de Hierro 4965',
        stateId: '1', // Jalisco
        municipalityId: '101', // Zapopan
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSubmit = (values: CinemaFormValues) => {
    console.log(`Enviando a la API para ACTUALIZAR cine ${id}:`, values);
    // Fetch PUT /api/cinemas/{id}
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Button
          component={Link}
          href="/admin/locations/cinemas"
          variant="subtle"
          color="gray"
          leftSection={<IconArrowLeft size={16} />}
          w="fit-content"
        >
          Volver a la lista
        </Button>

        {loading ? (
          <Center h={200}>
            <Loader color="violet" />
          </Center>
        ) : (
          <CinemaForm
            initialValues={initialData!}
            onSubmit={handleSubmit}
            isEditing
          />
        )}
      </Stack>
    </Container>
  );
}
