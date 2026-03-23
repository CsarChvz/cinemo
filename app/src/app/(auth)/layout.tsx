'use client';

import { Box, Container, Group, Text, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      data-mantine-color-scheme="dark" // Forzamos modo oscuro para todo el layout
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0a0a0a', // Fondo base negro sólido
        backgroundImage:
          'radial-gradient(circle at 50% -20%, #1a365d 0%, #0a0a0a 80%)',
      }}
    >
      {/* Header simple */}
      <Container size="xl" w="100%" py="lg">
        <Group justify="space-between">
          <Button
            component={Link}
            href="/"
            variant="subtle"
            color="gray"
            leftSection={<IconArrowLeft size={18} />}
          >
            Volver al inicio
          </Button>

          <Text fw={900} size="xl" c="blue.5" style={{ letterSpacing: '3px' }}>
            CINEMO
          </Text>
        </Group>
      </Container>

      {/* El formulario centrado */}
      <Box
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        p="md"
      >
        {children}
      </Box>

      {/* Footer minimalista */}
      <Container py="xl">
        <Text ta="center" size="xs" c="gray.8">
          Explora lo mejor del séptimo arte con Cinemo
        </Text>
      </Container>
    </Box>
  );
}
