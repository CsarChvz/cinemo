// components/cinemas/CinemaCard/CinemaCard.tsx
'use client';

import {
  Card,
  Text,
  Badge,
  Group,
  Button,
  Stack,
  Title,
  rem,
} from '@mantine/core';
import { IconMapPin, IconRoute, IconMovie } from '@tabler/icons-react';
import Link from 'next/link';

interface Cinema {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  distance: number;
}

interface CinemaCardProps {
  cinema: Cinema;
  isNearest?: boolean;
}

export function CinemaCard({ cinema, isNearest = false }: CinemaCardProps) {
  // Generamos el link de Google Maps para la navegación
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${cinema.latitude},${cinema.longitude}`;

  return (
    <Card
      withBorder
      shadow={isNearest ? 'md' : 'sm'}
      padding="lg"
      radius="md"
      style={(theme) => ({
        // Si es el más cercano, le damos un toque visual distintivo
        borderColor: isNearest ? theme.colors.blue[4] : undefined,
        borderWidth: isNearest ? rem(2) : undefined,
        transition: 'transform 200ms ease, shadow 200ms ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows.md,
        },
      })}
    >
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Stack gap={4}>
          <Group gap="xs">
            <Title order={4} style={{ lineHeight: 1.2 }}>
              {cinema.name}
            </Title>
            {isNearest && (
              <Badge color="blue" variant="filled" size="sm">
                El más cercano
              </Badge>
            )}
          </Group>

          <Group gap={4} c="dimmed">
            <IconMapPin size={16} stroke={1.5} />
            <Text fz="sm" fw={500}>
              A {cinema.distance.toFixed(1)} km de tu ubicación
            </Text>
          </Group>
        </Stack>

        <Group gap="xs" wrap="nowrap">
          {/* Acción secundaria: Abrir mapa externo */}
          <Button
            component="a"
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="light"
            color="gray"
            leftSection={<IconRoute size={18} />}
            visibleFrom="xs" // Se oculta el texto en móviles muy pequeños para ahorrar espacio
          >
            Ruta
          </Button>

          {/* Acción principal: Ir a la cartelera filtrada por este cine */}
          <Button
            component={Link}
            href={`/movie-screenings?cinemaId=${cinema.id}`}
            variant="filled"
            color="blue"
            leftSection={<IconMovie size={18} />}
          >
            Ver funciones
          </Button>
        </Group>
      </Group>

      {/* Versión móvil del botón "Ruta" si es necesario (opcional) */}
      <Button
        component="a"
        href={googleMapsUrl}
        target="_blank"
        variant="light"
        color="gray"
        mt="md"
        fullWidth
        hiddenFrom="xs"
        leftSection={<IconRoute size={18} />}
      >
        Cómo llegar
      </Button>
    </Card>
  );
}
