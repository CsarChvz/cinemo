import { Movie } from './movie.interface';

export interface MovieScreening {
  movie: Movie;
  state: string;
  municipality: string;
  cinema: string;
  location: string;
  start: Date;
  end: Date;
  tickets_remaining: number;
}
