'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc-folder/trpc-adaptadores/react';
import {
  Stepper,
  Button,
  Group,
  Paper,
  Title,
  Text,
  Divider,
  Stack,
  Box,
  Center,
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

interface CheckoutProps {
  userId: number;
  functionId: number;
  seatStatusIds: number[];
  seatLabels: string[]; // Ej: ['A5', 'A6', 'B6']
  movieTitle: string;
  time: string;
  roomName: string;
  basePrice: number; // Ej: 110.00
}

export function CheckoutView({
  userId,
  functionId,
  seatStatusIds,
  seatLabels,
  movieTitle,
  time,
  roomName,
  basePrice,
}: CheckoutProps) {
  const router = useRouter();

  // El Stepper inicia en el paso 2 (Checkout), asumiendo que 0=Película y 1=Asientos ya pasaron.
  const [activeStep, setActiveStep] = useState(2);
  const [paymentStatus, setPaymentStatus] = useState<
    'pending' | 'success' | 'error'
  >('pending');

  const bookingMutation = api.booking.createBooking.useMutation({
    onSuccess: () => {
      setPaymentStatus('success');
      nextStep(); // Push a la pantalla final
    },
    onError: () => {
      setPaymentStatus('error');
    },
  });

  // --- NAVEGACIÓN (Pila Visual) ---
  const nextStep = () =>
    setActiveStep((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => {
    // Pop() visual. Si retrocede desde el checkout, regresa a la página de asientos.
    if (activeStep === 2) router.back();
    else setActiveStep((current) => (current > 0 ? current - 1 : current));
  };

  // --- CÁLCULOS DE DESGLOSE ---
  // Representación visual del desglose encadenado
  const subtotal = basePrice * seatStatusIds.length;
  const discountTuesday = subtotal * 0.1; // -10% recursivo simulado
  const total = subtotal - discountTuesday;

  const handlePayment = () => {
    bookingMutation.mutate({
      userId,
      functionId,
      seatStatusIds,
    });
  };

  return (
    <Stack gap="xl" mt="xl" maw={600} mx="auto">
      {/* STEPPER: Representa la pila de pasos del usuario */}
      <Stepper
        active={activeStep}
        onStepClick={setActiveStep}
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="Película" description="Selección" />
        <Stepper.Step label="Asientos" description="Ubicación" />
        <Stepper.Step label="Pago" description="Checkout" />
        <Stepper.Completed>Confirmación</Stepper.Completed>
      </Stepper>

      {/* VISTA DE CHECKOUT */}
      {activeStep === 2 && paymentStatus !== 'success' && (
        <Paper withBorder shadow="sm" p="xl" radius="md">
          <Title order={3} mb="md">
            Resumen de la compra
          </Title>
          <Stack gap="sm">
            <Text fw={600} size="lg">
              {movieTitle} · {time} · {roomName}
            </Text>
            <Group justify="space-between">
              <Text c="dimmed">Asientos ({seatStatusIds.length}):</Text>
              <Text fw={500}>{seatLabels.join(', ')}</Text>
            </Group>

            <Divider my="sm" />

            {/* Desglose de precios */}
            <Group justify="space-between">
              <Text c="dimmed">Precio base (x{seatStatusIds.length})</Text>
              <Text>${subtotal.toFixed(2)}</Text>
            </Group>
            <Group justify="space-between">
              <Text c="red" size="sm">
                Descuento martes -10%
              </Text>
              <Text c="red" size="sm">
                -${discountTuesday.toFixed(2)}
              </Text>
            </Group>

            <Divider my="sm" />

            <Group justify="space-between">
              <Title order={4}>Total</Title>
              <Title order={4}>${total.toFixed(2)}</Title>
            </Group>
          </Stack>

          {paymentStatus === 'error' && (
            <Text c="red" mt="md" ta="center" size="sm" fw={500}>
              Ocurrió un error. El sistema ejecutó un Rollback de tus asientos.
              Intenta de nuevo.
            </Text>
          )}

          <Group justify="center" mt="xl">
            <Button
              variant="default"
              onClick={prevStep}
              disabled={bookingMutation.isPending}
            >
              Atrás
            </Button>
            <Button
              color="blue"
              onClick={handlePayment}
              loading={bookingMutation.isPending}
            >
              Confirmar y pagar
            </Button>
          </Group>
        </Paper>
      )}

      {/* VISTA DE ÉXITO */}
      {activeStep === 3 && paymentStatus === 'success' && (
        <Paper withBorder shadow="sm" p="xl" radius="md" ta="center">
          <Center mb="md">
            <Box bg="green.1" p="md" style={{ borderRadius: '50%' }}>
              <IconCheck size={40} color="green" />
            </Box>
          </Center>
          <Title order={3}>¡Pago exitoso!</Title>
          <Text c="dimmed" mt="sm">
            Tus lugares están confirmados.
          </Text>
          <Button mt="xl" onClick={() => router.push('/')}>
            Volver a la cartelera
          </Button>
        </Paper>
      )}
    </Stack>
  );
}
