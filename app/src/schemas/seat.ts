import { z } from 'zod';

export const SeatSchema = z.object({
  id: z.number().int(),
  roomId: z.number().int(),
  rowLetter: z.string(),
  seatNumber: z.number().int(),
});

export const SeatListSchema = z.array(SeatSchema);

export const CreateSeatSchema = z.object({
  roomId: z.number().int({ message: 'Debes enviar el ID de la sala' }),
  rowLetter: z.string().min(1, 'La letra de la fila es requerida'),
  seatNumber: z
    .number()
    .int()
    .positive('El número de asiento debe ser positivo'),
});

export type Seat = z.infer<typeof SeatSchema>;
export type CreateSeat = z.infer<typeof CreateSeatSchema>;
