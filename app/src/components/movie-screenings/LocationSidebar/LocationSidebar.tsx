// components/movie-screenings/LocationSidebar.tsx
'use client';

import { api } from '@/trpc-folder/trpc-adaptadores/react';
import {
  NavLink,
  Stack,
  Text,
  Paper,
  ScrollArea,
  Select,
  Divider,
  Center,
  Loader,
} from '@mantine/core';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { IconBuildingCommunity } from '@tabler/icons-react';
import { useMemo } from 'react';

export function LocationSidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Leemos los IDs de la URL
  const currentStateId = searchParams.get('stateId') || '';
  const currentMuniId = searchParams.get('municipalityId') || '';
  const currentCinemaId = searchParams.get('cinemaId') || '';

  // 1. CARGA DE DATOS: Estados
  const { data: states, isLoading: isLoadingStates } =
    api.state.getAll.useQuery();
  const stateOptions = useMemo(
    () => states?.map((s) => ({ value: s.id.toString(), label: s.name })) || [],
    [states]
  );

  // 2. CASCADA: Municipios
  const stateIdNum = Number(currentStateId);
  const { data: municipalities, isFetching: isFetchingMunicipalities } =
    api.municipality.getByStateId.useQuery(
      { stateId: stateIdNum },
      { enabled: !!currentStateId && !isNaN(stateIdNum) }
    );
  const muniOptions = useMemo(
    () =>
      municipalities?.map((m) => ({ value: m.id.toString(), label: m.name })) ||
      [],
    [municipalities]
  );

  // 3. CASCADA: Cines
  const muniIdNum = Number(currentMuniId);
  const { data: cinemas, isFetching: isFetchingCinemas } =
    api.cinema.getByMunicipalityId.useQuery(
      { municipalityId: muniIdNum },
      { enabled: !!currentMuniId && !isNaN(muniIdNum) }
    );

  // Función para actualizar la URL sin recargar la página
  const updateUrl = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Cascada de limpieza
    if (key === 'stateId') {
      params.delete('municipalityId');
      params.delete('cinemaId');
    }
    if (key === 'municipalityId') {
      params.delete('cinemaId');
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };;

  return (
    <Paper withBorder p="xs" h="100%" radius="md" shadow="sm">
      <Stack gap="xs">
        <Text fw={800} size="xs" c="dimmed" px="sm" mt="xs">
          UBICACIÓN
        </Text>

        <Select
          clearable
          placeholder={isLoadingStates ? 'Cargando...' : 'Estado'}
          data={stateOptions}
          value={currentStateId}
          onChange={(val) => updateUrl('stateId', val)}
          disabled={isLoadingStates}
          size="sm"
          mx="sm"
        />

        <Select
          clearable
          placeholder={
            isFetchingMunicipalities
              ? 'Cargando...'
              : currentStateId
                ? 'Municipio'
                : 'Selecciona un estado'
          }
          data={muniOptions}
          value={currentMuniId}
          onChange={(val) => updateUrl('municipalityId', val)}
          disabled={!currentStateId || isFetchingMunicipalities}
          size="sm"
          mx="sm"
        />

        <Divider
          my="sm"
          variant="dashed"
          label="Cines Disponibles"
          labelPosition="center"
        />

        <ScrollArea h={350} offsetScrollbars px="xs">
          {isFetchingCinemas ? (
            <Center p="xl">
              <Loader size="sm" type="dots" />
            </Center>
          ) : cinemas && cinemas.length > 0 ? (
            <Stack gap={4}>
              {cinemas.map((cine) => (
                <NavLink
                  key={cine.id}
                  label={cine.name}
                  leftSection={<IconBuildingCommunity size={16} />}
                  active={currentCinemaId === cine.id.toString()}
                  onClick={() => updateUrl('cinemaId', cine.id.toString())}
                  variant="light"
                  color="blue"
                  style={{ borderRadius: 8 }}
                />
              ))}
            </Stack>
          ) : (
            <Text size="xs" c="dimmed" ta="center" py="md">
              {currentMuniId
                ? 'No hay cines en este municipio'
                : 'Selecciona un municipio para ver cines'}
            </Text>
          )}
        </ScrollArea>
      </Stack>
    </Paper>
  );
}
