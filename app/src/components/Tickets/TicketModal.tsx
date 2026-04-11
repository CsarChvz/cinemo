'use client';

import { Modal, Text, Card, Group, Badge, Stack, Loader } from '@mantine/core';
import { api } from '@/trpc-folder/trpc-adaptadores/react';

interface TicketModalProps {
  opened: boolean;
  onClose: () => void;
  bookingId: number | null;
}

export function TicketModal({ opened, onClose, bookingId }: TicketModalProps) {
  // Solo hace la petición si el modal está abierto y hay un bookingId
  const { data, isLoading } = api.ticket.getByBooking.useQuery(
    { bookingId: bookingId! },
    { enabled: opened && !!bookingId }
  );

  return (
    <Modal opened={opened} onClose={onClose} title="Tus Entradas" centered>
      {isLoading ? (
        <Loader size="sm" />
      ) : data?.tickets.length === 0 ? (
        <Text c="dimmed">No hay tickets generados para esta reserva.</Text>
      ) : (
        <Stack gap="sm">
          {data?.tickets.map((ticket) => (
            <Card
              key={ticket.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Código: {ticket.ticketCode}</Text>
                <Badge color="green" variant="light">
                  Pagado
                </Badge>
              </Group>
              <Text size="sm" c="dimmed">
                Asiento ID: {ticket.seatId}
              </Text>
              <Text size="sm" c="dimmed">
                Precio: ${ticket.price.toFixed(2)}
              </Text>
            </Card>
          ))}
        </Stack>
      )}
    </Modal>
  );
}
