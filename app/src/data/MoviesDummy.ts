import {
  Movie,
  MovieClasification,
  MovieGenre,
} from '@/interfaces/movie.interface';
import { MovieScreening } from '@/interfaces/movie_screening.interface';

// 1. Dummy Data
export const DUMMY_MOVIES: Movie[] = [
  {
    id: 1,
    title: 'Interstellar',
    genre: MovieGenre.CIENCIA_FICCION,
    clasification: MovieClasification.B,
    duration: '169 min',
    releaseYear: 2014,
    director: 'Christopher Nolan',
    producer: 'Emma Thomas',
    posterUrl:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
    description:
      'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio.',
  },
  {
    id: 2,
    title: 'The Dark Knight',
    genre: MovieGenre.ACCION,
    clasification: MovieClasification.B15,
    duration: '152 min',
    releaseYear: 2008,
    director: 'Christopher Nolan',
    producer: 'Charles Roven',
    posterUrl:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
    description:
      'Batman se enfrenta al Joker en una lucha por el alma de Gotham.',
  },
  {
    id: 3,
    title: 'Spider-Man: Across the Spider-Verse',
    genre: MovieGenre.ANIMACION,
    clasification: MovieClasification.A,
    duration: '140 min',
    releaseYear: 2023,
    director: 'Joaquim Dos Santos',
    producer: 'Phil Lord',
    posterUrl:
      'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800',
    description: 'Miles Morales se lanza a través del Multiverso.',
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    genre: MovieGenre.DRAMA,
    clasification: MovieClasification.C,
    duration: '154 min',
    releaseYear: 1994,
    director: 'Quentin Tarantino',
    producer: 'Lawrence Bender',
    posterUrl:
      'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800',
    description:
      'Las vidas de dos asesinos a sueldo, un boxeador y una mujer se entrelazan.',
  },
  {
    id: 5,
    title: 'Inception',
    genre: MovieGenre.CIENCIA_FICCION,
    clasification: MovieClasification.B,
    duration: '148 min',
    releaseYear: 2010,
    director: 'Christopher Nolan',
    producer: 'Emma Thomas',
    posterUrl:
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800',
    description: 'Un ladrón que roba secretos a través del subconsciente.',
  },
  {
    id: 6,
    title: 'Shrek',
    genre: MovieGenre.COMEDIA,
    clasification: MovieClasification.AA,
    duration: '90 min',
    releaseYear: 2001,
    director: 'Andrew Adamson',
    producer: 'Aron Warner',
    posterUrl:
      'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=800',
    description:
      'Un ogro cuya soledad es interrumpida por personajes de cuentos de hadas.',
  },
];

export const DUMMY_SCREENINGS: MovieScreening[] = [
  {
    movie: {
      id: 1,
      title: 'Interstellar',
      genre: MovieGenre.CIENCIA_FICCION,
      posterUrl: '',
      duration: '169 min',
      description: '',
      director: '',
      producer: '',
      clasification: 'B' as any,
      releaseYear: 2014,
    },
    state: 'Jalisco',
    municipality: 'Zapopan',
    cinema: 'Cinepolis La Gran Plaza',
    location: 'Sala 4',
    start: new Date('2026-03-25T18:30:00'),
    end: new Date('2026-03-25T21:19:00'),
    tickets_remaining: 45,
  },
  {
    movie: {
      id: 2,
      title: 'The Dark Knight',
      genre: MovieGenre.ACCION,
      posterUrl: '',
      duration: '152 min',
      description: '',
      director: '',
      producer: '',
      clasification: 'B15' as any,
      releaseYear: 2008,
    },
    state: 'CDMX',
    municipality: 'Coyoacán',
    cinema: 'Cinemex Oasis Lumina',
    location: 'Sala VIP 1',
    start: new Date('2026-03-25T21:00:00'),
    end: new Date('2026-03-25T23:32:00'),
    tickets_remaining: 12,
  },
];