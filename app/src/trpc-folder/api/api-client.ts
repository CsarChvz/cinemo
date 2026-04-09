import { env } from '@/env';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// 1. Agregamos 'token' a las opciones
interface FetchOptions<TBody> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  cache?: RequestCache;
  token?: string; // 🔥 Nuevo campo opcional
}

/**
 * Cliente universal para conectar con el backend de Java
 */
export async function apiClient<TResponse>(
  endpoint: string,
  schema: z.ZodSchema<TResponse>,
  options: FetchOptions<unknown> = {}
): Promise<TResponse> {
  const { method = 'GET', body, headers, cache = 'default', token } = options;
  const baseUrl =
    typeof window !== 'undefined' ? env.NEXT_PUBLIC_API_URL : env.API_URL;

  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      method,
      cache,
      headers: {
        'Content-Type': 'application/json',
        // 2. Inyectamos el Bearer Token si existe
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      // 3. Intentamos leer el mensaje de error real enviado por Java
      const errorText = await response.text();
      let serverMessage = `API Error: ${response.statusText} (${response.status})`;

      try {
        const errorJson = JSON.parse(errorText);
        serverMessage = errorJson.message || serverMessage;
      } catch {
        // Si no es JSON (ej. un error de Tomcat), nos quedamos con el mensaje por defecto
      }

      const errorMap: Record<number, TRPCError['code']> = {
        400: 'BAD_REQUEST',
        401: 'UNAUTHORIZED',
        403: 'FORBIDDEN',
        404: 'NOT_FOUND',
        409: 'CONFLICT',
      };

      throw new TRPCError({
        code: errorMap[response.status] ?? 'BAD_GATEWAY',
        message: serverMessage, // 🔥 Ahora mostrará el mensaje de tu BusinessException
      });
    }

    if (response.status === 204) {
      return {} as TResponse;
    }

    const data = await response.json();

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
