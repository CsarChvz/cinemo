// app/admin/locations/cinemas/create/page.tsx
import { Container, Stack } from '@mantine/core';
import { CinemaForm } from '@/components/locations/CinemaForm';
import { BackButtonCinemas } from '@/components/locations/BackButtonCinemas';

export default function CreateCinemaPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButtonCinemas />
        <CinemaForm />
      </Stack>
    </Container>
  );
}
