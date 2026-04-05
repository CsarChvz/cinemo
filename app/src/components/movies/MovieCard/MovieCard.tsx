import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Button,
  ActionIcon,
} from '@mantine/core';
import { IconHeart, IconClock } from '@tabler/icons-react';
import classes from './MovieCard.module.css';
import Link from 'next/link';
import { Movie } from '@/schemas/movie';

export interface MovieCardProps extends Movie {
  onViewDetails?: () => void;
}
export function MovieCard({
  id,
  title,
  posterUrl,
  genre,
  durationMin,
  description, // Se agregó coma
  classification,
  onViewDetails,
}: MovieCardProps) {
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image
          src={posterUrl}
          alt={title}
          height={220}
          fallbackSrc="https://placehold.co/600x400?text=No+Poster"
        />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="space-between">
          <Text fz="lg" fw={700} lineClamp={1} style={{ flex: 1 }}>
            {title}
          </Text>
          <Badge size="sm" variant="filled" color="blue">
            {classification}
          </Badge>
        </Group>

        <Group gap={10} mt={5}>
          <Text fz="xs" c="dimmed" fw={500}>
            {genre}
          </Text>
          <Text fz="xs" c="dimmed">
            •
          </Text>
          <Group gap={4}>
            <IconClock size={14} stroke={1.5} />
            <Text fz="xs" c="dimmed">
              {durationMin}
            </Text>
          </Group>
        </Group>

        <Text fz="sm" mt="sm" lineClamp={3}>
          {description}
        </Text>
      </Card.Section>

      <Group mt="md">
        <Button
          radius="md"
          component={Link}
          href={'/movies/' + id}
          style={{ flex: 1 }}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
          onClick={onViewDetails} // Se conectó la función al evento click
        >
          Ver detalles
        </Button>
        <ActionIcon
          variant="default"
          radius="md"
          size={36}
          aria-label="Add to favorites"
        >
          <IconHeart className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
