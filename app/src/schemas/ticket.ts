import { z } from 'zod';

export const TicketResponseSchema = z.object({
  id: z.number(),
  bookingId: z.number(),
  seatId: z.number(),
  ticketCode: z.string(),
  price: z.number(),
  issuedAt: z.string(),
});

export const TicketListResponseSchema = z.object({
  bookingId: z.number(),
  totalTickets: z.number(),
  tickets: z.array(TicketResponseSchema),
});
