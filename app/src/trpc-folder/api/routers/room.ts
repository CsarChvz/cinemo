import {
  CreateRoomSchema,
  RoomListSchema,
  RoomSchema,
  RoomSimpleListSchema,
} from '@/schemas/room'; // Ajusta la ruta
import { apiClient } from '../api-client';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { auth } from '@/app/auth';

export const roomRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await apiClient('/rooms', RoomListSchema);
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const data = await apiClient(`/rooms/${input.id}`, RoomSchema.nullable());
      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Sala con ID ${input.id} no encontrada`,
        });
      }
      return data;
    }),

  getByCinemaId: publicProcedure
    .input(z.object({ cinemaId: z.number().int().positive() }))
    .query(async ({ input }) => {
      const data = await apiClient(
        `/rooms/by-cinema/${input.cinemaId}`,
        RoomSimpleListSchema
      );

      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Cine con ID ${input.cinemaId} no encontrado`,
        });
      }
      return data;
    }),

  create: publicProcedure
    .input(CreateRoomSchema)
    .mutation(async ({ input }) => {
      const session = await auth();
      const token = session?.accessToken;
      await apiClient('/rooms', RoomSchema, {
        method: 'POST',
        body: input,
        token,
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number().int(),
        data: CreateRoomSchema,
      })
    )
    .mutation(async ({ input }) => {
      const session = await auth();
      const token = session?.accessToken;
      return await apiClient(`/rooms/${input.id}`, RoomSchema, {
        method: 'PATCH', // O 'PUT'
        body: input.data,
        token: token,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      const session = await auth();
      const token = session?.accessToken;
      return await apiClient(`/rooms/${input.id}`, z.any(), {
        method: 'DELETE',
        token: token,
      });
    }),
});
