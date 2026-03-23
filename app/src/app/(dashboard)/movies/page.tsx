import { SearchBar } from '@/components/movies/SearchBar/SearchBar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Peliculas | Cinemo',
  description: 'Busca las peliculas',
};

export default function MoviesPage() {
  return <SearchBar />;
}
