'use client';

import { MovieScreeningForm } from '@/components/movie-screenings/MovieScreeningForm/MovieScreeningForm';
import { Button, Container, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

export default function NuevaFuncionPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Button
          component={Link}
          href="/admin/funciones"
          variant="subtle"
          color="gray"
          leftSection={<IconArrowLeft size={16} />}
          w="fit-content"
        >
          Volver a lista
        </Button>

        <MovieScreeningForm onSubmit={() => console.log('')} />
      </Stack>
    </Container>
  );
}
