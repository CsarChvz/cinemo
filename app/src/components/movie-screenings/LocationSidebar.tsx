'use client';
import {
  NavLink,
  Stack,
  Text,
  Paper,
  ScrollArea,
  Select,
  Divider,
} from '@mantine/core';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  IconMapPin,
  IconMap2,
  IconBuildingCommunity,
} from '@tabler/icons-react';


// @TODO: Get Cinemas around the Country with the database
// Mock de cines por municipio
const CINES_POR_MUNI: Record<string, string[]> = {
  zapopan: ['Cinemo Plaza Patria', 'Cinemo Andares', 'Cinemo Gran Plaza'],
  guadalajara: ['Cinemo Centro', 'Cinemo Magno'],
};

export function LocationSidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentEstado = searchParams.get('estado') || '';
  const currentMuni = searchParams.get('municipio') || '';
  const currentCine = searchParams.get('cine') || '';

  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toLowerCase());

    // Resetear niveles inferiores
    if (key === 'estado') {
      params.delete('municipio');
      params.delete('cine');
    }
    if (key === 'municipio') {
      params.delete('cine');
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Paper withBorder p="xs" h="100%" radius="md">
      <Stack gap="xs">
        <Text fw={800} size="xs" c="dimmed" px="sm">
          UBICACIÓN
        </Text>
        <Select
          placeholder="Estado"
          data={[{ value: 'jalisco', label: 'Jalisco' }]}
          value={currentEstado}
          onChange={(val) => val && updateUrl('estado', val)}
          size="sm"
          mx="sm"
        />

        {currentEstado && (
          <Select
            placeholder="Municipio"
            data={['Zapopan', 'Guadalajara']}
            value={currentMuni.charAt(0).toUpperCase() + currentMuni.slice(1)}
            onChange={(val) => val && updateUrl('municipio', val)}
            size="sm"
            mx="sm"
          />
        )}

        <Divider
          my="sm"
          variant="dashed"
          label="Cines Disponibles"
          labelPosition="center"
        />

        <ScrollArea h={300} offsetScrollbars px="xs">
          <Stack gap={4}>
            {currentMuni ? (
              CINES_POR_MUNI[currentMuni.toLowerCase()]?.map((cine) => (
                <NavLink
                  key={cine}
                  label={cine}
                  leftSection={<IconBuildingCommunity size={16} />}
                  active={currentCine === cine.toLowerCase()}
                  onClick={() => updateUrl('cine', cine)}
                  variant="light"
                  radioGroup="md"
                />
              ))
            ) : (
              <Text size="xs" c="dimmed" ta="center" py="md">
                Selecciona un municipio
              </Text>
            )}
          </Stack>
        </ScrollArea>
      </Stack>
    </Paper>
  );
}
