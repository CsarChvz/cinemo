import { Container, Stack } from '@mantine/core';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { MunicipalityForm } from '@/components/locations/Municipality/MunicipalityForm';

export default function CreateMunicipalityPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButton href="/dashboard/users" />
        <MunicipalityForm />
      </Stack>
    </Container>
  );
}
