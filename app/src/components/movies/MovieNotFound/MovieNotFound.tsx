import { BackButton } from '@/components/common/BackButton/BackButton';
import { Container, Title, Text, Stack, Paper, Center } from '@mantine/core';
import { IconMovieOff } from '@tabler/icons-react';

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

            <BackButton href="/dashboard/users" />
          </Stack>
        </Center>
      </Paper>
    </Container>
  );
}
