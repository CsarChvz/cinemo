// schemas/movie-screening.ts
import { z } from 'zod';
import { RoomSchema } from './room';
import { MovieSchema } from './movie';

export const MovieScreeningSchema = z.object({
  id: z.number().int(),
  start: z.string(),
  end: z.string(),
  ticketsRemaining: z.number().int(),
  totalCapacity: z.number().int(),
  status: z.string(),
  movie: MovieSchema,
  room: RoomSchema,
});

export const MovieScreeningListSchema = z.array(MovieScreeningSchema);

export const CreateMovieScreeningSchema = z.object({
  movieId: z.number().int({ message: 'Selecciona una película' }),
  roomId: z.number().int({ message: 'Selecciona una sala' }),
  start: z.string().min(1, 'La fecha y hora de inicio es requerida'),
  end: z.string(),
  totalCapacity: z.number().int(),
  ticketsRemaining: z.number().int(),
  status: z.string(),
});

export type MovieScreening = z.infer<typeof MovieScreeningSchema>;
export type CreateMovieScreening = z.infer<typeof CreateMovieScreeningSchema>;
