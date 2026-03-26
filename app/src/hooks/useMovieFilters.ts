import { SortOrder } from "@/interfaces/filter.interface";
import { Movie, MovieClasification, MovieGenre } from "@/interfaces/movie.interface";
import { useMemo, useState } from "react";

export function useMovieFilters(initialMovies: Movie[]){
    const [movies, setMovies] = useState<Movie[]>(initialMovies);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<SortOrder>(SortOrder.DEFAULT);
    const [genres, setGenres] = useState<MovieGenre[]>([]);
    const [clasifications, setClasifications] = useState<MovieClasification[]>(
      []
    );
    const [isManual, setIsManual] = useState(false);


    const handleDelete = (id: number) => {
      setMovies((prev) => prev.filter((m) => m.id !== id));
    };

    const handleToggleStatus = (id: number) => {
      console.log('Cambiando estado de:', id);
      // Aquí podrías actualizar un campo "isActive" si tu interfaz lo tiene
    };
      const filteredMovies = useMemo(() => {
        let result = [...initialMovies];

        // SI LA IMPLEMENTACIÓN MANUAL ESTÁ DESACTIVADA, USAMOS EL FILTRADO AUTO
        if (!isManual) {
          if (search) {
            result = result.filter((m) =>
              m.title.toLowerCase().includes(search.toLowerCase())
            );
          }

          if (genres.length > 0) {
            result = result.filter((m) => genres.includes(m.genre));
          }

          if (clasifications.length > 0) {
            result = result.filter((m) =>
              clasifications.includes(m.clasification)
            );
          }

          if (sort === SortOrder.ASCENDING) {
            result.sort((a, b) => a.title.localeCompare(b.title));
          } else if (sort === SortOrder.DESCENDING) {
            result.sort((a, b) => b.title.localeCompare(a.title));
          }
        } else {
          // AQUÍ ES DONDE TÚ PODRÁS METER MANO A LA VARIABLE 'result'
          // Por ahora devuelve todo, pero aquí es tu zona de juegos.
          console.log(
            'Modo manual activo: Los filtros automáticos están ignorados.'
          );

          /** * TODO: César, aquí puedes implementar tus propios algoritmos:
           * 1. Algoritmos de búsqueda (Búsqueda lineal, binaria, etc.)
           * 2. Algoritmos de ordenamiento (QuickSort, BubbleSort, MergeSort, etc.)
           */
        }

        return result;
      }, [movies, search, sort, genres, clasifications, isManual]);

      return {
        state: { search, sort, genres, clasifications, isManual },
        actions: {
          setSearch,
          setSort,
          setGenres,
          setClasifications,
          setIsManual,
          handleDelete,
          handleToggleStatus,
        },
        filteredMovies,
      };
}