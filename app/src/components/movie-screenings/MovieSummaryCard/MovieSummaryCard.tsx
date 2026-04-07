import { Movie } from '@/schemas/movie';
import {
  Paper,
  Group,
  ThemeIcon,
  Stack,
  Text,
  Badge,
  Button,
} from '@mantine/core';
import { IconMovie } from '@tabler/icons-react';

interface MovieSummaryCardProps {
  movie: Movie;
  onViewFullDetails?: () => void;
}

export function MovieSummaryCard({
  movie,
  onViewFullDetails,
}: MovieSummaryCardProps) {
  return (
    <Paper withBorder p="lg" radius="md" shadow="sm">
      <Group align="center" gap="lg">
        {/* Icono representativo con degradado */}
        <ThemeIcon
          size={50}
          radius="md"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
        >
          <IconMovie size={30} />
        </ThemeIcon>

        <Stack gap={2}>
          <Text fw={700} size="lg">
            Detalles de la Cinta
          </Text>

          <Group gap="xs">
            <Text size="sm" c="dimmed">
              {movie.genre}
            </Text>
            <Text size="sm" c="dimmed">
              •
            </Text>
            <Text size="sm" c="dimmed">
              {movie.durationMin}
            </Text>
            <Text size="sm" c="dimmed">
              •
            </Text>
            <Badge size="xs" variant="outline" color="blue">
              {movie.classification}
            </Badge>
            {movie.releaseYear > 0 && (
              <>
                <Text size="sm" c="dimmed">
                  •
                </Text>
                <Text size="sm" c="dimmed">
                  {movie.releaseYear}
                </Text>
              </>
            )}
          </Group>
        </Stack>

        {/* Botón de acción opcional */}
        {onViewFullDetails && (
          <Button
            variant="subtle"
            ml="auto"
            size="sm"
            onClick={onViewFullDetails}
          >
            Ver ficha completa
          </Button>
        )}
      </Group>
    </Paper>
  );
}
