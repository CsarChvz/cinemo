import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { apiClient } from '../api-client';
import { auth } from '@/app/auth';
import { BookingRequestSchema, BookingResponseSchema } from '@/schemas/booking';
import z from 'zod';

export const bookingRouter = createTRPCRouter({
  /**
   * Crea una nueva reserva.
   * Entra a la Cola (Queue) del backend y activa el RollbackStack si falla.
   * POST /api/v1/bookings
   */
  createBooking: publicProcedure
    .input(BookingRequestSchema)
    .mutation(async ({ input }) => {
      const session = await auth();
      const token = session?.accessToken;

      try {
        const data = await apiClient('/bookings', BookingResponseSchema, {
          method: 'POST',
          body: input,
          token: token,
        });
        return data;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message:
            'Error al procesar el pago. El sistema revirtió los asientos (Rollback).',
        });
      }
    }),

  getMyBookings: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      // Llamada al endpoint GET /bookings?userId=...
      return await apiClient(
        `/bookings?userId=${input.userId}`,
        z.array(BookingResponseSchema)
      );
    }),
});
