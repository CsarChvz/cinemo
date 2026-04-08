import { Container, Stack } from '@mantine/core';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { CinemaForm } from '@/components/locations/Cinema/CinemaForm';

export default function CreateCinemaPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButton href="/admin/locations/cinemas" />
        <CinemaForm />
      </Stack>
    </Container>
  );
}
