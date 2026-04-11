import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { apiClient } from '../api-client';
import { TicketListResponseSchema } from '@/schemas/ticket';

export const ticketRouter = createTRPCRouter({
  // Obtener tickets de una reserva específica
  getByBooking: publicProcedure
    .input(z.object({ bookingId: z.number() }))
    .query(async ({ input }) => {
      return await apiClient(
        `/tickets?bookingId=${input.bookingId}`,
        TicketListResponseSchema
      );
    }),
});
