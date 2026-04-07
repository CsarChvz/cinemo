import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { JSONPlaceholderUserSchema } from '@/schemas/user';
import { TRPCError } from '@trpc/server';


// Mocked DB
interface Post {
  id: number;
  name: string;
}
const posts: Post[] = [
  {
    id: 1,
    name: "Hello World",
  },
];

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello emo ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const post: Post = {
        id: posts.length + 1,
        name: input.name,
      };
      posts.push(post);
      return post;
    }),

  getLatest: publicProcedure.query(() => {
    return posts.at(-1) ?? null;
  }),

  getUserFromExternalAPI: publicProcedure
    // Pedimos el ID como string, aunque la API use números,
    // es común recibir strings desde las URLs del frontend
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      try {
        // 1. Llamada a la API pública real
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${input.userId}`
        );

        if (!response.ok) {
          // Si pasas un userId que no existe (ej. 999), JSONPlaceholder devuelve 404
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'El usuario no existe en JSONPlaceholder',
          });
        }

        const data = await response.json();

        // 2. Validación de Zod
        // data trae dirección, teléfono, etc., pero parse() nos devolverá
        // estrictamente lo que definimos en JSONPlaceholderUserSchema.
        return JSONPlaceholderUserSchema.parse(data);
      } catch (error) {
        // Si Zod falla o hay un error de red, cae aquí
        if (error instanceof z.ZodError) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'La API externa cambió su formato de respuesta',
            cause: error,
          });
        }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al comunicarse con la API externa',
        });
      }
    }),
});
