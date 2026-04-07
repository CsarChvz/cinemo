import {
  CreateMunicipalitySchema,
  MunicipalityListSchema,
  MunicipalitySchema,
} from '@/schemas/municipality'; // Ajusta esta ruta a la ubicación real de tu archivo
import { apiClient } from '../api-client';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const municipalityRouter = createTRPCRouter({
  /**
   * Obtiene todos los municipios desde el backend de Java
   * GET /municipalities
   */
  getAll: publicProcedure.query(async () => {
    return await apiClient('/municipalities', MunicipalityListSchema);
  }),

  /**
   * Obtiene un municipio por su ID
   * GET /municipalities/{id}
   */
  getById: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const data = await apiClient(
        `/municipalities/${input.id}`,
        MunicipalitySchema.nullable()
      );

      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Municipio con ID ${input.id} no encontrado`,
        });
      }
      return data;
    }),

  /**
   * Crea un nuevo municipio enviando name y stateId en el body
   * POST /municipalities
   */
  create: publicProcedure
    .input(CreateMunicipalitySchema)
    .mutation(async ({ input }) => {
      await apiClient('/municipalities', MunicipalitySchema, {
        method: 'POST',
        body: input, // Aquí pasamos el body { name, stateId }
      });
    }),

  /**
   * Actualiza un municipio existente por ID
   * PATCH /municipalities/{id}
   */
  update: publicProcedure
    .input(
      z.object({
        id: z.number().int(),
        data: CreateMunicipalitySchema,
      })
    )
    .mutation(async ({ input }) => {
      return await apiClient(
        `/municipalities/${input.id}`,
        MunicipalitySchema,
        {
          method: 'PATCH', // O 'PUT', dependiendo de tu backend
          body: input.data, // El body actualizado con { name, stateId }
        }
      );
    }),

  /**
   * Elimina un municipio por ID
   * DELETE /municipalities/{id}
   */
  delete: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      // Usamos z.any() si no esperamos un cuerpo de respuesta específico
      return await apiClient(`/municipalities/${input.id}`, z.any(), {
        method: 'DELETE',
      });
    }),
});
