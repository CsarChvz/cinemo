'use client';

import { Button, Container, Stack, Loader, Center } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { StateForm, StateFormValues } from '@/components/locations/StateForm';

export default function EditStatePage() {
  const params = useParams();
  const id = params.id as string;

  const [initialData, setInitialData] = useState<StateFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de fetch a tu API
    setTimeout(() => {
      setInitialData({
        id: id,
        name: 'Jalisco',
        code: 'JAL',
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSubmit = (values: StateFormValues) => {
    console.log(`Enviando a la API para ACTUALIZAR estado ${id}:`, values);
    // Fetch PUT /api/states/{id}
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Button
          component={Link}
          href="/admin/locations/states"
          variant="subtle"
          color="gray"
          leftSection={<IconArrowLeft size={16} />}
          w="fit-content"
        >
          Volver a la lista
        </Button>

        {loading ? (
          <Center h={200}>
            <Loader color="indigo" />
          </Center>
        ) : (
          <StateForm
            initialValues={initialData!}
            onSubmit={handleSubmit}
            isEditing
          />
        )}
      </Stack>
    </Container>
  );
}
