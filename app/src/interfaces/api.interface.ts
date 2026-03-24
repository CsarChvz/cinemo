import { Movie } from "./movie.interface";

export interface MovieApiResponse {
  data: Movie[]; // Arreglo de películas
  totalResults: number;
  currentPage: number;
  totalPages: number;
}
