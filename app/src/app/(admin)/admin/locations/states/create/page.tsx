'use client';

import { Button, Container, Stack } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { StateForm, StateFormValues } from '@/components/locations/StateForm';

export default function CreateStatePage() {
  const handleSubmit = (values: StateFormValues) => {
    console.log('Enviando a la API para CREAR estado:', values);
    // Fetch POST /api/states
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

        <StateForm onSubmit={handleSubmit} />
      </Stack>
    </Container>
  );
}
