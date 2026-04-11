'use client';

import {
  Modal,
  Text,
  Card,
  Group,
  Badge,
  Stack,
  Loader,
  Box,
  Divider,
} from '@mantine/core';
import { api } from '@/trpc-folder/trpc-adaptadores/react';

interface TicketModalProps {
  opened: boolean;
  onClose: () => void;
  bookingId: number | null;
}

export function TicketModal({ opened, onClose, bookingId }: TicketModalProps) {
  const { data, isLoading } = api.ticket.getByBooking.useQuery(
    { bookingId: bookingId! },
    { enabled: opened && !!bookingId }
  );

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Tus Entradas"
      centered
      size="md"
    >
      {isLoading ? (
        <Group justify="center" p="xl">
          <Loader size="md" color="blue" />
        </Group>
      ) : data?.tickets.length === 0 ? (
        <Text c="dimmed" ta="center" py="xl">
          No hay tickets generados para esta reserva.
        </Text>
      ) : (
        <Stack gap="md">
          {data?.tickets.map((ticket) => (
            <Card
              key={ticket.id}
              shadow="md"
              padding={0} // Quitamos el padding general para controlar secciones
              radius="md"
              withBorder
              style={{ overflow: 'hidden' }}
            >
              {/* --- CABECERA DEL TICKET --- */}
              <Box bg="blue.6" c="white" px="md" py="xs">
                <Group justify="space-between">
                  <Text fw={700} tt="uppercase" size="sm">
                    Entrada de Admisión
                  </Text>
                  <Badge
                    color="white"
                    variant="white"
                    size="sm"
                    fw={800}
                    c="blue.7"
                  >
                    PAGADO
                  </Badge>
                </Group>
              </Box>

              {/* --- CUERPO PRINCIPAL --- */}
              <Box p="md">
                <Group grow align="flex-start">
                  <div>
                    <Text size="xs" tt="uppercase" c="dimmed" fw={700}>
                      Asiento ID:
                    </Text>
                    <Text size="xl" fw={900}>
                      {ticket.seatId}
                    </Text>
                  </div>
                  <div>
                    <Text size="xs" tt="uppercase" c="dimmed" fw={700}>
                      Precio
                    </Text>
                    <Text size="xl" fw={900}>
                      ${ticket.price.toFixed(2)}
                    </Text>
                  </div>
                </Group>
              </Box>

              {/* --- LÍNEA DE CORTE (PERFORACIÓN) --- */}
              <Box style={{ position: 'relative' }} py="xs">
                {/* Círculos laterales para simular el troquelado */}
                <Box
                  w={20}
                  h={20}
                  bg="white"
                  style={{
                    position: 'absolute',
                    left: -10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    borderRadius: '50%',
                    borderRight: '1px solid var(--mantine-color-gray-3)',
                    zIndex: 2,
                  }}
                />
                <Divider variant="dashed" color="gray.4" size="sm" />
                <Box
                  w={20}
                  h={20}
                  bg="white"
                  style={{
                    position: 'absolute',
                    right: -10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    borderRadius: '50%',
                    borderLeft: '1px solid var(--mantine-color-gray-3)',
                    zIndex: 2,
                  }}
                />
              </Box>

              {/* --- TALÓN / FOOTER --- */}
              <Box p="md" bg="gray.0">
                <Group justify="space-between" align="center" wrap="nowrap">
                  <div>
                    <Text size="xs" tt="uppercase" c="dimmed" fw={700}>
                      Código de Ticket
                    </Text>
                    <Text
                      fw={600}
                      size="lg"
                      style={{ fontFamily: 'monospace', letterSpacing: 2 }}
                    >
                      {ticket.ticketCode}
                    </Text>
                  </div>

                  {/* Simulación de Código de Barras con CSS */}
                  <Box
                    w={60}
                    h={30}
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(to right, #2C2E33, #2C2E33 2px, transparent 2px, transparent 4px, #2C2E33 4px, #2C2E33 5px, transparent 5px, transparent 8px, #2C2E33 8px, #2C2E33 11px, transparent 11px, transparent 12px)',
                      opacity: 0.7,
                    }}
                  />
                </Group>
              </Box>
            </Card>
          ))}
        </Stack>
      )}
    </Modal>
  );
}
