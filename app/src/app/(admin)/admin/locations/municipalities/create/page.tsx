'use client';

import { Button, Container, Stack } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import {
  MunicipalityForm,
  MunicipalityFormValues,
} from '@/components/locations/MunicipalityForm';

export default function CreateMunicipalityPage() {
  const handleSubmit = (values: MunicipalityFormValues) => {
    console.log('Enviando a la API para CREAR:', values);
    // Aquí harías tu fetch POST /api/municipalities
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Button
          component={Link}
          href="/admin/locations/municipalities"
          variant="subtle"
          color="gray"
          leftSection={<IconArrowLeft size={16} />}
          w="fit-content"
        >
          Volver a la lista
        </Button>

        <MunicipalityForm onSubmit={handleSubmit} />
      </Stack>
    </Container>
  );
}
