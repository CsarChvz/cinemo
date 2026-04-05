'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  BackgroundImage,
  Overlay,
  Box,
  Center,
} from '@mantine/core';
import { IconTicket } from '@tabler/icons-react';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <Box style={{ position: 'relative' }}>
      <BackgroundImage
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070" // Imagen de sala de cine
        h={{ base: 400, md: 600 }}
      >
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.95) 100%)"
          opacity={0.85}
          zIndex={1}
        />
        <Container
          size="xl"
          h="100%"
          style={{ position: 'relative', zIndex: 2 }}
        >
          <Center h="100%">
            <Stack align="center" gap="xl" ta="center">
              <Title
                size={60}
                fw={900}
                c="white"
                style={{ lineHeight: 1, letterSpacing: -2 }}
              >
                TU CINE,{' '}
                <Text
                  span
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                  inherit
                >
                  TU MOMENTO
                </Text>
              </Title>
              <Text c="gray.3" size="xl" maw={600} fw={500}>
                Descubre los estrenos más esperados, reserva tus asientos
                favoritos y vive la magia de la gran pantalla en Cinemo.
              </Text>
              <Group>
                <Button
                  size="xl"
                  radius="md"
                  leftSection={<IconTicket size={24} />}
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                  component={Link}
                  href="/movie-screenings"
                >
                  Ver Cartelera
                </Button>
              </Group>
            </Stack>
          </Center>
        </Container>
      </BackgroundImage>
    </Box>
  );
};
