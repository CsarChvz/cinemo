// app/movie-screenings/page.tsx
import { Metadata } from 'next';
import { Container, Grid, GridCol, Title, Text, Box } from '@mantine/core';
import { ProgramGuideContent } from '@/components/movie-screenings/ProgramGuideContent/ProgramGuideContent';
import { LocationSidebar } from '@/components/movie-screenings/LocationSidebar/LocationSidebar';
import { api } from '@/trpc-folder/trpc-adaptadores/server';
import { redirect } from 'next/navigation';

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
  const defaultMetadata: Metadata = {
    title: 'Cartelera y Horarios | Cinemo',
    description: 'Encuentra las funciones y horarios en tu cine más cercano.',
  };

  if (!cinemaId || isNaN(Number(cinemaId))) return defaultMetadata;

  try {
    const cinema = await api.cinema.getById({ id: Number(cinemaId) });
    return cinema
      ? {
          title: `Cartelera en ${cinema.name} | Cinemo`,
          description: `Horarios para ${cinema.name}.`,
        }
      : defaultMetadata;
  } catch {
    return defaultMetadata;
  }
}

export default async function MovieScreeningsPage({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  const { stateId, municipalityId, cinemaId } = await searchParams;

  // 🔥 LÓGICA DE AUTO-COMPLETADO (Cascada Inversa)
  // Si venimos de "Cines Cercanos", solo tendremos cinemaId.
  // Buscamos los datos para que el Sidebar se autoseleccione.
  if (cinemaId && (!stateId || !municipalityId)) {
    const cinema = await api.cinema.getById({ id: Number(cinemaId) });
    if (cinema) {
      // Redirigimos a la misma página pero con la URL completa
      // Esto hace que el Sidebar 'despierte' con todos los selects llenos
      redirect(
        `/movie-screenings?stateId=${cinema.municipality.state.id}&municipalityId=${cinema.municipality.id}&cinemaId=${cinema.id}`
      );
    }
  }

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
