import { apiClient } from '../api-client';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';

// Esquemas de validación (puedes moverlos a @/schemas/auth si prefieres)
const RegisterSchema = z.object({
  name: z.string().min(3, 'El nombre es muy corto'),
  username: z.string().min(4, 'El usuario debe tener al menos 4 caracteres'),
  email: z.email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  role: z.string().default('USER'),
});


export const authRouter = createTRPCRouter({
  /**
   * Registra un nuevo usuario en Cinemo
   * POST /auth/register
   */
  register: publicProcedure
    .input(RegisterSchema)
    .mutation(async ({ input }) => {
      try {

        const response = await apiClient('/auth/register', z.any(), {
          method: 'POST',
          body: input,
        });
        return response;
      } catch (error) {
        console.error('Error detallado:', error);
        throw error;
      }
    }),
});
