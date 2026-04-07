import { Container, Stack } from '@mantine/core';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { StateForm } from '@/components/locations/State/StateForm';

export default function CreateStatePage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButton href="/dashboard/users" />
        <StateForm />
      </Stack>
    </Container>
  );
}
