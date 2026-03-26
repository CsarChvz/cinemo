// 1. Importa GridCol por separado (Ya no es Grid.Col)
import { Container, Grid, GridCol, Title, Text, Box } from '@mantine/core';
import { LocationSidebar } from '@/components/movie-screenings/LocationSidebar';
import { ProgramGuideContent } from '@/components/movie-screenings/ProgramGuideContent';

export default async function CarteleraPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string; municipio?: string; cine?: string }>;
}) {
  const { estado, municipio, cine } = await searchParams;

  return (
    <Container size="xl" py="xl">
      <Grid gap="xl">
        <GridCol span={{ base: 12, md: 3 }}>
          <LocationSidebar />
        </GridCol>

        <GridCol span={{ base: 12, md: 9 }}>
          {cine ? (
            <ProgramGuideContent cine={cine} />
          ) : (
            <Box
              ta="center"
              py={100}
              style={{ border: '2px dashed #ddd', borderRadius: 16 }}
            >
              <Text c="dimmed">
                Selecciona un complejo cinematográfico para ver el horario
                visual.
              </Text>
            </Box>
          )}
        </GridCol>
      </Grid>
    </Container>
  );
}
