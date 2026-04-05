'use client';

import {
  Box,
  Container,
  Paper,
  Group,
  Stack,
  Title,
  Text,
  Button,
} from '@mantine/core';
import Link from 'next/link';

export function CtaSection() {
  return (
    <Box bg="blue.9" py={60}>
      <Container size="xl">
        <Paper
          p="xl"
          radius="lg"
          bg="blue.8"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <Group justify="space-between">
            <Stack gap="xs">
              <Title order={2} c="white">
                ¿Listo para la función?
              </Title>
              <Text c="blue.1">
                Regístrate hoy y obtén beneficios exclusivos en tus boletos.
              </Text>
            </Stack>
            <Button
              size="lg"
              radius="md"
              color="white"
              c="blue.9"
              component={Link}
              href="/register"
            >
              Crear Cuenta Gratuita
            </Button>
          </Group>
        </Paper>
      </Container>
    </Box>
  );
}
