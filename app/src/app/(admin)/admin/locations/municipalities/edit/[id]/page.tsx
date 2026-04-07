// app/admin/locations/municipalities/edit/[id]/page.tsx
import { Container, Stack } from '@mantine/core';
import { notFound } from 'next/navigation';
import { api } from '@/trpc/server';
import { BackButtonMunicipalities } from '../../create/BackButtonMunicipalities';
import { EditMunicipalityForm } from '@/components/locations/EditMunicipalityForm';

interface EditMunicipalityPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMunicipalityPage({
  params,
}: EditMunicipalityPageProps) {
  const { id } = await params;

  const municipalityId = Number(id);
  // Validamos que sea un ID válido
  if (isNaN(municipalityId) || municipalityId <= 0) {
    notFound();
  }

  // Obtenemos los datos del municipio desde el servidor
  const municipality = await api.municipality.getById({ id: municipalityId });

  // Si no existe, tRPC probablemente lance un error, pero si devuelve null:
  if (!municipality) {
    notFound();
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButtonMunicipalities />
        <EditMunicipalityForm municipality={municipality} />
      </Stack>
    </Container>
  );
}
