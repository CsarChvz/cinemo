// app/admin/locations/municipalities/create/page.tsx
import { Container, Stack } from '@mantine/core';
import { MunicipalityForm } from '@/components/locations/MunicipalityForm';
import { BackButtonMunicipalities } from './BackButtonMunicipalities';

export default function CreateMunicipalityPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButtonMunicipalities />
        <MunicipalityForm />
      </Stack>
    </Container>
  );
}
