import { Metadata } from 'next';
import { Container, Title, Text, Stack } from '@mantine/core';
import { NearbyCinemasClient } from '@/components/cinemas/NearbyCinemasClient/NearbyCinemasClient';

export const metadata: Metadata = {
  title: 'Encuentra tu Cine | Cinemo',
  description:
    'Localiza los complejos Cinemo más cercanos a tu ubicación y consulta sus horarios.',
};

export default function CinemasPage() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xs" mb="xl">
        <Title order={1}>Cines Cercanos</Title>
        <Text c="dimmed" size="lg">
          Permítenos conocer tu ubicación para mostrarte los complejos con
          funciones disponibles.
        </Text>
      </Stack>

      {/* Este componente manejará los permisos y la lista */}
      <NearbyCinemasClient />
    </Container>
  );
}
