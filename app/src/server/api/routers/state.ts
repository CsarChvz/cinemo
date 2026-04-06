import { CreateStateSchema, StateListSchema, StateSchema } from '@/schemas/states';
import { apiClient } from '../api-client';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';

export const stateRouter = createTRPCRouter({
  /**
   * Obtiene todos los estados desde el backend de Java
   * GET /states
   */
  getAll: publicProcedure.query(async () => {
    // Usamos StateListSchema porque devuelve un array [ { ... } ]
    return await apiClient('/states', StateListSchema);
  }),

  /**
   * Obtiene un estado por su ID
   * GET /states/{id}
   */
  getById: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      return await apiClient(`/states/${input.id}`, StateSchema);
    }),

  /**
   * Crea un nuevo estado enviando name y code en el body
   * POST /states
   */
  create: publicProcedure
    .input(CreateStateSchema)
    .mutation(async ({ input }) => {
      return await apiClient('/states', StateSchema, {
        method: 'POST',
        body: input, // Aquí pasamos el body { name, code }
      });
    }),

  /**
   * Actualiza un estado existente por ID
   * PUT /states/{id}
   */
  update: publicProcedure
    .input(
      z.object({
        id: z.number().int(),
        data: CreateStateSchema,
      })
    )
    .mutation(async ({ input }) => {
      return await apiClient(`/states/${input.id}`, StateSchema, {
        method: 'PUT',
        body: input.data, // El body actualizado
      });
    }),

  /**
   * Elimina un estado por ID
   * DELETE /states/{id}
   */
  delete: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      // Usamos z.any() si no esperamos un cuerpo de respuesta específico
      return await apiClient(`/states/${input.id}`, z.any(), {
        method: 'DELETE',
      });
    }),
});
