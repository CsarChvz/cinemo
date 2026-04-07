import { z } from 'zod';
import { CinemaSchema } from './cinema'; // Ajusta la ruta

export const RoomSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  roomType: z.string(), 
  capacity: z.number().int(),
  isActive: z.boolean(),
  cinema: CinemaSchema, 
});

export const RoomListSchema = z.array(RoomSchema);

export const CreateRoomSchema = z.object({
  name: z.string().min(1, 'El nombre de la sala es requerido'),
  roomType: z.string().min(1, 'Selecciona el tipo de sala'),
  capacity: z.number().int().positive('La capacidad debe ser mayor a 0'),
  isActive: z.boolean().default(true),
  cinemaId: z.number().int({ message: 'Debes seleccionar un complejo válido' }),
});

export type Room = z.infer<typeof RoomSchema>;
export type CreateRoom = z.infer<typeof CreateRoomSchema>;
