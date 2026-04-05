import { Movie } from '@/schemas/movie';

export interface MovieScreening {
  id: number;
  movie: Movie;
  state: string;
  municipality: string;
  cinema: string;
  location: string;
  start: Date;
  end: Date;
  tickets_remaining: number;
  total_capacity: number;
  status: string;
}
