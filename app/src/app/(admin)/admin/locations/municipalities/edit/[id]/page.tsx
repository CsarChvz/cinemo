import { Metadata } from 'next';
import { Container, Stack, Title, Text } from '@mantine/core';
import { notFound } from 'next/navigation';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { EditMunicipalityForm } from '@/components/locations/Municipality/EditMunicipalityForm';
import { BackButton } from '@/components/common/BackButton/BackButton';

interface EditMunicipalityPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EditMunicipalityPageProps): Promise<Metadata> {
  const { id } = await params;
  const municipalityId = Number(id);

  if (isNaN(municipalityId) || municipalityId <= 0) {
    return { title: 'Editar Municipio | Cinemo' };
  }

  try {
    const municipality = await api.municipality.getById({ id: municipalityId });

    if (!municipality) {
      return { title: 'Municipio no encontrado | Cinemo' };
    }

    return {
      title: `Editar: ${municipality.name} | Cinemo`,
      description: `Actualiza la información y el estado al que pertenece el municipio de ${municipality.name}.`,
    };
  } catch (error) {
    return { title: 'Editar Municipio | Cinemo' };
  }
}

export default async function EditMunicipalityPage({
  params,
}: EditMunicipalityPageProps) {
  const { id } = await params;

  const municipalityId = Number(id);
  if (isNaN(municipalityId) || municipalityId <= 0) {
    notFound();
  }

  // Obtenemos los datos del municipio desde el servidor
  const municipality = await api.municipality.getById({ id: municipalityId });

  if (!municipality) {
    notFound();
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <BackButton href="/admin/locations/municipalities" />
        <div>
          <Title order={2}>Editar Municipio</Title>
          <Text c="dimmed">
            Municipio:{' '}
            <Text span fw={700} c="blue">
              {municipality.name}
            </Text>{' '}
            (ID: #{municipality.id})
          </Text>
        </div>

        <EditMunicipalityForm municipality={municipality} />
      </Stack>
    </Container>
  );
}
