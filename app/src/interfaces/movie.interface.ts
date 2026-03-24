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
  id?: number;
  title: string;
  posterUrl: string;
  genre: MovieGenre;
  duration: string;
  description: string;
  director: string;
  producer: string;
  clasification: MovieClasification;
  releaseYear: number;
}

export enum MovieClasification {
  AA = 'AA', // Niños menores de 7 años
  A = 'A', // Todo público
  B = 'B', // 12 años en adelante
  B15 = 'B15', // 15 años en adelante
  C = 'C', // Adultos (18+)
  D = 'D', // Adultos (Contenido extremo)
}
