'use client';

import { useState } from 'react';
import { Button, Center, Stack, Text, Alert, Group } from '@mantine/core';
import {
  IconLocation,
  IconLockAccess,
  IconAlertCircle,
} from '@tabler/icons-react';
import { api } from '@/trpc-folder/trpc-adaptadores/react';
import { CinemaCard } from '../CinemaCard/CinemaCard';

export function NearbyCinemasClient() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [status, setStatus] = useState<
    'idle' | 'requesting' | 'granted' | 'denied'
  >('idle');

  const handleRequestLocation = () => {
    setStatus('requesting');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus('granted');
      },
      (error) => {
        console.error(error);
        setStatus('denied');
      },
      { enableHighAccuracy: true }
    );
  };

  // Llamada a tRPC (API de Java)
  const { data: cinemas, isLoading } = api.cinema.getNearby.useQuery(
    { lat: coords?.lat!, lng: coords?.lng!, radius: 50 },
    { enabled: status === 'granted' && !!coords }
  );

  // 1. Estado Inicial: Botón para pedir permiso
  if (status === 'idle' || status === 'requesting') {
    return (
      <Center py={50}>
        <Stack align="center" gap="md">
          <IconLocation size={50} color="var(--mantine-color-blue-filled)" />
          <Text ta="center" maw={400}>
            Para mostrarte los cines más cercanos, necesitamos acceso a tu
            ubicación actual.
          </Text>
          <Button
            size="lg"
            onClick={handleRequestLocation}
            loading={status === 'requesting'}
            leftSection={<IconLocation size={20} />}
          >
            Usar mi ubicación actual
          </Button>
        </Stack>
      </Center>
    );
  }

  // 2. Estado: Permiso Denegado
  if (status === 'denied') {
    return (
      <Alert
        icon={<IconLockAccess size={16} />}
        title="Acceso denegado"
        color="red"
        variant="light"
      >
        No pudimos obtener tu ubicación. Por favor, habilita los permisos de
        localización en tu navegador o busca por ciudad manualmente.
      </Alert>
    );
  }

  // 3. Estado: Cargando Datos de la API
  if (isLoading) {
    return <Text>Buscando los mejores cines para ti...</Text>;
  }

  // 4. Estado Final: Lista de resultados
  return (
    <Stack gap="md">
      {cinemas && cinemas.length > 0 ? (
        cinemas.map((cinema, index) => (
          <CinemaCard key={cinema.id} cinema={cinema} isNearest={index === 0} />
        ))
      ) : (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Sin cines cerca"
          color="orange"
        >
          No encontramos cines en un radio de 30km. Intenta ampliar tu búsqueda.
        </Alert>
      )}
    </Stack>
  );
}
