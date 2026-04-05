import { Box, Stack, Badge, Title, rem, Paper, Grid, GridCol, Center, Text } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import { LocationSidebar } from "../LocationSidebar";
import { ProgramGuideContent } from "../ProgramGuideContent";
import { Movie } from '@/schemas/movie';

interface MovieScreeningProps{
    movie: Movie
    cinema?: string
}

export default function MovieScreening({
    movie, cinema
}: MovieScreeningProps){
    return (
      <Box mt={80}>
        <Stack gap="xs" mb="xl" align="center">
          <Badge color="blue" variant="filled" size="lg" radius="sm">
            HORARIOS DISPONIBLES
          </Badge>
          <Title order={2} fz={rem(32)}>
            Funciones de esta película
          </Title>
          <Text c="dimmed">
            Selecciona una ubicación para consultar salas y horarios de
            proyección
          </Text>
        </Stack>

        <Paper withBorder p="xl" radius="lg" shadow="xs" bg="gray.0">
          <Grid gap="xl">
            {/* Filtros de Ubicación */}
            <GridCol span={{ base: 12, md: 3 }}>
              <LocationSidebar />
            </GridCol>

            {/* Resultado de Horarios */}
            <GridCol span={{ base: 12, md: 9 }}>
              {cinema ? (
                <ProgramGuideContent cine={cinema} />
              ) : (
                <Center
                  p={60}
                  style={{
                    border: '2px dashed #cbd5e1',
                    borderRadius: 12,
                    height: '100%',
                  }}
                >
                  <Stack align="center" gap="sm">
                    <IconMapPin size={48} color="#94a3b8" stroke={1.5} />
                    <Text c="dimmed" fw={500} ta="center">
                      Por favor, selecciona un estado, municipio y complejo{' '}
                      <br />
                      en el panel izquierdo para ver las funciones de{' '}
                      <b>{movie.title}</b>.
                    </Text>
                  </Stack>
                </Center>
              )}
            </GridCol>
          </Grid>
        </Paper>
      </Box>
    );
}