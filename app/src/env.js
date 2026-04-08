import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    // La KEY solo vive en el servidor por seguridad
    API_KEY: z.string().min(1),
    API_URL: z.url(),
  },

  client: {
    // URL pública de tu API de Spring Boot (para el navegador)
    NEXT_PUBLIC_API_URL: z.url(),
    NEXT_PUBLIC_APP_URL: z.url().optional(),
  },

  // Para Next.js >= 13.4, debes mapear manualmente las variables aquí
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    API_KEY: process.env.API_KEY,
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
