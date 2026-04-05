import { Movie } from '@/schemas/movie';
import {
  Grid,
  GridCol,
  Paper,
  Stack,
  Group,
  Title,
  rem,
  Badge,
  ActionIcon,
  SimpleGrid,
  Divider,
  Text,
  Image,
} from '@mantine/core';
import {
  IconHeart,
  IconClock,
  IconMovie,
  IconCalendar,
} from '@tabler/icons-react';

interface DetailsOfMovieProps {
  movie: Movie;
}

export function DetailsOfMovie({ movie }: DetailsOfMovieProps) {
  return (
    <Grid gap={50} mb={60}>
      <GridCol span={{ base: 12, md: 4 }}>
        <Paper shadow="xl" radius="lg" style={{ overflow: 'hidden' }}>
          <Image src={movie.posterUrl} alt={movie.title} />
        </Paper>
      </GridCol>

      <GridCol span={{ base: 12, md: 8 }}>
        <Stack gap="lg">
          <header>
            <Group justify="space-between" align="flex-start">
              <Stack gap={4}>
                <Title order={1} fz={rem(42)} fw={900} lh={1.1}>
                  {movie.title}
                </Title>
                <Group gap="xs">
                  <Text c="dimmed" fz="lg" fw={500}>
                    {movie.releaseYear}
                  </Text>
                  <Text c="dimmed">•</Text>
                  <Badge size="lg" variant="dot">
                    {movie.classification}
                  </Badge>
                </Group>
              </Stack>
              <ActionIcon variant="outline" color="red" size="xl" radius="md">
                <IconHeart size={24} />
              </ActionIcon>
            </Group>
          </header>

          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <Group gap="sm">
              <IconClock size={20} color="blue.6" />
              <div>
                <Text size="xs" c="dimmed" fw={700}>
                  DURACIÓN
                </Text>
                <Text fw={600}>{movie.durationMin}</Text>
              </div>
            </Group>
            <Group gap="sm">
              <IconMovie size={20} color="blue.6" />
              <div>
                <Text size="xs" c="dimmed" fw={700}>
                  GÉNERO
                </Text>
                <Text fw={600}>{movie.genre}</Text>
              </div>
            </Group>
            <Group gap="sm">
              <IconCalendar size={20} color="blue.6" />
              <div>
                <Text size="xs" c="dimmed" fw={700}>
                  ESTRENO
                </Text>
                <Text fw={600}>{movie.releaseYear}</Text>
              </div>
            </Group>
          </SimpleGrid>

          <Divider />
          <Text size="lg" lh={1.6} c="gray.7">
            {movie.description}
          </Text>

          <SimpleGrid cols={2}>
            <Stack gap={0}>
              <Text size="xs" c="dimmed" fw={700}>
                DIRECTOR
              </Text>
              <Text fw={600}>{movie.director}</Text>
            </Stack>
            <Stack gap={0}>
              <Text size="xs" c="dimmed" fw={700}>
                PRODUCTOR
              </Text>
              <Text fw={600}>{movie.producer}</Text>
            </Stack>
          </SimpleGrid>
        </Stack>
      </GridCol>
    </Grid>
  );
}
