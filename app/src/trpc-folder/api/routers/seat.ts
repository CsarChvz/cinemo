import { SeatListSchema } from '@/schemas/seat';
import {
  ReleaseSessionInputSchema,
  SeatStatusListSchema,
  SeatStatusResponseSchema,
  SelectSeatInputSchema,
  UndoSeatInputSchema,
  WaitlistInputSchema,
  WaitlistResponseSchema,
} from '@/schemas/seatStatus';
import { apiClient } from '../api-client';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { auth } from '@/app/auth';

export const seatRouter = createTRPCRouter({
  /**
   * Obtiene los asientos físicos de una sala
   * GET /seats?roomId={roomId}
   */
  getRoomSeats: publicProcedure
    .input(z.object({ roomId: z.number().int().positive() }))
    .query(async ({ input }) => {
      const session = await auth();
      const token = session?.accessToken;
      const data = await apiClient(
        `/seats?roomId=${input.roomId}`,
        SeatListSchema,
        {
          method: 'GET',
          token: token,
        }
      );

      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No se encontraron asientos para la sala con ID ${input.roomId}`,
        });
      }
      return data;
    }),

  /**
   * Obtiene los estados dinámicos de los asientos para una función
   * GET /seat-status?functionId={movieScreeningId}
   */
  getStatuses: publicProcedure
    .input(z.object({ movieScreeningId: z.number().int().positive() }))
    .query(async ({ input }) => {
      // El backend de Java espera 'functionId'
      const session = await auth();
      const token = session?.accessToken;
      const data = await apiClient(
        `/seat-status?functionId=${input.movieScreeningId}`,
        SeatStatusListSchema,
        {
          method: 'GET',
          token: token,
        }
      );

      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No se encontraron estados para la función con ID ${input.movieScreeningId}`,
        });
      }
      return data;
    }),

  /**
   * Selecciona (reserva temporalmente) un asiento
   * POST /seat-status/select
   */
  selectSeat: publicProcedure
    .input(SelectSeatInputSchema)
    .mutation(async ({ input }) => {
      const session = await auth();
      const token = session?.accessToken;
      return await apiClient('/seat-status/select', SeatStatusResponseSchema, {
        method: 'POST',
        body: input,
        token: token,
      });
    }),

  /**
   * Deshace la última selección del usuario (Pop de la pila)
   * POST /seat-status/undo?functionId={movieScreeningId}&userId={userId}
   */
  undoLast: publicProcedure
    .input(UndoSeatInputSchema)
    .mutation(async ({ input }) => {
      const session = await auth();
      const token = session?.accessToken;
      const queryParams = new URLSearchParams({
        functionId: input.movieScreeningId.toString(),
        userId: input.userId.toString(),
      });

      // Retorna el ID del asiento liberado
      return await apiClient(
        `/seat-status/undo?${queryParams.toString()}`,
        z.number(),
        {
          method: 'POST',
          token: token,
        }
      );
    }),

  /**
   * Une al usuario a la lista de espera de un asiento ocupado (Push a la cola)
   * POST /seat-status/{seatId}/waitlist?functionId={movieScreeningId}&userId={userId}
   */
  joinWaitlist: publicProcedure
    .input(WaitlistInputSchema)
    .mutation(async ({ input }) => {
      const session = await auth();
      const token = session?.accessToken;

      const queryParams = new URLSearchParams({
        functionId: input.movieScreeningId.toString(),
        userId: input.userId.toString(),
      });

      return await apiClient(
        `/seat-status/${input.seatId}/waitlist?${queryParams.toString()}`,
        z.any(),
        {
          method: 'POST',
          token: token,
        }
      );
    }),

  /**
   * Obtiene la posición actual en la lista de espera
   * GET /seat-status/{seatId}/waitlist/position?functionId={movieScreeningId}&userId={userId}
   */
  getWaitlistPosition: publicProcedure
    .input(WaitlistInputSchema)
    .query(async ({ input }) => {
      const queryParams = new URLSearchParams({
        functionId: input.movieScreeningId.toString(),
        userId: input.userId.toString(),
      });

      const data = await apiClient(
        `/seat-status/${input.seatId}/waitlist/position?${queryParams.toString()}`,
        WaitlistResponseSchema
      );

      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No se pudo obtener la información de la lista de espera',
        });
      }
      return data;
    }),

  /**
   * Libera todos los asientos reservados temporalmente por el usuario
   * POST /seat-status/release-session
   */
  releaseSession: publicProcedure
    .input(ReleaseSessionInputSchema)
    .mutation(async ({ input }) => {
      const session = await auth();
      const token = session?.accessToken;

      return await apiClient('/seat-status/release-session', z.any(), {
        method: 'POST',
        body: input,
        token: token,
      });
    }),

  /**
   * Quita la selección de un asiento específico
   * POST /seat-status/deselect
   */
  deselectSeat: publicProcedure
    .input(SelectSeatInputSchema) // Usamos el mismo schema de Select
    .mutation(async ({ input }) => {
      const session = await auth();
      const token = session?.accessToken;

      return await apiClient('/seat-status/deselect', z.any(), {
        method: 'POST',
        body: input,
        token: token,
      });
    }),
});
