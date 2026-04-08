// components/cinemas/NearbyCinemasMap/NearbyCinemasMap.tsx
'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Box, Text, Button, Badge, Stack, Group } from '@mantine/core';
import { IconMovie } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect } from 'react';


const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Ícono personalizado para "TÚ"
const UserIcon = L.divIcon({
  className: 'user-location-marker',
  html: '<div style="background-color: #228be6; width: 15px; height: 15px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

interface CinemaDistance {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  distance: number;
  municipalityId?: number;
  stateId?: number;
}

interface MapProps {
  userCoords: { lat: number; lng: number };
  cinemas: CinemaDistance[];
  selectedCinemaId: number | null;
}

// Componente interno para manejar el centrado del mapa
function MapController({
  coords,
  selectedCinema,
}: {
  coords: { lat: number; lng: number };
  selectedCinema: CinemaDistance | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedCinema) {
      // Si el usuario selecciona un cine en la lista, volamos a él
      map.flyTo([selectedCinema.latitude, selectedCinema.longitude], 15, {
        duration: 1.5,
      });
    } else {
      // Si no, nos centramos en el usuario
      map.setView([coords.lat, coords.lng], 13);
    }
  }, [coords, selectedCinema, map]);

  return null;
}

export default function NearbyCinemasMap({
  userCoords,
  cinemas,
  selectedCinemaId,
}: MapProps) {
  const selectedCinema = cinemas.find((c) => c.id === selectedCinemaId) || null;
  const center: [number, number] = [userCoords.lat, userCoords.lng];

  return (
    <Box
      style={{
        height: '100%',
        width: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false} 
      >
        {/* Usamos un estilo de mapa elegante y oscuro (CartoDB DarkMatter) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Marcador de "TÚ" */}
        <Marker position={center} icon={UserIcon}>
          <Popup>Tú estás aquí</Popup>
        </Marker>

        {/* Marcadores de Cines */}
        {cinemas.map((cinema) => (
          <Marker
            key={cinema.id}
            position={[cinema.latitude, cinema.longitude]}
            // Podrías usar un ícono personalizado de Cinemo aquí
          >
            <Popup minWidth={250}>
              <Stack gap={4}>
                <Group justify="space-between">
                  <Text fw={700} size="sm">
                    {cinema.name}
                  </Text>
                  <Badge size="xs">{cinema.distance.toFixed(1)} km</Badge>
                </Group>
                <Button
                  component={Link}
                  href={
                    cinema.stateId && cinema.municipalityId
                      ? `/movie-screenings?stateId=${cinema.stateId}&municipalityId=${cinema.municipalityId}&cinemaId=${cinema.id}`
                      : `/movie-screenings?cinemaId=${cinema.id}`
                  }
                  size="xs"
                  fullWidth
                  leftSection={<IconMovie size={14} />}
                  mt="xs"
                >
                  Ver Cartelera
                </Button>
              </Stack>
            </Popup>
          </Marker>
        ))}

        {/* Controlador para mover la cámara */}
        <MapController coords={userCoords} selectedCinema={selectedCinema} />
      </MapContainer>
    </Box>
  );
}
