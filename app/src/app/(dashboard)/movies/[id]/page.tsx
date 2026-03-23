import { RegisterForm } from '@/components/auth/RegisterForm/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Peliculas [id] | Cinemo',
  description: 'Busca las peliculas',
};

export default function MoviesDetailPage() {
  return <RegisterForm />;
}
