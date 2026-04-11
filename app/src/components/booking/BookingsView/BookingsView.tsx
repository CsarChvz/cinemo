'use client';

import { useState } from 'react';
import { Table, Badge, Button, Paper, Text } from '@mantine/core';
import { TicketModal } from '@/components/Tickets/TicketModal';

// Ajusta este tipo si ya lo tienes exportado en tus schemas
type Booking = {
  id: number;
  createdAt: string;
  totalPrice: number;
  status: string;
};

interface BookingsViewProps {
  initialBookings: Booking[];
}

export function BookingsView({ initialBookings }: BookingsViewProps) {
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );

  if (!initialBookings || initialBookings.length === 0) {
    return (
      <Paper shadow="xs" p="xl" radius="md" withBorder ta="center">
        <Text c="dimmed">No tienes reservas activas por el momento.</Text>
      </Paper>
    );
  }

  return (
    <>
      <Paper shadow="xs" p="md" radius="md" withBorder>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID Reserva</Table.Th>
              <Table.Th>Fecha</Table.Th>
              <Table.Th>Total</Table.Th>
              <Table.Th>Estado</Table.Th>
              <Table.Th>Acciones</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {initialBookings.map((booking) => (
              <Table.Tr key={booking.id}>
                <Table.Td>#{booking.id}</Table.Td>
                <Table.Td>
                  {new Date(booking.createdAt).toLocaleDateString()}
                </Table.Td>
                <Table.Td>${booking.totalPrice.toFixed(2)}</Table.Td>
                <Table.Td>
                  <Badge color={booking.status === 'PAID' ? 'green' : 'orange'}>
                    {booking.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  {booking.status === 'PAID' && (
                    <Button
                      variant="light"
                      size="xs"
                      onClick={() => setSelectedBookingId(booking.id)}
                    >
                      Ver Tickets
                    </Button>
                  )}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>

      {/* El Modal que muestra los tickets (Mantiene su propia lógica tRPC cliente) */}
      <TicketModal
        opened={!!selectedBookingId}
        onClose={() => setSelectedBookingId(null)}
        bookingId={selectedBookingId}
      />
    </>
  );
}
