import { Metadata } from 'next';
import { Container, Grid, GridCol, Title, Text, Box } from '@mantine/core';
import { ProgramGuideContent } from '@/components/movie-screenings/ProgramGuideContent/ProgramGuideContent';
import { LocationSidebar } from '@/components/movie-screenings/LocationSidebar/LocationSidebar';
import { api } from '@/trpc-folder/trpc-adaptadores/server';

type SearchParamsProps = Promise<{
  stateId?: string;
  municipalityId?: string;
  cinemaId?: string;
}>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}): Promise<Metadata> {
  const { cinemaId } = await searchParams;

  // Metadatos por defecto (Cuando entran a la página sin seleccionar nada)
  const defaultMetadata: Metadata = {
    title: 'Cartelera y Horarios | Cinemo',
    description:
      'Encuentra las funciones, horarios y compra boletos para tus películas favoritas en tu cine más cercano.',
  };

  if (!cinemaId || isNaN(Number(cinemaId))) {
    return defaultMetadata;
  }

  try {
    const cinema = await api.cinema.getById({ id: Number(cinemaId) });

    if (cinema) {
      return {
        title: `Cartelera en ${cinema.name} | Cinemo`,
        description: `Consulta los horarios, estrenos y compra tus boletos para ${cinema.name}.`,
      };
    }
    return defaultMetadata;
  } catch (error) {
    return defaultMetadata;
  }
}

export default async function MovieScreeningsPage({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  const { stateId, municipalityId, cinemaId } = await searchParams;

  return (
    <Container size="xl" py="xl">
      <Grid gap="xl">
        <GridCol span={{ base: 12, md: 3 }}>
          <LocationSidebar />
        </GridCol>

        <GridCol span={{ base: 12, md: 9 }}>
          {cinemaId ? (
            <ProgramGuideContent cinemaId={Number(cinemaId)} />
          ) : (
            <Box
              ta="center"
              py={100}
              style={{ border: '2px dashed #ddd', borderRadius: 16 }}
            >
              <Text c="dimmed">
                Selecciona un complejo cinematográfico en el menú lateral para
                ver el horario.
              </Text>
            </Box>
          )}
        </GridCol>
      </Grid>
    </Container>
  );
}
