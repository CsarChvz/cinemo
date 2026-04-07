// app/cartelera/page.tsx
import { Container, Grid, GridCol, Title, Text, Box } from '@mantine/core';
import { LocationSidebar } from '@/components/movie-screenings/LocationSidebar';
import { ProgramGuideContent } from '@/components/movie-screenings/ProgramGuideContent';

export default async function MovieScreeningsPage({
  searchParams,
}: {
  // Ahora esperamos IDs para hacer las consultas a la BD
  searchParams: Promise<{
    stateId?: string;
    municipalityId?: string;
    cinemaId?: string;
  }>;
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
