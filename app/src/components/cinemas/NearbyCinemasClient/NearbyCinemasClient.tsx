// components/cinemas/NearbyCinemasClient/NearbyCinemasClient.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Button,
  Center,
  Stack,
  Text,
  Alert,
  Grid,
  Box,
  Title,
  Skeleton,
  rem,
} from '@mantine/core';
import {
  IconLocation,
  IconLockAccess,
  IconAlertCircle,
} from '@tabler/icons-react';
import { api } from '@/trpc-folder/trpc-adaptadores/react';
import { CinemaCard } from '../CinemaCard/CinemaCard';

const NearbyCinemasMap = dynamic(
  () => import('../NearbyCinemasMap/NearbyCinemasMap'),
  {
    ssr: false,
    loading: () => <Skeleton h="100%" radius="md" />,
  }
);

export function NearbyCinemasClient() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [status, setStatus] = useState<
    'idle' | 'requesting' | 'granted' | 'denied'
  >('idle');
  const [selectedCinemaId, setSelectedCinemaId] = useState<number | null>(null);

  const handleRequestLocation = () => {
    setStatus('requesting');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus('granted');
      },
      () => setStatus('denied'),
      { enableHighAccuracy: true }
    );
  };

  const { data: cinemas, isLoading } = api.cinema.getNearby.useQuery(
    { lat: coords?.lat!, lng: coords?.lng!, radius: 30 },
    { enabled: status === 'granted' && !!coords }
  );

  // Pantalla de bienvenida / Permisos
  if (status === 'idle' || status === 'requesting') {
    return (
      <Center
        py={80}
        style={{
          borderRadius: rem(16),
          border: '2px dashed var(--mantine-color-gray-3)',
        }}
      >
        <Stack align="center" gap="lg" px="md">
          <IconLocation size={60} color="var(--mantine-color-blue-filled)" />
          <Title order={2} ta="center">
            Encuentra tu Cinemo
          </Title>
          <Text ta="center" maw={480} c="dimmed">
            Necesitamos tu ubicación para mostrarte los complejos cercanos y sus
            funciones.
          </Text>
          <Button
            size="xl"
            onClick={handleRequestLocation}
            loading={status === 'requesting'}
            leftSection={<IconLocation size={22} />}
          >
            Usar mi ubicación actual
          </Button>
        </Stack>
      </Center>
    );
  }

  if (status === 'denied') {
    return (
      <Alert
        icon={<IconLockAccess size={16} />}
        title="Acceso denegado"
        color="red"
        variant="light"
      >
        Por favor, habilita los permisos de ubicación en tu navegador.
      </Alert>
    );
  }

  return (
    <Grid gap="xl">
      {/* Columna de LISTA: Ahora está primero en el código, pero en escritorio ocupará la izquierda */}
      <Grid.Col span={{ base: 12, md: 5 }} order={{ base: 2, md: 1 }}>
        <Stack gap="md">
          <Title order={3} px="xs">
            Complejos encontrados ({cinemas?.length || 0})
          </Title>

          {isLoading ? (
            Array(3)
              .fill(0)
              .map((_, i) => <Skeleton key={i} h={120} radius="md" />)
          ) : (
            <Stack gap="md">
              {cinemas?.map((cinema, index) => (
                <Box
                  key={cinema.id}
                  onClick={() => setSelectedCinemaId(cinema.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <CinemaCard cinema={cinema} isNearest={index === 0} />
                </Box>
              ))}

              {cinemas?.length === 0 && (
                <Alert
                  icon={<IconAlertCircle size={16} />}
                  title="Sin cines"
                  color="orange"
                >
                  No hay cines cerca en un radio de 30km.
                </Alert>
              )}
            </Stack>
          )}
        </Stack>
      </Grid.Col>

      {/* Columna de MAPA: A la derecha en desktop, arriba en mobile */}
      <Grid.Col
        span={{ base: 12, md: 7 }}
        order={{ base: 1, md: 2 }}
        style={{
          // En escritorio (md en adelante) el mapa se queda fijo
          // En móviles (base) el mapa fluye normalmente arriba
          height: 'min(500px, 80vh)',
          position: 'sticky',
          top: rem(80),
          zIndex: 10,
        }}
      >
        <Box
          style={{
            height: '100%',
            width: '100%',
            borderRadius: rem(16),
            overflow: 'hidden',
            boxShadow: 'var(--mantine-shadow-md)',
          }}
        >
          {coords && cinemas && (
            <NearbyCinemasMap
              userCoords={coords}
              cinemas={cinemas}
              selectedCinemaId={selectedCinemaId}
            />
          )}
        </Box>
      </Grid.Col>
    </Grid>
  );
}
