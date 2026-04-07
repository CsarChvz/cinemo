import { env } from '@/env';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions<TBody> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  cache?: RequestCache;
}

/**
 * Cliente universal para conectar con el backend de Java
 */
export async function apiClient<TResponse>(
  endpoint: string,
  schema: z.ZodSchema<TResponse>,
  options: FetchOptions<unknown> = {}
): Promise<TResponse> {
  const { method = 'GET', body, headers, cache = 'default' } = options;
  const url = `${env.NEXT_PUBLIC_API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method,
      cache,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      // Mapeo de errores HTTP a códigos de tRPC
      const errorMap: Record<number, TRPCError['code']> = {
        400: 'BAD_REQUEST',
        401: 'UNAUTHORIZED',
        403: 'FORBIDDEN',
        404: 'NOT_FOUND',
        409: 'CONFLICT',
      };

      throw new TRPCError({
        code: errorMap[response.status] ?? 'BAD_GATEWAY',
        message: `API Error: ${response.statusText} (${response.status})`,
      });
    }

    // Para DELETE o respuestas vacías (204 No Content)
    if (response.status === 204) {
      return {} as TResponse;
    }

    const data = await response.json();

    // Validación estricta con Zod
    const result = schema.safeParse(data);
    if (!result.success) {
      console.error('Zod Validation Error:', result.error.format());
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'El formato de respuesta del backend no coincide con el esquema esperado',
      });
    }

    return result.data;
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message:
        error instanceof Error
          ? error.message
          : 'Error de conexión desconocido',
    });
  }
}
