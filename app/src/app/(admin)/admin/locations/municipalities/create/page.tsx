import { Container, Stack } from '@mantine/core';
import { BackButton } from '@/components/common/BackButton/BackButton';
import { MunicipalityForm } from '@/components/locations/Municipality/MunicipalityForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registrar Nuevo Municipio | Cinemo',
  description:
    'Añade un nuevo municipio al catálogo del sistema y asígnalo a un estado correspondiente.',
};

export default function CreateMunicipalityPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButton href="/admin/locations/municipalities" />
        <MunicipalityForm />
      </Stack>
    </Container>
  );
}
