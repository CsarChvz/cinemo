import { Container, Stack } from '@mantine/core';
import { StateForm } from '@/components/locations/StateForm';
import { BackButtonStates } from './BackButtonStates';

export default function CreateStatePage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButtonStates />
        <StateForm />
      </Stack>
    </Container>
  );
}
