import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Button,
  ActionIcon,
  AspectRatio,
} from '@mantine/core';
import { IconHeart, IconClock } from '@tabler/icons-react';
import classes from './MovieCard.module.css';
import Link from 'next/link';
import { Movie } from '@/schemas/movie';

export interface MovieCardProps {
  movie: Movie;
  onViewDetails?: (id: number) => void;
}

export function MovieCard({ movie, onViewDetails }: MovieCardProps) {
  const hours = Math.floor(movie.durationMin / 60);
  const minutes = movie.durationMin % 60;
  const durationFormatted = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <Card
      withBorder
      radius="md"
      p="md"
      className={classes.card}
      shadow="sm"
      // 🔥 1. Le decimos a la tarjeta que tome el 100% del alto y use Flexbox
      h="100%"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <Card.Section>
        <AspectRatio ratio={4 / 4}>
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fallbackSrc="https://placehold.co/400x600?text=Sin+Poster"
          />
        </AspectRatio>
      </Card.Section>

      {/* 🔥 3. flexGrow: 1 hace que esta sección central se estire y llene el espacio vacío */}
      <Card.Section
        className={classes.section}
        mt="md"
        p="md"
        style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Group justify="space-between" align="start" wrap="nowrap">
          <Text fz="lg" fw={700} lineClamp={2} style={{ flex: 1 }}>
            {movie.title}
          </Text>
          <Badge size="sm" variant="filled" color="blue">
            {movie.classification}
          </Badge>
        </Group>

        <Group gap={10} mt={8}>
          <Text fz="xs" c="dimmed" fw={600}>
            {movie.genre}
          </Text>
          <Text fz="xs" c="dimmed">
            •
          </Text>
          <Group gap={4}>
            <IconClock size={14} stroke={1.5} color="gray" />
            <Text fz="xs" c="dimmed">
              {durationFormatted}
            </Text>
          </Group>
        </Group>

        <Text fz="sm" mt="sm" lineClamp={3} c="dimmed">
          {movie.description}
        </Text>
      </Card.Section>

      {/* 🔥 4. mt="auto" empuja este grupo de botones al fondo de la tarjeta siempre */}
      <Group mt="auto" pt="md">
        <Button
          radius="md"
          component={Link}
          href={`/movies/${movie.id}`}
          style={{ flex: 1 }}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
          onClick={() => onViewDetails?.(movie.id!)}
        >
          Ver detalles
        </Button>
        <ActionIcon
          variant="default"
          radius="md"
          size={36}
          aria-label="Agregar a favoritos"
        >
          <IconHeart className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
