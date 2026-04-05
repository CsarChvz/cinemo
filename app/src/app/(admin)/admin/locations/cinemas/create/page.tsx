'use client';

import { Button, Container, Stack } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import {
  CinemaForm,
  CinemaFormValues,
} from '@/components/locations/CinemaForm';

export default function CreateCinemaPage() {
  const handleSubmit = (values: CinemaFormValues) => {
    console.log('Enviando a la API para CREAR cine:', values);
    // Fetch POST /api/cinemas
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

        <CinemaForm onSubmit={handleSubmit} />
      </Stack>
    </Container>
  );
}
