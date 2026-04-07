import { BackButton } from '@/components/common/BackButton';
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Paper,
  Center,
} from '@mantine/core';
import { IconMovieOff, IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
export function MovieNotFound() {
  return (
    <Container size="sm" py={80}>
      <Paper p={40} radius="xl" withBorder bg="gray.0" darkHidden>
        <Center>
          <Stack align="center" ta="center" gap="md">
            <IconMovieOff size={80} stroke={1.5} color="gray" />

            <Title order={2} fw={900}>
              Película no encontrada
            </Title>

            <Text c="dimmed" size="lg" maw={400}>
              Parece que la película que estás buscando ya no está en cartelera,
              el enlace es incorrecto, o ha sido removida de Cinemo.
            </Text>

            <BackButton />
          </Stack>
        </Center>
      </Paper>
    </Container>
  );
}
