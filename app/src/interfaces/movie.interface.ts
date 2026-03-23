
export enum MovieGenre {
  ACCION = 'Accion',
  AVENTURAS = 'Aventuras',
  CIENCIA_FICCION = 'Ciencia Ficcion',
  COMEDIA = 'Comedia',
  DRAMA = 'Drama',
  THRILLER = 'Thriller',
  SUSPENSO = 'Suspenso',
  TERROR = 'Terror',
  ROMANCE = 'Romance',
  ANIMACION = 'Animacion',
}

export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  genre: MovieGenre;
  duration: string;
  description: string;
  director: string;
  producer: string;
  rating: string;
  releaseYear: number;
}

